import {useState} from 'react';
import Layout from '@components/shared/layout';
import {
    Input,
    Button,
    Card,
    Avatar,
    Dropdown,
    Tooltip,
    Divider,
    Pagination,
    Menu,
    Drawer,
    Form
} from 'antd';
import {
    SearchOutlined,
    UserOutlined,
    EnvironmentOutlined,
    MoreOutlined,
    VideoCameraOutlined,
    MailOutlined,
    BlockOutlined,
    CalendarOutlined,
    EditOutlined,
    DeleteOutlined
} from '@ant-design/icons';

const options = { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
}

const students = [
    {
        name: 'er saurav',
        image: '/images/01.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'rahul kumar',
        image: '/images/02.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'shreay kumari',
        image: '/images/03.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'er saurav',
        image: '/images/01.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'rahul kumar',
        image: '/images/02.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'shreay kumari',
        image: '/images/03.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'er saurav',
        image: '/images/01.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'rahul kumar',
        image: '/images/02.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    },
    {
        name: 'shreay kumari',
        image: '/images/03.jpg',
        state: 'karnatka',
        payment: 12000,
        totalCourses: 12,
        createdAt: new Date().toLocaleString('en-US',options)
    }
] 

const Students = ()=>{
    const [open,setOpen] = useState(false)
    const itemRender = (_, type, originalElement) => {
        if (type === 'prev') {
          return <a>Previous</a>;
        }
        if (type === 'next') {
          return <a>Next</a>;
        }
        return originalElement;
    };

    const Toolbar = ()=>{
        return (
            <>
                <Input
                    className='border-gray-200 w-96' 
                    placeholder="Search Students"
                    style={{borderRadius: 0}}
                    suffix={
                        <Button  
                            className='flex text-gray-200 items-center justify-center'
                            type="text"
                        >
                            <SearchOutlined />
                        </Button>
                    }
                />
                <Button 
                    size="large" 
                    type="primary" 
                    className='bg-green-500 flex items-center'
                    style={{borderRadius: 0}}
                    icon={<UserOutlined />}
                    onClick={()=>setOpen(true)}
                >
                    Enroll
                </Button>
            </>
        )
    }

    const Title = ({item})=>{
        return (
            <div className='flex items-center gap-x-4 py-4'>
                <Avatar style={{width: 48, height: 48}} src={item.image} />
                <div>
                    <h1 className='text-lg capitalize'>{item.name}</h1>
                    <p className='text-xs text-zinc-400 flex items-center gap-x-px'>
                        <EnvironmentOutlined />
                        {item.state}
                    </p>
                </div>
            </div>
        )
    }

    const Extra = ({item})=>{
        const menu = (
            <Menu>
                <Menu.Item key="edit">
                    <div className='flex gap-x-2 items-center'>
                        <EditOutlined />
                        Edit
                    </div>
                </Menu.Item>
                <Menu.Item key="delete">
                    <div className='flex gap-x-2 items-center'>
                        <DeleteOutlined />
                        Delete
                    </div>
                </Menu.Item>
            </Menu>
        )
        return (
            <Dropdown overlay={menu} arrow placement='bottomRight'>
                <Button 
                    shape="circle"
                    icon={<MoreOutlined />} 
                    className='flex items-center justify-center bg-gray-100'
                    type="text"
                />
            </Dropdown>
        )
    }

    return (
        <Layout
            title="Students"
            subtitle="List of creative students and users"
            toolbar={<Toolbar />}
        >
            <div>
                <div className='grid md:grid-cols-3 gap-6'>
                    {
                        students.map((student,index)=>(
                            <Card 
                                className='shadow-lg animate__animated animate__fadeIn' 
                                key={index}
                                title={<Title item={student} />}
                                extra={<Extra item={student} />}
                            >
                                <div className='flex justify-between items-center mb-5'>
                                    <div className='flex items-center gap-x-4'>
                                        <Button 
                                            shape="circle"
                                            type="text"
                                            className='bg-green-200 text-green-600 font-semibold'
                                        >
                                        ₹
                                        </Button>
                                        <p className='font-semibold'>Payments</p>
                                    </div>
                                    <p className='text-gray-600'>{student.payment}</p>
                                </div>

                                <div className='flex justify-between items-center mb-5'>
                                    <div className='flex items-center gap-x-4'>
                                        <Button 
                                            shape="circle"
                                            type="text"
                                            className='bg-orange-200 font-semibold flex items-center justify-center'
                                            icon={<VideoCameraOutlined className="text-orange-600" />}
                                        />
                                        <p className='font-semibold'>Total Courses</p>
                                    </div>
                                    <p className='text-gray-600'>{student.totalCourses}</p>
                                </div>

                                <div className='flex justify-between items-center'>
                                    <div className='flex items-center gap-x-4'>
                                        <Button 
                                            shape="circle"
                                            type="text"
                                            className='bg-indigo-200 font-semibold flex items-center justify-center'
                                            icon={<CalendarOutlined className="text-indigo-600" />}
                                        />
                                        <p className='font-semibold'>Joined</p>
                                    </div>
                                    <p className='text-gray-600'>{student.createdAt}</p>
                                </div>
                                <Divider>
                                    <div className='flex gap-x-4'>
                                        <Tooltip title="Message">
                                            <Button 
                                                size="large"
                                                type="text"
                                                shape="circle"
                                                icon={<MailOutlined className='text-blue-600' />}
                                                className='bg-blue-50 flex items-center justify-center'
                                            />
                                        </Tooltip>
                                        <Tooltip title="Block">
                                            <Button 
                                                size="large"
                                                type="text"
                                                shape="circle"
                                                icon={<BlockOutlined className='text-rose-600' />}
                                                className='bg-rose-50 flex items-center justify-center'
                                            />
                                        </Tooltip>
                                    </div>
                                </Divider>
                            </Card>
                        ))
                    }
                </div>
                <div className='flex justify-end mt-8'>
                    <Pagination total={500} itemRender={itemRender} />
                </div>
                
            </div>
            <Drawer 
                title="Enroll a Student"
                open={open}
                onClose={()=>setOpen(false)}
                width={600}
            >
                <Form layout='vertical'>
                    <div className='flex gap-x-4'>
                        <Form.Item
                            label="Student`s Name"
                            name="studentName"
                            rules={[{
                                required: true,
                                message: 'Student`s name is required'
                            }]}
                            className='w-full'
                        >
                            <Input size="large" placeholder='Name of student' />
                        </Form.Item>
                        <Form.Item
                            label="Mobile"
                            name="mobile"
                            rules={[{
                                required: true,
                                message: 'Mobile is required'
                            }]}
                            className='w-full'
                        >
                            <Input size="large" placeholder='0123456789' />
                        </Form.Item>
                    </div>
                    <Form.Item
                            label="Email"
                            name="email"
                            rules={[{
                                required: true,
                                message: 'Email is required'
                            }]}
                            className='w-full'
                        >
                            <Input size="large" placeholder='example@mail.com' />
                    </Form.Item>
                    <Form.Item>
                        <Button htmlType='submit' size="large" type="primary" className='bg-violet-600'>SUBMIT</Button>
                    </Form.Item>
                </Form>
            </Drawer>
        </Layout>
    )
}

export default Students