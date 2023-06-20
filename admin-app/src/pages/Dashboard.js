import React from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';

const Dashboard = () => {
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
      title: 'Product',
      dataIndex: 'product',
    },
    {
      title: 'Status',
      dataIndex: 'status',
    },
  ];
  const data1 = [];
  for (let i = 0; i < 46; i++) {
    data1.push({
      key: i,
      name: `Edward King ${i}`,
      product: 'Apple Iphone 13 Pro',
      status: 'Pending',
    });
  }
  const data = [
    {
      type: 'Jan',
      sales: 38,
    },
    {
      type: 'Feb',
      sales: 52,
    },
    {
      type: 'March',
      sales: 61,
    },
    {
      type: 'April',
      sales: 145,
    },
    {
      type: 'May',
      sales: 48,
    },
    {
      type: 'June',
      sales: 38,
    },
    {
      type: 'Jul',
      sales: 55,
    },
    {
      type: 'Aug',
      sales: 38,
    },
    {
      type: 'Sep',
      sales: 66,
    },
    {
      type: 'Oct',
      sales: 22,
    },
    {
      type: 'Nov',
      sales: 38,
    },
    {
      type: 'Dec',
      sales: 44,
    },
  ];
  const config = {
    data,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333';
    },

    label: {
      position: 'middle',
      // 'top', 'bottom', 'middle',
      style: {
        fill: '#FFFFFF',
        opacity: 1,
      },
    },
    xAxis: {
      label: {
        autoHide: true,
        autoRotate: false,
      },
    },
    meta: {
      type: {
        alias: 'Month',
      },
      sales: {
        alias: 'Income',
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total</p>
            <h4 className="mb-0">₹2000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to June 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total</p>
            <h4 className="mb-0">₹2000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="green">
              <BsArrowUpRight /> 62%
            </h6>
            <p className="mb-0">Compared to June 2022</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p>Total</p>
            <h4 className="mb-0">₹2000</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <h6 className="red">
              <BsArrowDownRight /> 32%
            </h6>
            <p className="mb-0">Compared to June 2022</p>
          </div>
        </div>
      </div>
      <div className="mt-4">
        <h3 className="my-4">Income Statics</h3>
        <div>
          <Column {...config} />
        </div>
      </div>
      <div className="my-4">
        <h3 className="mb-4">Recent Orders</h3>
        <div>
          <Table columns={columns} dataSource={data1} />
        </div>
      </div>
      <div className="my-4">
        <h3 className="mb-4">Recent Reviews</h3>
      </div>
    </div>
  );
};

export default Dashboard;
