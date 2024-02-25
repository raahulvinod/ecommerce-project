import React, { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';

import CustomInput from '../components/CustomInput';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getcolors } from '../features/color/colorSlice';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import {
  createProducts,
  getProduct,
  resetState,
  updateProducts,
} from '../features/product/productSlice';

let userSchema = Yup.object({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Descripton is Required'),
  price: Yup.number().required('Price is Required'),
  brand: Yup.string().required('Brand is Required'),
  category: Yup.string().required('Categroy is Required'),
  tags: Yup.string().required('Tag is Required'),
  color: Yup.array()
    .min(1, 'Pick atleast one color')
    .required('color are Required'),
  quantity: Yup.number().required('Quantity is Required'),
});

const Addproduct = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();

  const productId = location.pathname.split('/')[3];

  const [color, setColor] = useState([]);
  const [image, setImage] = useState([]);

  useEffect(() => {
    // Fetch brands, categories, and colors
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getcolors());

    // If productId is defined, fetch product details
    if (productId !== undefined) {
      dispatch(getProduct(productId));
    } else {
      dispatch(resetState());
    }

    // Cleanup function to reset color state when unmounting
    return () => {
      setColor([]);
      setImage([]);
    };
  }, [dispatch, productId]);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const newProduct = useSelector((state) => state.product);
  const productState = useSelector((state) => state.product.singleProduct);

  const { isSuccess, isLoading, isError, createdProduct, updatedProduct } =
    newProduct;
  const { title, tags, description, price, category, brand, quantity } =
    productState || {};

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Successfully!');
    }

    if (isSuccess && updatedProduct) {
      toast.success('Product updated Successfully!');
    }

    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  useEffect(() => {
    if (productState?.color) {
      const defaultColor = productState.color.map((color) => ({
        label: color.title,
        value: color._id,
      }));
      setColor(defaultColor);
    }

    if (productState?.images) {
      const defaultImages = productState.images.map((image) => ({
        public_id: image.public_id,
        url: image.url,
      }));
      setImage(defaultImages);
    }
  }, [productState]);

  const colorOpt = [];
  colorState.forEach((color) => {
    colorOpt.push({
      label: color.title,
      value: color._id,
    });
  });

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: title || '',
      description: description || '',
      price: price || '',
      brand: brand || '',
      category: category || '',
      color: color || '',
      quantity: quantity || '',
      images: image || '',
      tags: tags || '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      const colorValues = values.color.map((color) => color.value);

      const productData = {
        ...values,
        color: colorValues,
      };

      if (productId !== undefined) {
        dispatch(updateProducts({ id: productId, productData }));
      } else {
        dispatch(createProducts(values));
        formik.resetForm();
        setColor(null);
        setImage([]);
      }

      setTimeout(() => {
        dispatch(resetState());
        navigate('/admin/list-product');
      }, 3000);
    },
  });

  const handleColor = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">
        {productId !== undefined ? 'Edit Product' : 'Add Product'}
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter product name"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <div className="">
            <ReactQuill
              theme="snow"
              name="description"
              onChange={formik.handleChange('description')}
              value={formik.values.description}
            />
            <div className="error my-2">
              {formik.touched.description && formik.errors.description}
            </div>
          </div>
          <CustomInput
            type="number"
            label="Enter product price"
            name="price"
            onChng={formik.handleChange('price')}
            onBlr={formik.handleBlur('price')}
            val={formik.values.price}
          />
          <div className="error my-3">
            {formik.touched.price && formik.errors.price}
          </div>
          <select
            name="brand"
            onChange={formik.handleChange('brand')}
            onBlur={formik.handleBlur('brand')}
            value={formik.values.brand}
            id=""
            className="form-control mb-3 mt-3"
          >
            <option value="">Select Brand</option>
            {brandState.map((brand, index) => {
              return (
                <option key={index} value={brand.title}>
                  {brand.title}
                </option>
              );
            })}
          </select>
          <div className="error my-3">
            {formik.touched.brand && formik.errors.brand}
          </div>

          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            id=""
            className="form-control mb-3 mt-3"
          >
            <option value="">Select Category</option>
            {categoryState.map((category, index) => {
              return (
                <option key={index} value={category.title}>
                  {category.title}
                </option>
              );
            })}
          </select>
          <div className="error my-3">
            {formik.touched.category && formik.errors.category}
          </div>

          <select
            name="tags"
            onChange={formik.handleChange('tags')}
            onBlur={formik.handleBlur('tags')}
            value={formik.values.tags}
            id=""
            className="form-control mb-3 mt-3"
          >
            <option value="" disabled>
              Select tags
            </option>
            <option value="featured">Featured</option>
            <option value="popular">Popular</option>
            <option value="special">Special</option>
          </select>
          <div className="error my-3">
            {formik.touched.tags && formik.errors.tags}
          </div>

          <Select
            mode="multiple"
            allowClear
            className="w-100"
            placeholder="select colors"
            value={color}
            onChange={(color) => handleColor(color)}
            options={colorOpt}
          />
          <div className="error my-3">
            {formik.touched.color && formik.errors.color}
          </div>

          <CustomInput
            name="quantity"
            onChng={formik.handleChange('quantity')}
            onBlr={formik.handleBlur('quantity')}
            val={formik.values.quantity}
            type="number"
            label="Enter Product Quantity"
          />
          <div className="error my-3">
            {formik.touched.quantity && formik.errors.quantity}
          </div>
          <div className="bg-white border-1 p-5 text-center my-3">
            <Dropzone
              onDrop={(acceptedFiles) => {
                dispatch(uploadImg(acceptedFiles)).then(({ payload }) => {
                  const newImages = payload.map((file) => ({
                    public_id: file.public_id,
                    url: file.url,
                  }));
                  setImage((prevImages) => [...prevImages, ...newImages]);
                });
              }}
            >
              {({ getRootProps, getInputProps }) => (
                <section style={{ cursor: 'pointer' }}>
                  <div {...getRootProps()}>
                    <input {...getInputProps()} />
                    <p>
                      Drag 'n' drop some files here, or click to select files
                    </p>
                  </div>
                </section>
              )}
            </Dropzone>
          </div>
          <div className="showimages d-flex flex-wrap gap-3">
            {image?.map((prodImage, index) => {
              return (
                <div key={index} className="position-relative">
                  <button
                    type="button"
                    onClick={() => {
                      dispatch(delImg(prodImage.public_id)).then(() => {
                        const updatedImage = image?.filter(
                          (img) => img.public_id !== prodImage.public_id
                        );
                        setImage(updatedImage);
                      });
                    }}
                    className="btn-close position-absolute"
                    style={{ top: '5px', right: '5px' }}
                  ></button>
                  <img src={prodImage.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button type="submit" className="button w-100 my-4 px-3">
            {productId !== undefined ? 'Edit Product' : 'Add Product'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
