import React, { useEffect, useState } from 'react';
import { BsArrowDownRight, BsArrowUpRight } from 'react-icons/bs';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import { getMonthlyData, getYearlyData } from '../features/auth/authSlice';

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

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state.auth.monthlyData);
  const yearlyDataState = useSelector((state) => state.auth.yearlyData);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);

  useEffect(() => {
    dispatch(getMonthlyData());
    dispatch(getYearlyData());
  }, []);

  useEffect(() => {
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: element?._id?.month,
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: element?._id?.month,
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);
  }, [monthlyDataState]);

  const config = {
    data: dataMonthly,
    xField: 'type',
    yField: 'income',
    color: ({ type }) => {
      return '#5468ff';
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

  const config2 = {
    data: dataMonthlySales,
    xField: 'type',
    yField: 'sales',
    color: ({ type }) => {
      return '#ffd333'; //#5468ff
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
        alias: 'Sales',
      },
    },
  };
  return (
    <div>
      <h3 className="mb-4 title">Dashboard</h3>
      <div className="d-flex justify-content-between align-items-center gap-3">
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="description">Total Income</p>
            <h4 className="mb-0 sub-title">₹ {yearlyDataState[0]?.amount}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 description">Income in last year form today</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="description">Total Sales</p>
            <h4 className="mb-0 sub-title">{yearlyDataState[0]?.count}</h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 description">Sales in last year form today</p>
          </div>
        </div>
      </div>
      <div className="d-flex justify-content-between gap-3">
        <div className="mt-2 flex-grow-1 w-50">
          <h3 className="my-3 title">Income Statics</h3>
          <div>
            <Column {...config} />
          </div>
        </div>
        <div className="mt-2 flex-grow-1 w-50">
          <h3 className="my-3 title">Sales Statics</h3>
          <div>
            <Column {...config2} />
          </div>
        </div>
      </div>
      <div className="my-4">
        <h3 className="mb-4 title">Recent Orders</h3>
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
