import {useEffect, useState} from 'react'
import AWS from '@modules/aws'
import {message, Table, Button, Skeleton} from 'antd'
import { useSelector, useDispatch } from 'react-redux'
import {selectFile} from '@redux/slices/file'
import {DeleteFilled, CheckCircleFilled} from '@ant-design/icons'
import { useSession } from 'next-auth/react'
const s3 = new AWS.S3()

const List = ({select= false})=>{
  const dispatch = useDispatch()
  const {upload} = useSelector(response=>response)
  const [validate, setValidate] = useState(0)
  const {data: session} = useSession()
  const [data, setData] = useState(null)

  const onDelete = async (item)=>{
    try {
      await s3.deleteObject({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
        Key: item.path
      }).promise()
      setValidate(validate+1)
      message.success('File deleted successfully !')
    }
    catch(err)
    {
      message.error('Delete failed !')
    }
  }

  const onSelect = (item)=>{
    dispatch(selectFile(item))
  }

  const columns = [
    {
      title: 'File',
      dataIndex: 'file',
      key: 'file'
    },
    {
      title: 'Size',
      dataIndex: 'size',
      key: 'size'
    },
    {
      title: 'Path',
      dataIndex: 'path',
      key: 'path'
    },
    {
      title: 'Last modified',
      dataIndex: 'modified',
      key: 'modified'
    },
    {
      title: 'Action',
      dataIndex: 'action',
      key: 'action',
      render: (_,item)=>(
      <>
        <Button className='text-rose-500' icon={<DeleteFilled />} type="text" onClick={()=>onDelete(item)} />
        {select && <Button className='text-indigo-500' icon={<CheckCircleFilled />} type="text" onClick={()=>onSelect(item)} />}
      </>
      )
    }
  ]

  useEffect(()=>{
    s3.listObjects({
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
      Prefix: `${session && session.user.id}/`
    },(err,obj)=>{
      console.log(obj)
      const modified = obj.Contents.map((item)=>{
        const tmp = item.Key.split('/')
        return {
          file: tmp[tmp.length-1],
          size: item.Size,
          path: item.Key,
          modified: item.LastModified.toLocaleDateString()+' '+item.LastModified.toLocaleTimeString()
        }
      })
      setData(modified)
    })
  },[validate,upload])

  if(!data)
  return <Skeleton active />

  return (
    <div>
      <Table 
        dataSource={data}
        columns={columns}
      />
    </div>
  )
}

export default List