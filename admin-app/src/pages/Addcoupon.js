import React, { useEffect, useState } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createCoupons,
  getACoupon,
  resetState,
  updateACoupon,
} from '../features/coupon/couponSlice';
import { useLocation, useNavigate } from 'react-router-dom';

let userSchema = Yup.object({
  name: Yup.string().required('Coupon name is required'),
  expiry: Yup.date().required('Expiry date is required'),
  discount: Yup.number().required('Discount percent is required'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getCouponId = location.pathname.split('/')[3];
  const newCoupon = useSelector((state) => state.coupon);

  const {
    isSuccess,
    isLoading,
    isError,
    createdCoupon,
    couponName,
    couponDiscount,
    couponExpiry,
    updatedCoupon,
  } = newCoupon;

  const changeDateFormat = (date) => {
    const newDate = new Date(date).toLocaleDateString();
    const [month, day, year] = newDate.split('/');
    return [year, month, day].join('-');
  };

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfully!');
    }

    if (isSuccess && updatedCoupon) {
      toast.success('Coupon Updated Successfully!');
      navigate('/admin/coupon-list');
    }

    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  useEffect(() => {
    if (getCouponId !== undefined) {
      dispatch(getACoupon(getCouponId));
    } else {
      dispatch(resetState());
    }
  }, [getCouponId]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      name: couponName || '',
      expiry: changeDateFormat(couponExpiry) || '',
      discount: couponDiscount || '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getCouponId !== undefined) {
        const data = { id: getCouponId, couponData: values };
        dispatch(updateACoupon(data));
        dispatch(resetState());
      } else {
        dispatch(createCoupons(values));
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
        {getCouponId !== undefined ? 'Edit' : 'Add'} Coupon
      </h3>
      <div>
        <form action="" onSubmit={formik.handleSubmit}>
          <CustomInput
            type="text"
            label="Enter coupon name"
            name="name"
            onChng={formik.handleChange('name')}
            onBlr={formik.handleBlur('name')}
            val={formik.values.name}
            id="name"
          />
          <div className="error my-3">
            {formik.touched.name && formik.errors.name}
          </div>

          <CustomInput
            type="date"
            label="Enter coupon name"
            name="expiry"
            onChng={formik.handleChange('expiry')}
            onBlr={formik.handleBlur('expiry')}
            val={formik.values.expiry}
            id="date"
          />
          <div className="error my-3">
            {formik.touched.expiry && formik.errors.expiry}
          </div>

          <CustomInput
            type="number"
            label="Enter coupon discount"
            name="discount"
            onChng={formik.handleChange('discount')}
            onBlr={formik.handleBlur('discount')}
            val={formik.values.discount}
            id="discount"
          />
          <div className="error my-3">
            {formik.touched.discount && formik.errors.discount}
          </div>
          <button type="submit" className="button border-0  my-3 px-3">
            {getCouponId !== undefined ? 'Edit' : 'Add'} coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
