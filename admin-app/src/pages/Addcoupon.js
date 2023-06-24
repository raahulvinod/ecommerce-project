import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createCoupons, resetState } from '../features/coupon/couponSlice';

let userSchema = Yup.object({
  name: Yup.string().required('Coupon name is required'),
  expiry: Yup.date().required('Expiry date is required'),
  discount: Yup.number().required('Discount percent is required'),
});

const AddCoupon = () => {
  const dispatch = useDispatch();

  const newCoupon = useSelector((state) => state.coupon);

  const { isSuccess, isLoading, isError, createdCoupon } = newCoupon;

  useEffect(() => {
    if (isSuccess && createdCoupon) {
      toast.success('Coupon Added Successfully!');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    initialValues: {
      name: '',
      expiry: '',
      discount: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createCoupons(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">Add Coupon</h3>
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
            Add coupon
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddCoupon;
