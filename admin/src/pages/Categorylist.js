import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteAProductCategory,
  getCategories,
} from '../features/pcategory/pcategorySlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import CustomModal from '../components/CustomModal';
import { resetState } from '../features/brand/brandSlice';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Categories',
    dataIndex: 'categories',
    sorter: (a, b) => a.categories.length - b.categories.length,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const Categorylist = () => {
  const [open, setOpen] = useState(false);
  const [pCatId, setpCatId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setpCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getCategories());
  }, []);

  const categoryState = useSelector((state) => state.pCategory.pCategories);

  const data1 = [];
  for (let i = 0; i < categoryState.length; i++) {
    data1.push({
      key: i + 1,
      categories: categoryState[i].title,
      actions: (
        <>
          <Link to={`/admin/category/${categoryState[i]._id}`}>
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(categoryState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProductCategory = (e) => {
    dispatch(deleteAProductCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-3 title">Product Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this product category?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProductCategory(pCatId)}
      />
    </div>
  );
};

export default Categorylist;
