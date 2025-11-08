import { signOut, useSession } from 'next-auth/react';
import {useState} from 'react';
import {useRouter} from 'next/router';
import Logo from '../logo';
import Link from 'next/link';
import { Spin, Layout, Button, Menu, Breadcrumb, Dropdown, Badge, Avatar } from 'antd';
import {
    DashboardOutlined,
    VideoCameraOutlined,
    PicCenterOutlined,
    FileDoneOutlined,
    UserOutlined,
    AlertOutlined,
    SettingOutlined,
    MailOutlined,
    BellOutlined,
    LogoutOutlined,
    LoadingOutlined
} from '@ant-design/icons';
const {Sider, Content, Header} = Layout

const LayoutEl = ({children, title=null, subtitle=null, toolbar=null})=>{
    const {data: session, status} = useSession()
    const router = useRouter()
    const [open,setOpen] = useState(false);

    if(status === "loading")
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spin indicator={<LoadingOutlined style={{fontSize: 32}} />} spin="true" />
        </div>
        )

    if(status === "unauthenticated")
    {
        router.push('/login');
        return;
    }

    const menus = [
        {
            label: <Link href="/admin">{'Dashboard'}</Link>,
            key: '/admin',
            icon: <DashboardOutlined />
        },
        {
            label: <Link href="/admin/students">{'Students'}</Link>,
            key: '/admin/students',
            icon: <UserOutlined />
        },
        {
            label: <Link href="/admin/courses">{'Courses'}</Link>,
            key: '/admin/courses',
            icon: <VideoCameraOutlined />
        },
        {
            label: <Link href='/admin/files'>{'Files & Media'}</Link>,
            key: '/admin/files',
            icon: <FileDoneOutlined />
        },
        {
            label: <Link href="/admin/sales">{'Sales & Revenue'}</Link>,
            key: '/admin/sales',
            icon: <AlertOutlined />
        },
        {
            label: <Link href="/admin/settings">{'Settings'}</Link>,
            key: '/admin/settings',
            icon: <SettingOutlined />
        },
    ]

    const items = [
        {
            key: '1',
            label: (
                    <a className='flex items-center gap-x-2 capitalize'>
                        <UserOutlined />
                        {session && session.user.name}
                    </a>
            )
        },
        {
            key: '2',
            label: (
                <Link href="#" legacyBehavior>
                    <a className='flex items-center gap-x-2'>
                        <SettingOutlined />
                        Settings
                    </a>
                </Link>
            )
        },
        {
            key: '3',
            label: (
                    <a className='flex items-center gap-x-2' onClick={()=>signOut({callbackUrl: '/login'})}>
                        <LogoutOutlined />
                        Logout
                    </a>
            )
        }
    ]

    /*
    if(loader) return (
        <div className="flex min-h-screen items-center justify-center">
            <Spin size="large" />
        </div>
    )
        */
       
    const breadItems = ()=>{
        const items = router.pathname.split("/").map((item,index)=>(
            {title: <Link href={router.pathname.split(`/${item}`)[0]+`/${item}`}>{item}</Link>}
        ))
        return items;
    }

    return (
        <Layout className='min-h-screen'>
            <Sider 
                trigger={null} 
                collapsible 
                collapsed={open}
                style={{
                    overflow: 'auto',
                    height: '100vh',
                    position: 'fixed',
                    left: 0,
                    top: 0,
                    bottom: 0
                }}
            >
                <div className='py-4'>
                    <Logo color="white" />
                </div>
                <Menu theme="dark" items={menus} selectedKeys={[router.pathname]} /> 
            </Sider>
            <Layout style={{marginLeft: 200}}>
                <Header 
                    className="h-20 bg-white flex justify-between px-6 items-center shadow-sm"
                    style={{
                        position: 'sticky',
                        top: 0,
                        zIndex: 1,
                        width: '100%'
                    }}
                >
                    <div className='flex items-center gap-x-6'>
                        <Button 
                            onClick={()=>setOpen(!open)} 
                            icon={<PicCenterOutlined />} 
                            style={{
                                width: 40,
                                height: 40
                            }}
                            className="flex items-center justify-center"
                        />
                        <div>
                            {
                                title && 
                                <h1 className='capitalize text-lg font-semibold'>{title}</h1>
                            }
                            {
                                subtitle && 
                                <p className='text-sm text-zinc-500'>{subtitle}</p>
                            }
                        </div>
                    </div>
                    <div className='flex items-center gap-x-4'>
                        {toolbar}
                        <Button 
                            shape="circle"
                            size="large"
                            type="text"
                            icon={<MailOutlined className='text-green-600' />} 
                            className='flex items-center justify-center bg-green-100'
                        />
                        <Button 
                            shape="circle"
                            size="large"
                            type="text"
                            icon={
                            <Badge count={12}>
                                <BellOutlined className='text-orange-600' />
                            </Badge>    
                            } 
                            className='flex items-center justify-center bg-orange-100'
                        />
                        <Dropdown
                            menu={{
                                items,
                            }}
                            placement="bottomRight"
                            arrow
                        >
                            {
                                (session && session.user.image) ? 
                                <Avatar src={session.user.image} />
                                :
                                <Avatar className='bg-orange-500 font-bold uppercase'>
                                    {session.user.name[0]}
                                </Avatar>
                            }
                            
                        </Dropdown>
                    </div>
                </Header>
                <Content className="px-8 py-6 flex flex-col gap-y-6 bg-gray-200">
                    <Breadcrumb items={breadItems()} />
                    {children}
                </Content>
            </Layout>
        </Layout>
    )
}

export default LayoutEl;