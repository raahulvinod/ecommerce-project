import React, { useEffect } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import { getcolors } from '../features/color/colorSlice';

const Colorlist = () => {
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
      title: 'Actions',
      dataIndex: 'actions',
    },
  ];

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getcolors());
  }, []);

  const colorState = useSelector((state) => state.color.colors);

  const data1 = [];
  for (let i = 0; i < colorState.length; i++) {
    data1.push({
      key: i,
      name: colorState[i].title,
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
      <h3 className="mb-3 title">Colors</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Colorlist;
