import React, { useEffect, useState } from 'react';
import { Table } from 'antd';
import { deleteProducts, getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

import CustomModal from '../components/CustomModal';

const columns = [
  {
    title: 'SNo',
    dataIndex: 'key',
  },
  {
    title: 'Brand',
    dataIndex: 'brand',
    sorter: (a, b) => a.brand.length - b.brand.length,
  },
  {
    title: 'Category',
    dataIndex: 'category',
    sorter: (a, b) => a.category.length - b.category.length,
  },
  {
    title: 'Title',
    dataIndex: 'title',
    sorter: (a, b) => a.title.length - b.title.length,
  },

  {
    title: 'Price',
    dataIndex: 'price',
    sorter: (a, b) => a.title.length - b.title.length,
  },
  {
    title: 'Actions',
    dataIndex: 'actions',
  },
];

const Productlist = () => {
  const [open, setOpen] = useState(false);
  const [productId, setProductId] = useState('');

  const dispatch = useDispatch();

  const showModal = (e) => {
    setOpen(true);
    setProductId(e);
  };

  const hideModal = () => {
    setOpen(false);
  };

  useEffect(() => {
    dispatch(getProducts());
  }, []);

  const productState = useSelector((state) => state.product.products);

  const data1 = [];
  for (let i = 0; i < productState.length; i++) {
    data1.push({
      key: i + 1,
      brand: productState[i].brand,
      category: productState[i].category,
      title: productState[i].title,
      price: `₹ ${productState[i].price}`,
      actions: (
        <>
          <Link to={`/admin/product/${productState[i]._id}`}>
            <FaRegEdit className="fs-3 text-danger" />
          </Link>
          <button
            className="ms-3 fs-3 text-danger border-0 bg-transparent"
            onClick={() => showModal(productState[i]._id)}
          >
            <AiFillDelete />
          </button>
        </>
      ),
    });
  }

  const deleteProduct = (e) => {
    dispatch(deleteProducts(e));
    setOpen(false);
    setTimeout(() => {
      dispatch(getProducts());
    }, 100);
  };

  return (
    <div>
      <h3 className="mb-3 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
      <CustomModal
        title="Are you sure want to delete this product?"
        hideModal={hideModal}
        open={open}
        performAction={() => deleteProduct(productId)}
      />
    </div>
  );
};

export default Productlist;
