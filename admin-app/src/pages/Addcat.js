import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import * as Yup from 'yup';
import { useFormik } from 'formik';
import {
  createCategory,
  getAProductCategory,
  resetState,
  updateAProductCategory,
} from '../features/pcategory/pcategorySlice';

let userSchema = Yup.object({
  title: Yup.string().required('Category name is Required'),
});

const Addcat = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const location = useLocation();
  const getPcatId = location.pathname.split('/')[3];

  const newCategory = useSelector((state) => state.pCategory);

  const {
    isSuccess,
    isLoading,
    isError,
    createdCategory,
    updatedProductCategory,
    categoryName,
  } = newCategory;

  useEffect(() => {
    if (getPcatId !== undefined) {
      dispatch(getAProductCategory(getPcatId));
    } else {
      dispatch(resetState());
    }
  }, [getPcatId]);

  useEffect(() => {
    if (isSuccess && createdCategory) {
      toast.success('Category Added Successfully!');
    }
    if (isSuccess && updatedProductCategory) {
      toast.success('Category Updated Successfully!');
      navigate('/admin/list-category');
    }

    if (isError) {
      toast.error('something Went Wrong!');
    }
  }, [isSuccess, isLoading, isError]);

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      title: categoryName || '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      if (getPcatId !== undefined) {
        const data = { id: getPcatId, pCatData: values };
        dispatch(updateAProductCategory(data));
        dispatch(resetState());
      } else {
        dispatch(createCategory(values));
        formik.resetForm();

        setTimeout(() => {
          dispatch(resetState);
        }, 300);
      }
    },
  });

  return (
    <div>
      <h3 className="mb-3 title">
        {getPcatId !== undefined ? 'Edit' : 'Add'} Category
      </h3>
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
          <button type="submit" className="button my-3 px-3">
            {getPcatId !== undefined ? 'Edit' : 'Add'} Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
