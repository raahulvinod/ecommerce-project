import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createBlogCategory,
  getABlogCategory,
  resetState,
  updateABlogCategory,
} from '../features/bcategory/bcategorySlice';

let userSchema = Yup.object({
  title: Yup.string().required('Blog category is Required'),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBlogCatId = location.pathname.split('/')[3];

  const newBlogCategory = useSelector((state) => state.bCategory);

  const {
    isSuccess,
    isLoading,
    isError,
    createdBlogCategory,
    blogCatName,
    updatedBlogCategory,
  } = newBlogCategory;

  useEffect(() => {
    if (getBlogCatId !== undefined) {
      dispatch(getABlogCategory(getBlogCatId));
    } else {
      dispatch(resetState());
    }
  }, [getBlogCatId]);

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success('Blog Category Added Successfully!');
    }
    if (isSuccess && updatedBlogCategory) {
      toast.success('Blog Category Updated Successfully!');
      navigate('/admin/blog-category-list');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: blogCatName || '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBlogCatId !== undefined) {
        const data = { id: getBlogCatId, bCatData: values };
        dispatch(updateABlogCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createBlogCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState());
        }, 3000);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">
        {getBlogCatId !== undefined ? 'Edit' : 'Add'} Blog Category
      </h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter blog category name"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
            id="blogcat"
          />
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button type="submit" className="button rounded-3 my-4 px-3">
            {getBlogCatId !== undefined ? 'Edit' : 'Add'} Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
