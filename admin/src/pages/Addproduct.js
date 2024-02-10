import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import { toast } from 'react-toastify';
import { Select } from 'antd';
import { useFormik } from 'formik';
import Dropzone from 'react-dropzone';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getBrands } from '../features/brand/brandSlice';
import { getCategories } from '../features/pcategory/pcategorySlice';
import { getcolors } from '../features/color/colorSlice';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { createProducts, resetState } from '../features/product/productSlice';

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
  const [color, setColor] = useState([]);
  const [images, setImages] = useState([]);

  useEffect(() => {
    dispatch(getBrands());
    dispatch(getCategories());
    dispatch(getcolors());
  }, []);

  const brandState = useSelector((state) => state.brand.brands);
  const categoryState = useSelector((state) => state.pCategory.pCategories);
  const colorState = useSelector((state) => state.color.colors);
  const imgState = useSelector((state) => state.upload.images);
  const newProduct = useSelector((state) => state.product);

  const { isSuccess, isLoading, isError, createdProduct } = newProduct;

  useEffect(() => {
    if (isSuccess && createdProduct) {
      toast.success('Product Added Successfully!');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  const colorOpt = [];
  colorState.forEach((color) => {
    colorOpt.push({
      label: color.title,
      value: color._id,
    });
  });

  const img = [];
  imgState.forEach((image) => {
    img.push({
      public_id: image.public_id,
      url: image.url,
    });
  });

  useEffect(() => {
    formik.values.color = color ? color : '';
    formik.values.images = img;
  }, [color, img]);

  const formik = useFormik({
    initialValues: {
      title: '',
      description: '',
      price: '',
      brand: '',
      category: '',
      color: '',
      quantity: '',
      images: '',
      tags: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createProducts(values));
      formik.resetForm();
      setColor(null);
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  const handleColor = (e) => {
    setColor(e);
  };

  return (
    <div>
      <h3 className="mb-4 title">Add Product</h3>
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
            defaultValue={color}
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
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
            >
              {({ getRootProps, getInputProps }) => (
                <section>
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
            {imgState?.map((image, index) => {
              return (
                <div key={index} className="position-relative">
                  <button
                    type="button"
                    onClick={() => dispatch(delImg(image.public_id))}
                    className="btn-close position-absolute"
                    style={{ top: '5px', right: '5px' }}
                  ></button>
                  <img src={image.url} alt="" width={200} height={200} />
                </div>
              );
            })}
          </div>
          <button type="submit" className="button w-100 my-4 px-3">
            Add Product
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addproduct;
