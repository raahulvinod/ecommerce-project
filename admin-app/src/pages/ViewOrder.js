import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link, useLocation } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  getOrderByUser,
  getOrders,
  resetState,
} from '../features/auth/authSlice';

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
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const ViewOrders = () => {
  const location = useLocation();
  const getUserId = location.pathname.split('/')[3];
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getOrderByUser(getUserId));
  }, [getUserId]);

  const orderState = useSelector((state) => state.auth.OrderByUser);

  const data1 = [];
  for (let i = 0; i < orderState.length; i++) {
    data1.push({
      key: i + 1,
      name: orderState[i].product.slug,
      brand: orderState[i].product.brand,
      color: orderState[i].product.color,
      date: new Date(orderState[i].product.createdAt).toLocaleString(),
      count: orderState[i].count,
      actions: (
        <>
          <Link to="/admin">
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <Link className="ms-3 fs-3 text-danger" to="/admin">
            <AiFillDelete />
          </Link>
        </>
      ),
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
