import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createCategory } from '../features/pcategory/pcategorySlice';

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newCategory = useSelector((state) => state.pCategory);

  const { isSuccess, isLoading, isError, createdCategory } = newCategory;

  let userSchema = Yup.object({
    title: Yup.string().required('Category name is Required'),
  });

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category Added Successfully!');
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
      dispatch(createCategory(values));
      formik.resetForm();

      setTimeout(() => {
        navigate('/admin/list-category');
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">Add Category</h3>
      <div>
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter product category"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="button my-3 px-3">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
