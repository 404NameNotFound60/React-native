import {useState} from 'react';
import { useSession } from 'next-auth/react';
import { EditFilled, PlusOutlined, UserOutlined, CloseOutlined, SyncOutlined } from '@ant-design/icons';
import Layout from '@components/shared/layout'
import {
    Card,
    Form,
    Input,
    Button,
    Tag,
    Empty,
    Modal,
    Avatar,
    message,
    Select
} from 'antd';
import useSWR, {mutate} from 'swr';
import http from '@modules/http';
import banks from '@modules/banks';
const {Option} = Select

const Settings = ()=>{
    const {data: session} = useSession()

    const fetcher = async (url)=>{
        try {
            const httpRequest = http(session && session.user.access)
            const response = await httpRequest.get(url)
            return response.data
        }
        catch(err)
        {
            return null
        }
    }

    
    const [form] = Form.useForm();
    const [bankForm] = Form.useForm();
    const [messageApi, contextHolder] = message.useMessage();
    const [loading, setLoading] = useState({
        index: null,
        state: false,
        type: null
    })
    const [status,setStatus] = useState([]);
    const [open,setOpen] = useState(false);
    const [edit, setEdit] = useState(false);
    const {data, error} = useSWR('/status/',fetcher)

    const bankAccount = async (values)=>{
        try {
            const httpRequest = http(session && session.user.access)
            await httpRequest.post('/bank/',values)
            message.success("Bank acount added successfully !")
        }
        catch(err)
        {
            message.error(err.message)
        }
        finally
        {
            bankForm.resetFields()
        }
    }

    const createStatus = async (values)=>{
        setLoading({
            state: true,
            type: 'create-status'
        })
        try {
            const httpRequest = http(session && session.user.access)
            await httpRequest.post('/status/',values)
            setLoading({
                state: false,
                type: null
            })
            setOpen(false)
            mutate('/status/')
        }
        catch(err)
        {
            messageApi.open({
                type: 'error',
                content: 'Unable to create status please try again later !',
            });
            setLoading({
                state: false,
                type: null
            })
            setOpen(false)
        }
        form.resetFields()
    }

    const deleteStatus = async (id, index)=>{
        setLoading({
            index,
            state: true,
            type: 'status'
        })
        try {   
            await axios({
                method: 'delete',
                url: `/status/${id}/`
            })
            setLoading({
                index: null,
                state: false,
                type: null
            })
            mutate('/status/')
        }
        catch(err)
        {
            setLoading({
                index: null,
                state: false,
                type: null
            })
            console.log(err.response.data)
        }
    }

    const onSave = async (values)=>{
        try {
            const httpRequest = http(session && session.user.access)
            await httpRequest.put(`/auth/profile/${session && session.user.id}/`)
            setEdit(false)
            message.success('Profile updated successfully !')
        }
        catch(err)
        {
            message.error(err.message)
        }
    }

    return (
        <Layout
            title="Configuration"
            subtitle="Config and edit your lms settings"
        >
            <div className="grid grid-cols-3 gap-8">
                <Card 
                    type="inner" 
                    title={<h1 className='text-lg font-semibold'>Profile</h1>}
                    className='col-span-3'
                    extra={
                        <Button icon={<EditFilled />} className='flex items-center justify-center' type="text" onClick={()=>setEdit(!edit)} />
                    }
                >
                    <div className='flex flex-col gap-y-8'>
                        <div className='flex items-center gap-x-6'>
                            <Avatar size={64} icon={<UserOutlined />} className='flex items-center justify-center' />
                            <div>
                                <h1 className='text-lg font-semibold capitalize'>{session && session.user.name}</h1>
                                <p className='text-gray-500'>{session && session.user.email}</p>
                            </div>
                        </div>

                        <Form 
                            className='grid grid-cols-2 gap-x-16' 
                            layout="vertical"
                            initialValues={{
                                fullname: (session && session.user.name),
                                email: (session && session.user.email),
                                country: (session && session.user.country),
                                gender: (session && session.user.gender)
                            }}
                            onFinish={onSave}
                            autoComplete='off'
                        >
                            <Form.Item
                                label="Fullname"
                                name="fullname"
                            >
                                <Input name="fullname" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            <Form.Item
                                label="Email"
                                name="email"
                            >
                                <Input name="email" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            <Form.Item
                                label="Country"
                                name="country"
                            >
                                <Input name="country" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            <Form.Item
                                label="Gender"
                                name="gender"
                            >
                                <Input name="gender" size="large" readOnly={!edit} className={`${!edit && 'border-0 p-0 hover:border-0 focus:shadow-none'}`} />
                            </Form.Item>

                            {
                                edit && 
                                <Form.Item>
                                    <div className='flex gap-x-2'>
                                        <Button size="large" htmlType='submit' type="primary" className='bg-rose-500'>Save</Button>

                                        <Button size="large" htmlType='button' type="primary" className='bg-blue-500' onClick={()=>setEdit(false)}>Cancel</Button>
                                    </div>
                                </Form.Item>
                            }
                            
                        </Form>
                    </div>
                </Card>

                <Card 
                    type="inner" 
                    title={<h1 className='text-lg font-semibold'>Domain</h1>}
                    className='col-span-2'
                >
                    <div className='flex flex-col items-center py-4'>
                        <Empty
                            className='flex flex-col items-center'
                            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
                            imageStyle={{
                                height: 80,
                            }}
                            description={<span>Add your domain for your own branding and identity</span>}
                        >
                            <Button type="primary" style={{borderRadius: 0}} className='bg-violet-500' size="large">Connect</Button>
                        </Empty>
                    </div>
                </Card>

                <Card type="inner" title={<h1 className='text-lg font-semibold'>Status</h1>}>
                    <div className='flex flex-wrap'>
                        {
                            data && data.map((item,index)=>(
                                <Tag 
                                    key={index} 
                                    color={item.color} 
                                    className='capitalize mb-2 flex flex-row-reverse gap-x-1'
                                    icon={
                                        (loading.state && loading.type === "status" && loading.index === index) 
                                        ? 
                                        <SyncOutlined spin />
                                        :
                                        <CloseOutlined onClick={()=>deleteStatus(item.id,index)} />                                   
                                    }
                                >{item.title}</Tag>                               
                            ))
                        }
                    </div>
                    <Button 
                        icon={<PlusOutlined />} 
                        className={`flex items-center bg-amber-500 mt-4 ${status.length === 0 && 'mx-auto'}`} 
                        type="primary" 
                        style={{borderRadius: 0}}
                        onClick={()=>setOpen(true)}
                    >Add</Button>
                </Card>

                <Card type="inner" title={<h1 className='text-lg font-semibold'>KYC & Bank Account</h1>}>
                    <Form onFinish={bankAccount} form={bankForm}>
                        <Form.Item
                            name="bank"
                            rules={[{
                                required: true,
                                message: 'Bank name is required'
                            }]}
                        >
                            <Select placeholder="Choose a bank" size="large">
                                {
                                    banks.map((item,index)=>(
                                        <Option key={index} value={item}>{item}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>
                        <Form.Item
                            name="acountHolder"
                            rules={[{
                                required: true,
                                message: 'Beneficiary name is required'
                            }]}
                        >
                            <Input 
                                size="large"
                                style={{borderRadius: 0}}
                                placeholder="Account holder name"
                            />
                        </Form.Item>

                        <Form.Item
                            name="acNo"
                            rules={[{
                                required: true,
                                message: 'Account number is required'
                            }]}
                        >
                            <Input 
                                size="large"
                                style={{borderRadius: 0}}
                                placeholder="Account number"
                            />
                        </Form.Item>

                        <Form.Item
                            name="ifsc"
                            rules={[{
                                required: true,
                                message: 'IFSC is required'
                            }]}
                        >
                            <Input 
                                size="large"
                                style={{borderRadius: 0}}
                                placeholder="IFSC Code"
                            />
                        </Form.Item>

                        <Form.Item>
                            <Button htmlType='submit' size="large" type="primary" className='bg-indigo-500' style={{borderRadius: 0}}>Submit</Button>
                        </Form.Item>
                    </Form>
                </Card>
            </div>
            <Modal open={open} title="New status" onCancel={()=>setOpen(false)} footer={null}>
                <Form onFinish={createStatus} form={form}>
                    <Form.Item
                        name="title"
                        rules={[{required: true}]}
                    >
                        <Input placeholder="Title" />
                    </Form.Item>

                    <Form.Item
                        name="color"
                        rules={[{required: true}]}
                    >
                        <Input type="color" />
                    </Form.Item>
                    <Form.Item>
                        {
                            (loading.state && loading.type === "create-status") 
                            ?
                            <Button htmlType="button" type="text" loading={true}>Processing</Button>
                            :
                            <Button htmlType="submit" type="primary" className='bg-green-500'>Create</Button>

                        }                      
                    </Form.Item>
                </Form>
            </Modal>
            {contextHolder}
        </Layout>
    )
}

export default Settings;