import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteABlogCategory,
  getBlogCategories,
  resetState,
} from '../features/bcategory/bcategorySlice';
import CustomModal from '../components/CustomModal';

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
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const Blogcatlist = () => {
  const [open, setOpen] = useState(false);
  const [blogCatId, setblogCatId] = useState('');
  const showModal = (e) => {
    setOpen(true);
    setblogCatId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  const bCatState = useSelector((state) => state.bCategory.bCategories);

  const data1 = [];
  for (let i = 0; i < bCatState.length; i++) {
    data1.push({
      key: i,
      name: bCatState[i].title,
      actions: (
        <>
          <Link to={`/admin/blog-category-list/${bCatState[i]._id}`}>
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <button
            type="submit"
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(bCatState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteBlogCategory = (e) => {
    dispatch(deleteABlogCategory(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getBlogCategories());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-3 title">Blog Categories</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this blog category?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteBlogCategory(blogCatId)}
      />
    </div>
  );
};

export default Blogcatlist;
