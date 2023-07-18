import React, { useEffect, useState } from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { updateProfile } from '../features/user/userSlice';
import { FaRegEdit } from 'react-icons/fa';

const profileSchema = yup.object({
  firstname: yup.string().required('First name is required'),
  lastname: yup.string().required('Last name is required'),
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  mobile: yup.number().required('Mobile number is required'),
});

const Profile = () => {
  const dispatch = useDispatch();
  const userState = useSelector((state) => state.auth?.user);
  const [edit, setEdit] = useState(true);

  const getTokenFromLocalStorage = localStorage.getItem('customer')
    ? JSON.parse(localStorage.getItem('customer'))
    : null;

  const config2 = {
    headers: {
      Authorization: `Bearer ${
        getTokenFromLocalStorage !== null ? getTokenFromLocalStorage.token : ''
      }`,
      Accept: 'application/json',
    },
  };

  const formik = useFormik({
    enableReinitialize: true,
    initialValues: {
      firstname: userState?.fistname,
      lastname: userState?.lastname,
      email: userState?.email,
      mobile: userState?.mobile,
    },
    validationSchema: profileSchema,
    onSubmit: (values) => {
      dispatch(updateProfile({ data: values, config2: config2 }));
      setEdit(true);
    },
  });

  return (
    <>
      <BreadCrumb title="My Profile" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12"></div>
        </div>
        <div className="col-xl-8 m-auto">
          <div className="card mb-4">
            <div className="card-header d-flex justify-content-between">
              Profile Details
              <div>
                <FaRegEdit onClick={() => setEdit(false)} className="fs-5" />
              </div>
            </div>

            <div className="card-body">
              <form onSubmit={formik.handleSubmit}>
                <div className="row gx-3 mb-3">
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputFirstName">
                      First Name
                    </label>
                    <input
                      className="form-control"
                      id="inputFirstName"
                      type="text"
                      name="firstname"
                      value={formik.values.firstname}
                      onChange={formik.handleChange('firstname')}
                      onBlur={formik.handleBlur('firstname')}
                      disabled={edit}
                    />
                    <div className="error">
                      {formik.touched.firstname && formik.errors.firstname}
                    </div>
                  </div>
                  <div className="col-md-6">
                    <label className="small mb-1" htmlFor="inputLastName">
                      Last Name
                    </label>
                    <input
                      className="form-control"
                      id="inputLastName"
                      type="text"
                      name="lastname"
                      value={formik.values.lastname}
                      onChange={formik.handleChange('lastname')}
                      onBlur={formik.handleBlur('lastname')}
                      disabled={edit}
                    />
                    <div className="error">
                      {formik.touched.lastname && formik.errors.lastname}
                    </div>
                  </div>
                </div>

                <div className="mb-3">
                  <label className="small mb-1" htmlFor="inputEmailAddress">
                    Email address
                  </label>
                  <input
                    className="form-control"
                    id="inputEmailAddress"
                    type="email"
                    name="email"
                    value={formik.values.email}
                    onChange={formik.handleChange('email')}
                    onBlur={formik.handleBlur('email')}
                    disabled={edit}
                  />
                  <div className="error">
                    {formik.touched.email && formik.errors.email}
                  </div>
                </div>
                <div className="row gx-3 mb-3">
                  <div className="">
                    <label className="small mb-1" htmlFor="inputPhone">
                      Phone number
                    </label>
                    <input
                      className="form-control"
                      id="inputPhone"
                      type="tel"
                      name="mobile"
                      value={formik.values.mobile}
                      onChange={formik.handleChange('mobile')}
                      onBlur={formik.handleBlur('mobile')}
                      disabled={edit}
                    />
                    <div className="error">
                      {formik.touched.mobile && formik.errors.mobile}
                    </div>
                  </div>
                </div>

                {edit === false && (
                  <button
                    className="button border-0"
                    type="submit"
                    // onClick={() => setEdit(true)}
                  >
                    Save changes
                  </button>
                )}
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Profile;
