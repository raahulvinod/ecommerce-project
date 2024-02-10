import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { AiFillDelete, AiOutlineEye } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAEnquiry,
  getEnquiries,
  updateAEnquiry,
} from '../features/enquiry/enquirySlice';
import CustomModal from '../components/CustomModal';
import { resetState } from '../features/color/colorSlice';

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
  const [open, setOpen] = useState(false);
  const [enqId, setenqId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setenqId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
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
          <select
            name=""
            defaultValue={
              enquiryState[i].status ? enquiryState[i].status : 'Submitted'
            }
            className="form-cotntrol form-select"
            id=""
            onChange={(e) =>
              setEnquiryStatus(e.target.value, enquiryState[i]._id)
            }
          >
            <option value="Submitted">Submitted</option>
            <option value="Contacted">Contacted</option>
            <option value="In Progress">In Progress</option>
            <option value="Resolved">Resolved</option>
          </select>
        </>
      ),
      actions: (
        <>
          <Link
            className="ms-3 fs-3 text-danger"
            to={`/admin/enquiries/${enquiryState[i]._id}`}
          >
            <AiOutlineEye />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(enquiryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }
  const setEnquiryStatus = (e, i) => {
    const data = { id: i, enqData: e };
    dispatch(updateAEnquiry(data));
  };

  const deleteEnquiry = (e) => {
    dispatch(deleteAEnquiry(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getEnquiries());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-3 title">Enquiries</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this enquiry?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteEnquiry(enqId)}
      />
    </div>
  );
};

export default Enquiries;
