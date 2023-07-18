import React, { useEffect, useState } from 'react';
import { Column } from '@ant-design/plots';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
} from '../features/auth/authSlice';

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
    title: 'Product Count',
    dataIndex: 'count',
  },
  {
    title: 'Total Price',
    dataIndex: 'price',
  },
  {
    title: 'Total Price After Discount',
    dataIndex: 'dprice',
  },
  {
    title: 'Status',
    dataIndex: 'status',
  },
];

const Dashboard = () => {
  const dispatch = useDispatch();
  const monthlyDataState = useSelector((state) => state?.auth?.monthlyData);
  const yearlyDataState = useSelector((state) => state?.auth?.yearlyData);
  const orderState = useSelector((state) => state?.auth?.orders?.orders);
  const [dataMonthly, setDataMonthly] = useState([]);
  const [dataMonthlySales, setDataMonthlySales] = useState([]);
  const [orderData, setOrderData] = useState([]);

  const getTokenFromLocalStorage = localStorage.getItem('user')
    ? JSON.parse(localStorage.getItem('user'))
    : null;

  const config3 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
      }`,
      Accept: 'application/json',
    },
  };

  useEffect(() => {
    dispatch(getMonthlyData(config3));
    dispatch(getYearlyData(config3));
    dispatch(getOrders(config3));
  }, []);

  useEffect(() => {
    let monthNames = [
      'January',
      'February',
      'March',
      'April',
      'May',
      'June',
      'July',
      'August',
      'September',
      'October',
      'November',
      'December',
    ];
    let data = [];
    let monthlyOrderCount = [];
    for (let index = 0; index < monthlyDataState?.length; index++) {
      const element = monthlyDataState[index];
      data.push({
        type: monthNames[element?._id?.month],
        income: element?.amount,
      });
      monthlyOrderCount.push({
        type: monthNames[element?._id?.month],
        sales: element?.count,
      });
    }
    setDataMonthly(data);
    setDataMonthlySales(monthlyOrderCount);

    const data1 = [];
    for (let i = 0; i < orderState?.length; i++) {
      data1.push({
        key: i,
        name:
          orderState[i]?.user?.firstname + ' ' + orderState[i]?.user?.lastname,
        count: orderState[i]?.orderItems?.length,
        price: orderState[i]?.totalPrice,
        dprice: orderState[i]?.totalPriceAfterDiscount,
        status: orderState[i]?.orderStatus,
      });

      setOrderData(data1);
    }
  }, [monthlyDataState, orderState, yearlyDataState]);

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
            <h4 className="mb-0 sub-title">
              ₹ {yearlyDataState && yearlyDataState[0]?.amount}
            </h4>
          </div>
          <div className="d-flex flex-column align-items-end">
            <p className="mb-0 description">Income in last year form today</p>
          </div>
        </div>
        <div className="d-flex justify-content-between align-items-end flex-grow-1 bg-white p-3 rounded-3">
          <div>
            <p className="description">Total Sales</p>
            <h4 className="mb-0 sub-title">
              {yearlyDataState && yearlyDataState[0]?.count}
            </h4>
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
          <Table columns={columns} dataSource={orderData} />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
