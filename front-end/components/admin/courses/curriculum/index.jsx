import React, {useState, useEffect} from 'react';
import { DeleteFilled, EditFilled, PlusOutlined } from '@ant-design/icons';
import Layout from '@components/shared/layout';
import Files from '@components/admin/files/list';
import Uploader from '@components/admin/files/upload';
import { useRouter } from 'next/router';
import moment from 'moment'
import {
    Button,
    Modal,
    Table,
    Drawer,
    Collapse, 
    theme,
    Skeleton,
    message,
    Form,
    Input,
    List
} from 'antd';
import { MenuOutlined, CaretRightOutlined } from '@ant-design/icons';
import {
  useSortable,
} from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import useSWR, {mutate} from 'swr'
import http from '@modules/http'
import { useSession } from 'next-auth/react';
import { useSelector, useDispatch } from 'react-redux';
import { resetFile } from '@redux/slices/file';


const Cur = () => {
  const dispatch = useDispatch()
  const {file} = useSelector(response=>response)
  const [key, setKey] = useState(null)
  const [lessons, setLessons] = useState([])
  const [lessonId, setLessonId] = useState(null)
  const [lessonForm] = Form.useForm()
  const [lessonModal, setLessonModal] = useState(false)
  const [editForm, setEditForm] = useState(null)
  const [topicForm] = Form.useForm()
  const {data: session} = useSession()
  const router = useRouter()

  useEffect(()=>{
    const req = async ()=>{
      try {
        const httpRequest = http(session && session.user.access)
        await httpRequest.put(`/lesson/${lessonId}/`,{[key]: file.path})
        onDrawerClose()
        message.success('Successfully Added !')
      }
      catch(err)
      {
        message.error(err.message)
      }
      finally {
        setKey(null)
      }
    }
    if(file) req()
  },[file])
  
  const LessonContent = ({data})=>{
    const [fileDialog, setFileDialog] = useState(false);

    const onMedia = (id,key)=>{
      setLessonId(id)
      setFileDialog(true)
      setKey(key)
    }

    const onDelete = async (id,key)=>{
      try {
        const httpRequest = http(session && session.user.access)
        await httpRequest.put(`/lesson/${id}/`,{[key]: null})
        onDrawerClose()
        message.success('Successfully Deleted !')
      }
      catch(err)
      {
        message.error(err.message)
      }
      finally {
        setKey(null)
      }
    }

    const onDeleteLesson = async (id)=>{
      try {
        const httpRequest = http(session && session.user.access)
        await httpRequest.delete(`/lesson/${id}/`)
        onDrawerClose()
        message.success('Lesson Successfully Deleted !')
      }
      catch(err)
      {
        message.error(err.message)
      }
      finally {
        setKey(null)
      }
    }

    return (
        <div className='flex flex-col gap-y-6'>
            <List>
              <List.Item 
                extra={
                  <div className="flex gap-2">
                    <Button onClick={()=>onMedia(data.id,'video')} icon={<PlusOutlined />} className='text-indigo-600 border-indigo-600' />
                    <Button onClick={()=>onDelete(data.id,'video')} icon={<DeleteFilled />} className='text-rose-600 border-rose-600' />
                  </div>
                }
              >
                <div className='flex gap-2'>
                  <p className="font-semibold">Video:</p>
                  <p>{data.video}</p>
                </div>
              </List.Item>
              <List.Item 
                extra={
                  <div className="flex gap-2">
                    <Button onClick={()=>onMedia(data.id,'assets')} icon={<PlusOutlined />} className='text-indigo-600 border-indigo-600' />
                    <Button onClick={()=>onDelete(data.id,'assets')} icon={<DeleteFilled />} className='text-rose-600 border-rose-600' />
                  </div>
                }
              >
               <div className='flex gap-2'>
                  <p className="font-semibold">Assets:</p>
                  <p>{data.assets}</p>
                </div>
              </List.Item>
            </List>
            <Button className="bg-rose-600 w-fit" type="primary" onClick={()=>onDeleteLesson(data.id)}>Delete Lesson</Button>
            <Modal 
              open={fileDialog} 
              onCancel={()=>setFileDialog(false)} 
              footer={null}
              width={1000}
            >
                <div className='flex flex-col gap-y-6'>
                  <Uploader />  
                  <Files select />
                </div>
            </Modal>
        </div>
    );
  }

  const Lessons = ()=>{
    const { token } = theme.useToken();
    const panelStyle = {
        marginBottom: 24,
        background: token.colorFillAlter,
        borderRadius: token.borderRadiusLG,
        border: '1px solid #f2f2f2',
    };

    return (
        <Collapse
        bordered={false}
        defaultActiveKey={['1']}
        expandIcon={({ isActive }) => <CaretRightOutlined rotate={isActive ? 90 : 0} />}
        style={{
            background: token.colorBgContainer,
        }}
        items={lessons.map((item,index)=>(
          {
            label: item.title ,
            key: index,
            children: <LessonContent data={item} />,
            style: panelStyle
          }
        ))}
    />
    )
  }


  const fetcher = async(url)=>{
    try {
      const httpRequest = http(session && session.user.access)
      const {data} = await httpRequest.get(url)
      return data
    }
    catch(err)
    {
      throw new Error(err)
    }
  }

  const {data, error, isLoading} = useSWR(
    (router.query.id && session) ? `/topic/course/${router.query.id}` : null,
    (router.query.id && session) ? fetcher : null
  )


    const [drawerState, setDrawerState] = useState({
        open: false,
        title: null,
        topic: null
    });
    const [open,setOpen] = useState(false);

    const onTopicCreate = async (values)=>{
      try {
        values.course = router.query.id
        const httpRequest = http(session && session.user.access)
        await httpRequest.post('/topic/',values)
        mutate(`/topic/course/${router.query.id}`)
      }
      catch(err)
      {
        message.error(err.message)
      }
      finally {
        topicForm.resetFields()
        setOpen(false)
      }
    }

  const onDelete = async (id)=>{
    try {
      const httpRequest = http(session && session.user.access)
      await httpRequest.delete(`/topic/${id}`)
      mutate(`/topic/course/${router.query.id}`)
    }
    catch(err)
    {
      message.error(err.message)
    }
  }

  const onSave = async (values)=>{
    try {
      const httpRequest = http(session && session.user.access)
      await httpRequest.put(`/topic/${editForm.id}/`,values)
      mutate(`/topic/course/${router.query.id}`)
    }
    catch(err)
    {
      message.error(err.message)
    }
    finally {
      setOpen(false)
      setEditForm(null)
      topicForm.resetFields()
    }
  }

  const editRequest = (item)=>{
    topicForm.setFieldsValue(item)
    setEditForm(item)
    setOpen(true)
  }

  const onCancel = ()=>{
    setOpen(false)
    setEditForm(null)
  }

  const onLessonCreate = async (values)=>{
    try {
      values.topic = drawerState.topic
      const httpRequest = http(session && session.user.access)
      const {data} = await httpRequest.post(`/lesson/`,values)
      setLessons([...lessons,data])
    }
    catch(err)
    {
      message.error(err.message)
    }
    finally {
      lessonForm.resetFields()
      setLessonModal(false)
    }
  }

  const onDrawerClose = ()=>{
    setDrawerState({...drawerState, open: false, topic: null})
    setLessonId(null)
    setLessons([])
    dispatch(resetFile())
  }

  const onDrawer = async (text,id)=>{
    try {
      setDrawerState({
        topic: id,
        title: text, 
        open: true,
      })
      const httpRequest = http(session && session.user.access)
      const {data} = await httpRequest.get(`/lesson/topic/${id}/`)
      setLessons(data)
    }
    catch(err)
    {
      console.log(err)
      message.error(err.message)
    }
  }

  const columns = [
    {
      title: 'Topics',
      dataIndex: 'title',
      key: 'title',
      render: (text,item)=><a href="#" className='capitalize' onClick={()=>onDrawer(text,item.id)}>{text}</a>
    },
    {
      title: 'Date',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text)=><label>{moment(text).format('DD-MM-YYYY HH:MM:SS A')}</label>
    },
    {
      title: 'Actions',
      key: 'actions',
      render: (_,item)=>(
          <div className='flex gap-x-4'>
              <Button 
                  icon={<EditFilled />}
                  className="flex justify-center items-center text-indigo-500 bg-indigo-50"
                  type="primary"
                  onClick={()=>editRequest(item)}
              />
              <Button 
                  icon={<DeleteFilled />}
                  className="flex justify-center items-center text-rose-500 bg-rose-50"
                  type="primary"
                  onClick={()=>onDelete(item.id)}
              />
          </div>
      )
    }
  ];
  


  return (
    <Layout
            title={router.query.curriculum && router.query.curriculum.split("-").join(" ")}
            subtitle="Add or remove curriculum topics and media files"
            toolbar={
                <Button 
                    onClick={()=>setOpen(true)}
                    size="large"
                    icon={<PlusOutlined />} 
                    className='flex items-center bg-green-500'
                    type="primary"
                    style={{borderRadius: 0}}
                >Add Section</Button>
            }
        >
        {
          isLoading && <Skeleton active />
        }
        {
          data && 
          <Table
            rowKey="key"
            columns={columns}
            dataSource={data}
        />
        }
        <Modal open={open} onCancel={onCancel} footer={null} title="Add a topic">
            <Form form={topicForm} layout='vertical' onFinish={editForm ? onSave : onTopicCreate}>
              <Form.Item
                label="Title"
                name="title"
                rules={[{
                  required: true,
                  message: 'Title is required'
                }]}
              >
                <Input size="large" />
              </Form.Item>
              <Form.Item>
                {
                  !editForm && 
                  <Button htmlType='submit' type="primary" className='bg-blue-500' size="large">Submit</Button>
                }
                {
                  editForm && 
                  <Button htmlType='submit' type="primary" className='bg-rose-500' size="large">Save</Button>
                }
              </Form.Item>
            </Form>
        </Modal>
        <Drawer 
            title={drawerState.title}
            placement="right" 
            onClose={onDrawerClose} 
            open={drawerState.open}
            width={1080}
            extra={<Button onClick={()=>setLessonModal(true)} icon={<PlusOutlined />} type="primary" className="bg-violet-500 flex items-center" style={{borderRadius: 0}}>Add Lesson</Button>}
        > 
            <Lessons />
        </Drawer>
        <Modal title="New Lesson" open={lessonModal} onCancel={()=>setLessonModal(false)} footer={null}>
          <Form onFinish={onLessonCreate} form={lessonForm}>
            <Form.Item name="title" rules={[{required: true}]}>
              <Input />
            </Form.Item>

            <Form.Item>
              <Button htmlType='submit' type="primary" className='bg-blue-500'>Submit</Button>
            </Form.Item>
          </Form>
        </Modal>
    </Layout>
  );
};
export default Cur;