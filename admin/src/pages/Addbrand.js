import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createBrand,
  getABrand,
  resetState,
  updateABrand,
} from '../features/brand/brandSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let userSchema = Yup.object({
  title: Yup.string().required('Brand name is Required'),
});

const Addbrand = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getBrandId = location.pathname.split('/')[3];

  const newBrand = useSelector((state) => state.brand);
  const {
    isSuccess,
    isLoading,
    isError,
    createdBrand,
    brandName,
    updatedBrand,
  } = newBrand;

  useEffect(() => {
    if (getBrandId !== undefined) {
      dispatch(getABrand(getBrandId));
    } else {
      dispatch(resetState());
    }
  }, [getBrandId]);

  useEffect(() => {
    if (isSuccess && createdBrand) {
      toast.success('Brand Added Successfully!');
    }
    if (isSuccess && updatedBrand) {
      toast.success('Brand Updated Successfully!');
      navigate('/admin/list-brand');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: brandName || '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getBrandId !== undefined) {
        const data = { id: getBrandId, brandData: values };
        dispatch(updateABrand(data));
        dispatch(resetState());
      } else {
        dispatch(createBrand(values));
        formik.resetForm();
        setTimeout(() => {
          dispatch(resetState());
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">
        {getBrandId !== undefined ? 'Edit' : 'Add'} Brand
      </h3>
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
          <button type="submit" className="button border-0  my-3 px-3">
            {getBrandId !== undefined ? 'Edit' : 'Add'} brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
