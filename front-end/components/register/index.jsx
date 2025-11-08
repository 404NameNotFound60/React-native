import {useState} from 'react';
import {useRouter} from 'next/router'
import Logo from '../shared/logo';
import Country from 'public/json/country.json'
import {message, Form, Button, Input, Divider, Select} from 'antd';
import Image from 'next/image';
import Link from 'next/link';
import axios from 'axios';
axios.defaults.baseURL = process.env.NEXT_PUBLIC_ENDPOINT
const {Item} = Form;
const {Option} = Select;

const Register = ()=>{
    const [loading, setLoading] = useState(false)
    const [form] = Form.useForm()
    const router = useRouter()
    const onFinish = async (values)=>{
        values.mobile = (values.prefix+values.mobile)
        values.username = values.email.split("@")[0];
        try {
            setLoading(true)
            await axios.post('/auth/register/',values)
            form.resetFields()
            message.success({
                content: 'Registration Success - Please while we are redirecting you in 3 seconds',
                duration: 2,
                key: 'signup-success'
            })
            setTimeout(()=>router.push('/login'),3000)
        }
        catch(err)
        {
            const error = err.response.data;
            if(error.hasOwnProperty('email'))
            return form.setFields([{name: 'email', errors: error.email}])

            if(error.hasOwnProperty('mobile'))
            return form.setFields([{name: 'mobile', errors: error.mobile}])

            message.error('Register Failed - Internal server error')
            form.resetFields()
        }
        finally
        {
            setLoading(false)
        }
    }

    const prefixSelector = (
        <Item 
            name="prefix" 
            noStyle 
            rules={[{
                required: true,
                message: 'Dial code is required'
            }]}
        >
          <Select
            style={{
              width: 100,
            }}
            placeholder="+00"
          >
            {
                Country.map((item,index)=>(
                    <Option key={index} value={item.dial_code}>
                        {item.dial_code} {item.code}
                    </Option>
                ))
            }
          </Select>
        </Item>
      );

    return (
        <div className='flex md:flex-row flex-col min-h-screen animate__animated animate__fadeIn md:py-0 py-16'>
            <div className='flex flex-col justify-center items-center gap-y-8'>
                <Logo size={80} />
                <Image 
                    src="/images/register.jpg"
                    width={800}
                    height={500}
                    alt="register"
                />
            </div>
            <div className='bg-gray-100 md:w-6/12 flex items-center justify-center'>
                <div className="flex flex-col gap-y-8 md:w-7/12 w-10/12 md:py-0 py-8">
                    <h1 className='md:text-left text-center text-2xl font-semibold'>Start your Journey !</h1>
                    
                    <Form onFinish={onFinish} form={form}>
                        <Item
                            name="fullname"
                            rules={[
                                {required: true, message: 'This field is required'}
                            ]}
                        >
                            <Input size="large" style={{borderRadius: 0}} placeholder='Fullname*' />
                        </Item>

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
                            <Input type="password" size="large" style={{borderRadius: 0}} placeholder='**********' />
                        </Item>
                        <Item
                            name="mobile"
                            rules={[
                            {
                                required: true,
                                message: 'This field is required',
                            },
                            ]}
                        >
                            <Input addonBefore={prefixSelector} size="large" style={{borderRadius: 0}} />
                        </Item>
                        <Item>
                            <Button 
                                htmlType='submit'
                                size="large" 
                                style={{borderRadius: 0}} 
                                className='w-full bg-indigo-900 text-white border-indigo-900 font-semibold'
                                loading={loading}
                            >{loading ? 'Procesing...' : 'Register' }</Button>
                        </Item>
                    </Form>

                    <Divider />
                    <div className='flex gap-x-2 justify-center'>
                        <p>I have an account</p>
                        <Link href="/login" legacyBehavior>
                            <a className='text-indigo-900 font-semibold'>Login</a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Register;