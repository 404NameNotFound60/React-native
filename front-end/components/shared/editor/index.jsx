import React, { useState } from 'react';
import dynamic from 'next/dynamic'
import 'react-quill/dist/quill.snow.css';

const ReactQuill = dynamic(()=>import('react-quill'),{ssr: false})

const Editor = ({getValue})=>{
  const [value, setValue] = useState('');

  const onChange = (data)=>{
    setValue(data)
    getValue(data)
  }

  return <ReactQuill theme="snow" value={value} onChange={onChange} />;
}

export default Editor