import React, { useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

import { InboxOutlined } from '@ant-design/icons';
import { message, Upload } from 'antd';

const { Dragger } = Upload;
const props = {
  name: 'file',
  multiple: true,
  action: 'https://www.mocky.io/v2/5cc8019d300000980a055e76',
  onChange(info) {
    const { status } = info.file;
    if (status !== 'uploading') {
      console.log(info.file, info.fileList);
    }
    if (status === 'done') {
      message.success(`${info.file.name} file uploaded successfully.`);
    } else if (status === 'error') {
      message.error(`${info.file.name} file upload failed.`);
    }
  },
  onDrop(e) {
    console.log('Dropped files', e.dataTransfer.files);
  },
};

const Addblog = () => {
  const [desc, setDesc] = useState();
  const handleDesc = (e) => {
    console.log(e);
    setDesc(e);
  };
  return (
    <div>
      <h3 className="mb-4 title">Add Blog</h3>

      <div>
        <form action="">
          <Dragger {...props}>
            <p className="ant-upload-drag-icon">
              <InboxOutlined />
            </p>
            <p className="ant-upload-text">
              Click or drag file to this area to upload
            </p>
            <p className="ant-upload-hint">
              Support for a single or bulk upload. Strictly prohibited from
              uploading company data or other banned files.
            </p>
          </Dragger>
          <div className="mt-4">
            <CustomInput type="text" label="Enter Blog Title" />
          </div>
          <select name="" id="" className="form-control mb-3 mt-3">
            <option value="">Select Blog Category</option>
          </select>
          <ReactQuill
            theme="snow"
            value={desc}
            onChange={(event) => {
              handleDesc(event.target);
            }}
          />
          <button className="button rounded-3 my-4">Add Blog</button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
