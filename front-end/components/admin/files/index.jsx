import {useState} from 'react';
import Layout from '@components/shared/layout';
import Upload from './upload';
import List from './list';
import {Input, Button, Breadcrumb, Modal, Form} from 'antd';
import {
  SearchOutlined,
  PlusOutlined,
  ArrowLeftOutlined
} from '@ant-design/icons';

const Files = ()=>{
  const [open,setOpen] = useState(false);

  const onFinish = (values)=>{
    console.log(values)
  }

  const Toolbar = ()=>{
    return (
        <>
            <Input
                className='border-gray-200' 
                placeholder="Search files"
                style={{borderRadius: 0, width: 550}}
                suffix={
                    <Button  
                        className='flex text-gray-200 items-center justify-center'
                        type="text"
                    >
                        <SearchOutlined />
                    </Button>
                }
            />
        </>
    )
  }

  return (
    <Layout
      title="Files & Media"
      subtitle="Manage your file assets media and use them later"
      toolbar={<Toolbar />}
    >
      <div className='flex flex-col gap-y-6 w-9/12 mx-auto'>
        <Upload />
        <div className='flex flex-col gap-y-6'>
          <List />
        </div>
      </div>
      <Modal 
        title={
          <div>
            <h1>New folder</h1>
            <Breadcrumb
              items={[
                {
                  title: 'Home',
                },
                {
                  title: <a href="">Application Center</a>,
                },
                {
                  title: <a href="">Application List</a>,
                },
                {
                  title: 'An Application',
                },
              ]}
            />
          </div>
        }
        open={open}
        centered
        footer={null}
        onCancel={()=>setOpen(false)}
      >
        <Form onFinish={onFinish}>
          <Form.Item
            name="folder"
            rules={[{
              required: true,
              message: 'Folder name is required'
            }]}
          >
            <Input placeholder="Folder name" />
          </Form.Item>
          <Form.Item>
            <Button type="primary" htmlType='submit' className='bg-indigo-600'>Create</Button>
          </Form.Item>
        </Form>
      </Modal>
    </Layout>
  )
}

export default Files