import Layout from '@components/shared/layout';
import {Button, Table, Tag, Dropdown, Skeleton, message} from 'antd';
import {CrownOutlined,ClockCircleOutlined, DeleteOutlined, EditOutlined, EyeOutlined, FireOutlined, MoreOutlined, PlusOutlined, StarOutlined} from '@ant-design/icons';
import Link from 'next/link';
import Image from 'next/image';
import useSWR, {mutate} from 'swr'
import http from '@modules/http'
import { useSession } from 'next-auth/react';
import AWS from '@modules/aws'
const s3 = new AWS.S3()

const actionDesign = (text,obj)=>{
    const items = [
        {
            key: '1',
            label: (
                <Link legacyBehavior href={`/admin/courses/${obj.title.toLowerCase().split(" ").join("-")}?id=${obj.id}`}>
                    <a className="flex gap-x-2 items-center">
                        <EyeOutlined className="text-green-500" />
                        View
                    </a>
                </Link>
            )
        },
        {
            key: '2',
            label: (
                <a className="flex gap-x-2 items-center" target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <EditOutlined className='text-violet-500' />
                    Edit
                </a>
            )
        },
        {
            key: '3',
            label: (
                <a className="flex gap-x-2 items-center" target="_blank" rel="noopener noreferrer" href="https://www.antgroup.com">
                    <DeleteOutlined className='text-rose-500' />
                   Delete
                </a>
            )
        }
    ]

    return (
        <Dropdown
            menu={{
                items,
            }}
            placement="bottomLeft"
            arrow
            >
            <Button icon={<MoreOutlined />} className='flex items-center justify-center' type="text" />
        </Dropdown>
    )
}

const Courses = ()=>{
    const {data: session} = useSession()

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

    const {data, error, isLoading} = useSWR(session ? `/course/${session.user.id}` : null,session ? fetcher : null)

    const onCourseImageChange = (courseId)=>{
        const input = document.createElement("input")
        input.type = "file"
        input.click()
        input.onchange = async ()=>{
            const file = input.files[0]
            input.remove()
            const uploader = s3.upload({
                Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
                Key: `${session && session.user.id}/thumbnail/${Date.now()}/${file.name}`,
                Body: file,
                ACL: 'public-read'
            })

            try {
                const {Location} = await uploader.promise()
                const httpRequest = http(session && session.user.access)
                await httpRequest.put(`/course/extra/${courseId}/`,{image: Location})
                mutate(session ? `/course/${session.user.id}` : null)
            }
            catch(err)
            {
                console.log(err)
                message.error(err.message)
            }
        }
    }

    const courseDesign = (text,obj)=>{
        return (    
            <div className='flex gap-x-4'>
                <button onClick={()=>onCourseImageChange(obj.id)}>
                    {
                        !obj.image && 
                        <Image 
                            src='/images/course-placeholder.jpg'
                            width={150}
                            height={100}
                            alt={obj.title}
                        />
                    }
                    {
                        obj.image && 
                        <Image 
                            src={obj.image}
                            width={150}
                            height={100}
                            alt={obj.title}
                        />
                    }
                </button>
                
                <div>
                    <Link href={`/admin/courses/${obj.title.toLowerCase().split(" ").join("-")}?id=${obj.id}`}>
                        <h1 className='capitalize font-semibold text-[16px]'>{obj.title}</h1>
                    </Link>
                    <div  className='flex gap-4 items-center text-sm text-gray-500'>
                        <div className='flex gap-1'>
                            { obj.level === "beginner" && <FireOutlined /> }
                            { obj.level === "intermediate" && <StarOutlined /> }
                            { obj.level === "advanced" && <CrownOutlined /> }
                            <p className='capitalize'>{obj.level}</p>
                        </div>

                        <div className='flex gap-1'>
                            <ClockCircleOutlined />
                            <p className='capitalize'>{obj.duration}</p>
                            <p className='capitalize'>{obj.durationIn}</p>
                        </div>

                        <p className='capitalize'>₹ {obj.price}</p>
                       
                    </div>
                </div>
            </div>
        )
    }

    const columns = [
        {
            title: 'Courses',
            dataIndex: 'title',
            key: 'title',
            render: courseDesign
        },
        {
            title: 'Action',
            dataIndex: 'action',
            key: 'action',
            render: actionDesign
        }
    ]


    const Toolbar = ()=>{
        return (
            <Link href="/admin/courses/new">
                <Button 
                    size="large" 
                    type="primary" 
                    className='bg-indigo-600 flex items-center'
                    style={{borderRadius: 0}}
                    icon={<PlusOutlined />}
                >
                    New Course
                </Button>
            </Link>
        )
    }


    return (
        <Layout
            title="Courses"
            subtitle="Start you journey by creating a course"
            toolbar={<Toolbar />}
        >
            <div>
                { isLoading && <Skeleton active/> }
                { error && <p>{error.message}</p>}
                { data && <Table dataSource={data} columns={columns} />}  
            </div>
        </Layout>
    )
}

export default Courses;