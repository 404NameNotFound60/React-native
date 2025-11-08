import Image from 'next/image';
import {useEffect, useState} from 'react';
import Layout from '@components/shared/layout';
import Editor from '@components/shared/editor';
import {
    Form,
    Input,
    Select,
    Button,
    Card,
    Checkbox,
    List,
    Modal,
    message
} from 'antd';
import http from '@modules/http'
import { CheckOutlined } from '@ant-design/icons';
import { useSession } from 'next-auth/react';
const {Option} = Select;
import useSWR, {mutate} from 'swr'


const New = ()=>{
    const {data: session} = useSession()

    const fetcher = async (url)=>{
        try {
            const httpRequest = http(session && session.user.access)
            const {data} = await httpRequest.get(url)
            return data
        }
        catch(err)
        {
            return null
        }
    }

    const {data, error} = useSWR(`/category/${session && session.user.id}`,fetcher)
    const [form] = Form.useForm()
    const [categoryForm] = Form.useForm()
    const [editorLoading, setEditorLoading] = useState(true);
    const [editorValue, setEditorValue] = useState('');

    // Start upload code
    const [previewOpen, setPreviewOpen] = useState(false);
    const [previewImage, setPreviewImage] = useState('');
    const [previewTitle, setPreviewTitle] = useState('');
    const handleCancel = () => setPreviewOpen(false);

    useEffect(()=>{
        setEditorLoading(false)
    },[])

    const onFinish = async (values)=>{
        try {
            values.description = editorValue;
            const httpRequest = http(session && session.user.access)
            await httpRequest.post('/course/',values)
            message.success('Course created successfully !')
        }
        catch(err)
        {
            message.error('Course creation failed')
        }
        finally
        {
            form.resetFields()
        }
    }

    const onCategory = async (values)=>{
        try {
            const httpRequest = http(session && session.user.access)
            await httpRequest.post('/category/',values)
            mutate(`/category/${session && session.user.id}`)
            message.success('Category created successfully !')
        }
        catch(err)
        {
            message.error('Category creation failed')
        }
        finally
        {
            categoryForm.resetFields()
        }
    }

    const onCategoryDelete = async (id)=>{
        try {
            const httpRequest = http(session && session.user.access)
            await httpRequest.delete(`/category/${id}/`)
            mutate(`/category/${session && session.user.id}`)
        }
        catch(err)
        {
            message.error('Unable to delete category')
        }
    }

    return (
        <Layout
            title="New Course"
            subtitle="Create a course to start your new journey"
        >
            <div className='flex gap-6'>
                <div className='w-9/12'>
                    <Card title="Course Information">
                        <Form onFinish={onFinish} layout='vertical' form={form}>
                            <div className='flex gap-x-6'>
                                <Form.Item
                                    className='w-full'
                                    label="Course Title"
                                    name="title"
                                    rules={[{required: true, message: 'Course title is required'}]}
                                >
                                    <Input 
                                        placeholder='Reactjs course'
                                        size="large"
                                        style={{borderRadius: 0}}
                                    />
                                </Form.Item>
                                <Form.Item
                                    label="Duration"
                                    name="duration"
                                    rules={[{required: true, message: 'Duration is required'}]}
                                >
                                    <Input
                                        type="number" 
                                        placeholder='3'
                                        size="large"
                                        style={{borderRadius: 0}}
                                        addonAfter={
                                            <Form.Item name="durationIn">
                                                <Select 
                                                    style={{minWidth: 100}} 
                                                    placeholder='Select'
                                                    size="large"
                                                >
                                                    <Option value="months">Months</Option>
                                                    <Option value="days">Days</Option>
                                                    <Option value="years">Years</Option>
                                                    <Option value="hours">Hours</Option>
                                                </Select>
                                            </Form.Item>
                                        }
                                    />
                                </Form.Item>
                            </div>
                            <div className='flex gap-x-6'>
                                <Form.Item
                                    className='w-full'
                                    label="Category"
                                    name="category"
                                    rules={[{required: true, message: 'Category is required'}]}
                                >
                                    <Select placeholder="Category" size="large">
                                        {
                                            data && data.map((item,index)=>(
                                                <Option key={index} value={item.title.toLowerCase()} className='capitalize'>
                                                    {item.title}
                                                </Option>
                                            ))
                                        }
                                    </Select>
                                </Form.Item>

                                <Form.Item
                                    className='w-full'
                                    label="Price"
                                    name="price"
                                    rules={[{required: true, message: 'Price is required'}]}
                                >
                                    <Input 
                                        size="large"
                                        placeholder='00.00'
                                    />
                                </Form.Item>

                                <Form.Item
                                    className='w-full'
                                    label="Discount"
                                    name="discount"
                                    rules={[{required: true, message: 'Discount is required'}]}
                                >
                                    <Input 
                                        size="large"
                                        placeholder='25'
                                        addonAfter={<span className='font-semibold'>%</span>}
                                    />
                                </Form.Item>
                            </div>

                                <Form.Item
                                    className='w-full'
                                    label="Description"
                                    name="description"
                                >
                                    <Editor 
                                        loading={editorLoading}
                                        getValue={(value)=>setEditorValue(value)}
                                    />
                                </Form.Item>

                                <Form.Item
                                    label="Level"
                                    name="level"
                                    rules={[{required: true, message: 'Level is required'}]}
                                    className='w-[200px]'
                                >
                                    <Select size="large" placeholder="Level">
                                        <Option value="beginner">Beginner</Option>
                                        <Option value="intermediate">Intermediate</Option>
                                        <Option value="advanced">Advanced</Option>
                                    </Select>
                                </Form.Item>

                                <div className='flex gap-x-6'>
                                    <Form.Item name="free" valuePropName="checked">
                                        <Checkbox>is Free ?</Checkbox>
                                    </Form.Item>

                                    <Form.Item name="live" valuePropName="checked">
                                        <Checkbox>is Live ?</Checkbox>
                                    </Form.Item>
                                </div>
                                
                                <Form.Item>
                                        <Button type="primary" className='bg-violet-600' size="large" htmlType='submit'>Create</Button>
                                </Form.Item>
                        </Form>
                    </Card>
                </div>
                <div className='w-3/12'>
                    <Card title="Category">
                        <Form onFinish={onCategory} form={categoryForm}>
                            <Form.Item name="title">
                                <Input
                                    className='mb-2.5'
                                    size="large"
                                    placeholder="Category name"
                                    suffix={<Button
                                        htmlType='submit' 
                                        icon={<CheckOutlined className='text-white' />}
                                        className='flex items-center justify-center bg-green-400'
                                        type="text"
                                        shape="circle"
                                    />}
                                    style={{borderRadius: 0}}
                                />
                            </Form.Item>
                        </Form>
                        {
                            data && 
                            <List
                            className="demo-loadmore-list"
                            itemLayout="horizontal"
                            dataSource={data}
                            renderItem={(item) => (
                                <List.Item
                                actions={[
                                    <Button key="delete" type="text" className='text-rose-600' onClick={()=>onCategoryDelete(item.id)}>Delete</Button>
                                ]}
                                className='capitalize'
                                >
                                    {item.title}
                                </List.Item>
                            )}
                            />
                        }
                        
                    </Card>
                </div>
            </div>
            <Modal open={previewOpen} title={previewTitle} footer={null} onCancel={handleCancel}>
                <Image
                    alt="preview"
                    width={0}
                    height={0}
                    layout="responsive"
                    src={previewImage}
                />
            </Modal>
        </Layout>
    )
}

export default New