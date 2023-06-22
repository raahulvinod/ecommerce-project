import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getEnquiries } from '../features/enquiry/enquirySlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },

  {
    title: 'Name',
    dataIndex: 'name',
  },
  {
    title: 'Email',
    dataIndex: 'email',
  },
  {
    title: 'Mobile',
    dataIndex: 'mobile',
  },
  {
    title: 'Comment',
    dataIndex: 'comment',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const Enquiries = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getEnquiries());
  }, []);

  const enquiryState = useSelector((state) => state.enquiry.enquiries);

  const data1 = [];
  for (let i = 0; i < enquiryState.length; i++) {
    data1.push({
      key: i + 1,
      name: enquiryState[i].name,
      email: enquiryState[i].email,
      mobile: enquiryState[i].mobile,
      comment: enquiryState[i].comment,
      status: (
        <>
          <select className="form-control form-select">
            <option value="" defaultValue="selected">
              Set status
            </option>
            <option value="">Submitted</option>
            <option value="">Contacted</option>
          </select>
        </>
      ),
      actions: (
        <>
          <Link className="ms-3 fs-3 text-danger" to="/admin">
            <AiFillDelete />
          </Link>
        </>
      ),
    });
  }

  return (
    <div>
      <h3 className="mb-3 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Enquiries;
