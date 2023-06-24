import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createBrand, resetState } from '../features/brand/brandSlice';

let userSchema = Yup.object({
  title: Yup.string().required('Brand name is Required'),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newBrand = useSelector((state) => state.brand);

  const { isSuccess, isLoading, isError, createdBrand } = newBrand;

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully!');
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
      dispatch(createBrand(values));
      formik.resetForm();

      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">Add Brand</h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter brand name"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
            id="brand"
          />
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="button border-0  my-3 px-3">Add brand</button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
