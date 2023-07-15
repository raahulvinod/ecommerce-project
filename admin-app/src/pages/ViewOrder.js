import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getOrder } from '../features/auth/authSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Product Name',
    dataIndex: 'name',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
  },
  {
    title: 'Count',
    dataIndex: 'count',
  },
  {
    title: 'color',
    dataIndex: 'color',
  },
  {
    title: 'Date',
    dataIndex: 'date',
  },
  {
    title: 'Amount',
    dataIndex: 'amount',
  },
];

const ViewOrders = () => {
  const location = useLocation();
  const orderid = location.pathname.split('/')[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrder(orderid));
  }, [orderid]);

  const orderState = useSelector((state) => state?.auth?.singleOrder?.orders);
  console.log(orderState);

  const data1 = [];
  for (let i = 0; i < orderState?.orderItems?.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState?.orderItems[0]?.product?.slug,
      brand: orderState?.orderItems[0]?.product?.brand,
      color: orderState?.orderItems[0]?.color?.title,
      date: new Date(orderState?.createdAt).toLocaleString(),
      count: orderState?.orderItems[i]?.quantity,
      amount: orderState?.orderItems[0]?.price,
    });
  }
  return (
    <div>
      <h3 className="mb-3 title">View User Order</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default ViewOrders;
