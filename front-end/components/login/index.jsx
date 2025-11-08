import { useSession, signIn } from 'next-auth/react';
import Logo from '../shared/logo';
import {Spin, Form, Button, Input, Divider} from 'antd';
import {
    LoadingOutlined
} from '@ant-design/icons';

import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
const {Item} = Form;

const Login = ()=>{
    const router = useRouter()
    const {data: session, status} = useSession()

    if(status === "loading")
    return (
        <div className='flex justify-center items-center min-h-screen'>
            <Spin indicator={<LoadingOutlined style={{fontSize: 32}} />} spin="true" />
        </div>
        )

    if(status === "authenticated")
    {
        router.push('/admin');
        return;
    }

    const onFinish = (values)=>{
        values.username = values.email.split("@")[0]
        signIn('credentials',values)
    }

    return (
        <div className='bg-gray-100 min-h-screen flex items-center justify-center'>
            <div className="animate__animated animate__zoomIn animate__faster bg-white rounded-lg border p-8 md:w-4/12 w-11/12 flex flex-col gap-y-4">
                <div className='flex items-center'>
                    <h1 className='text-2xl font-semibold'>Say Hi !</h1>
                    <Logo />
                </div>
                
                <Form onFinish={onFinish} autoComplete='off'>
                    <Item
                        name="email"
                        rules={[
                            {required: true, message: 'This field is required'}
                        ]}
                    >
                        <Input size="large" style={{borderRadius: 0}} placeholder='Email*' />
                    </Item>
                    <Item
                        name="password"
                        rules={[
                            {required: true, message: 'This field is required'}
                        ]}
                    >
                        <Input type="password" size="large" style={{borderRadius: 0}} placeholder='Password*' />
                    </Item>
                    <Item>
                        <Button 
                            htmlType='submit'
                            size="large" 
                            style={{borderRadius: 0}} 
                            className='w-full bg-indigo-900 text-white border-indigo-900 font-semibold'
                        >Login</Button>
                    </Item>
                </Form>
                
                <Divider>OR</Divider>

                <Button 
                    className='flex items-center justify-center py-6 font-semibold'
                    icon={<Image src="/icons/google.png" width={32} height={32} alt="google" />}
                    onClick={()=>signIn('google')}
                >
                    Continue with Google
                </Button>
                
                <Button 
                    className='flex items-center justify-center py-6 font-semibold'
                    icon={<Image src="/icons/facebook.png" width={32} height={32} alt="google" />}
                    onClick={()=>signIn('facebook')}
                >
                    Continue with Facebook
                </Button>

                <Divider />
                <div className='flex gap-x-2 justify-center'>
                    <p>Don`t have an account ?</p>
                    <Link href="/register" legacyBehavior>
                        <a className='text-indigo-900 font-semibold'>Register now</a>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Login