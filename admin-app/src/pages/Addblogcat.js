import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createBlogCategory,
  resetState,
} from '../features/bcategory/bcategorySlice';

let userSchema = Yup.object({
  title: Yup.string().required('Blog category is Required'),
});

const Addblogcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBlogCategory = useSelector((state) => state.bCategory);

  const { isSuccess, isLoading, isError, createdBlogCategory } =
    newBlogCategory;

  useEffect(() => {
    if (isSuccess && createdBlogCategory) {
      toast.success('Blog Category Added Successfully!');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createBlogCategory(values));
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">Add Blog Category</h3>
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
          <button className="button rounded-3 my-4 px-3">
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
