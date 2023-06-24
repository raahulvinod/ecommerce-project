import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import { createColor, resetState } from '../features/color/colorSlice';

let userSchema = Yup.object({
  title: Yup.string().required('Color is Required'),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newColor = useSelector((state) => state.color);

  const { isSuccess, isLoading, isError, createdColor } = newColor;

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color Added Successfully!');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError, createdColor]);

  const formik = useFormik({
    initialValues: {
      title: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(createColor(values));
      formik.resetForm();
      setTimeout(() => {
        dispatch(resetState());
      }, 3000);
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">Add Color</h3>
      <div className="w-25">
        <form onSubmit={formik.handleSubmit}>
          <CustomInput
            type="color"
            label="Enter color"
            name="title"
            onChng={formik.handleChange('title')}
            onBlr={formik.handleBlur('title')}
            val={formik.values.title}
          />
          <div className="error my-3">
            {formik.touched.title && formik.errors.title}
          </div>
          <button className="button my-4 px-3">Add Color</button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
