import { useSession } from 'next-auth/react';
import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { setUpload } from '@redux/slices/upload';
import AWS from '@modules/aws'
const s3 = new AWS.S3()
const { Dragger } = Upload;



const Uploader = ()=>{
  const dispatch = useDispatch()
  const {upload} = useSelector(response=>response)

  const {data: session} = useSession()
  const props = {
    name: 'file',
    multiple: true,
    action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
    customRequest: async ({file, onProgress, onSuccess, onError})=>{
      const uploader = s3.upload({
        Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET,
        Key: `${session && session.user.id}/${Date.now()}/${file.name}`,
        Body: file
      })

      uploader.on('httpUploadProgress',({loaded, total})=>{
        const p = Math.round((loaded/total)*100)
        onProgress({percent: p})
      })

      try {
        const data = await uploader.promise()
        message.success(`File Uploaded - ${data.Key}`)
        dispatch(setUpload(upload+1))
        onSuccess()
      }
      catch(err)
      {
        onError(err.message)
      }
    },
    onDrop(e) {
      console.log('Dropped files', e.dataTransfer.files);
    },
  };


  
    return (
              <Dragger {...props}>
                  <p className="ant-upload-drag-icon">
                  <InboxOutlined />
                  </p>
                  <p className="ant-upload-text">Click or drag file to this area to upload</p>
                  <p className="ant-upload-hint">
                  Support for a single or bulk upload. Strictly prohibited from uploading company data or other
                  banned files.
                  </p>
              </Dragger>
            )
}

export default Uploader;