import React, { useEffect } from 'react';
import { Table } from 'antd';
import { getProducts } from '../features/product/productSlice';
import { Link } from 'react-router-dom';
import { FaRegEdit } from 'react-icons/fa';
import { AiFillDelete } from 'react-icons/ai';
import { useDispatch, useSelector } from 'react-redux';

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
  const dispatch = useDispatch();
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
      <h3 className="mb-3 title">Products</h3>
      <div>
        <Table columns={columns} dataSource={data1} />
      </div>
    </div>
  );
};

export default Productlist;
