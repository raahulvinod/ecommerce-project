import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { AiFillDelete } from 'react-icons/ai';
import { FaRegEdit } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { deleteACoupon, getCoupons } from '../features/coupon/couponSlice';
import CustomModal from '../components/CustomModal';
import { resetState } from '../features/brand/brandSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Name',
    dataIndex: 'name',
    sorter: (a, b) => a.name.length - b.name.length,
  },

  {
    title: 'Discount',
    dataIndex: 'discount',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Expiry',
    dataIndex: 'expiry',
    sorter: (a, b) => a.discount - b.discount,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const Couponlist = () => {
  const [open, setOpen] = useState(false);
  const [couponId, setcouponId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setcouponId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCoupons());
  }, []);

  const couponState = useSelector((state) => state.coupon.coupons);

  const data1 = [];
  for (let i = 0; i < couponState.length; i++) {
    data1.push({
      key: i + 1,
      name: couponState[i].name,
      expiry: new Date(couponState[i].expiry).toLocaleString(),
      discount: couponState[i].discount,
      actions: (
        <>
          <Link to={`/admin/coupon/${couponState[i]._id}`}>
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(couponState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteCoupon = (e) => {
    dispatch(deleteACoupon(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCoupons());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-3 title">Coupons</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this coupon?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteCoupon(couponId)}
      />
    </div>
  );
};

export default Couponlist;
