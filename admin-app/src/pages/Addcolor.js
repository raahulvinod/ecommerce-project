import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createColor,
  getAColor,
  resetState,
  updateAColor,
} from '../features/color/colorSlice';

let userSchema = Yup.object({
  title: Yup.string().required('Color is Required'),
});

const Addcolor = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const getColorId = location.pathname.split('/')[3];

  const newColor = useSelector((state) => state.color);

  const {
    isSuccess,
    isLoading,
    isError,
    createdColor,
    updatedColor,
    colorName,
  } = newColor;

  useEffect(() => {
    if (getColorId !== undefined) {
      dispatch(getAColor(getColorId));
    } else {
      dispatch(resetState());
    }
  }, [getColorId]);

  useEffect(() => {
    if (isSuccess && createdColor) {
      toast.success('Color Added Successfully!');
    }
    if (isSuccess && updatedColor) {
      toast.success('Color Updated Successfully!');
      navigate('/admin/list-color');
    }
    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError, createdColor]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: colorName || '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getColorId !== undefined) {
        const data = { id: getColorId, colorData: values };
        dispatch(updateAColor(data));
        dispatch(resetState());
      } else {
        dispatch(createColor(values));
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
        {getColorId !== undefined ? 'Edit' : 'Add'} Color
      </h3>
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
          <button type="submit" className="button my-4 px-3">
            {getColorId !== undefined ? 'Edit' : 'Add'} Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
