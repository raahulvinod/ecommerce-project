import React, { useEffect, useRef, useState } from 'react';
import CustomInput from '../components/CustomInput';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import Dropzone from 'react-dropzone';
import { delImg, uploadImg } from '../features/upload/uploadSlice';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import {
  createBlogs,
  getABlog,
  resetState,
  updateABlog,
} from '../features/blogs/blogSlice';
import { getBlogCategories } from '../features/bcategory/bcategorySlice';

let userSchema = Yup.object({
  title: Yup.string().required('Title is Required'),
  description: Yup.string().required('Descripton is Required'),
  category: Yup.string().required('Categroy is Required'),
});

const Addblog = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogId = location.pathname.split('/')[3];

  const imgState = useSelector((state) => state.upload.images);
  const bCatState = useSelector((state) => state.bCategory.bCategories);
  const blogState = useSelector((state) => state.blog);

  const {
    isSuccess,
    isLoading,
    isError,
    createdBlog,
    blogName,
    blogDescription,
    blogCategory,
    blogImages,
    updatedBlog,
  } = blogState;

  const img = useRef([]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      dispatch(getABlog(getBlogId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogId]);

  useEffect(() => {
    dispatch(resetState());
    dispatch(getBlogCategories());
  }, []);

  useEffect(() => {
    if (isSuccess && createdBlog) {
      toast.success('Blog Added Successfully!');
    }
    if (isSuccess && updatedBlog) {
      toast.success('Blog Updated Successfully!');
      navigate('/admin/blog-list');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  useEffect(() => {
    if (getBlogId !== undefined) {
      if (blogImages?.length > 0) {
        const updatedImg = [...img.current];
        updatedImg.push(
          ...blogImages.map((image) => ({
            public_id: image.public_id,
            url: image.url,
          }))
        );
        img.current = updatedImg;
      }
    } else {
      if (imgState.length > 0) {
        const updatedImg = [...img.current];
        updatedImg.push(
          ...imgState.map((image) => ({
            public_id: image.public_id,
            url: image.url,
          }))
        );
        img.current = updatedImg;
      }
    }
  }, [blogImages, getBlogId, imgState]);

  useEffect(() => {
    formik.values.images = img.current;
  }, [imgState, img.current, blogImages]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogName || '',
      description: blogDescription || '',
      category: blogCategory || '',
      images: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogId !== undefined) {
        values.images = img.current;
        const data = { id: getBlogId, blogData: values };
        dispatch(updateABlog(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogs(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-4 title">
        {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
      </h3>

      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <div className="mt-4">
            <CustomInput
              type="text"
              label="Enter blog name"
              name="title"
              onChng={formik.handleChange('title')}
              onBlr={formik.handleBlur('title')}
              val={formik.values.title}
            />
            <div className="error my-3">
              {formik.touched.title && formik.errors.title}
            </div>
          </div>
          <select
            name="category"
            onChange={formik.handleChange('category')}
            onBlur={formik.handleBlur('category')}
            value={formik.values.category}
            id=""
            className="form-control mb-3 mt-3"
          >
            <option value="">Select blog category</option>
            {bCatState.map((category, index) => {
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
          <div>
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
          <div className="bg-white border-1 p-5 text-center my-3">
            <Dropzone
              onDrop={(acceptedFiles) => dispatch(uploadImg(acceptedFiles))}
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
            {img.current.map((image, index) => {
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
          <button type="submit" className="button w-100 rounded-3 my-4 px-3">
            {getBlogId !== undefined ? 'Edit' : 'Add'} Blog
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblog;
