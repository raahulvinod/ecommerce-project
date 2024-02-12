import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { loginUser } from '../features/user/userSlice';
import Container from '../components/Container';
import CustomInput from '../components/CustomInput';

const loginSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
  password: yup.string().required('Password is required'),
});

const Login = () => {
  const authState = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: loginSchema,
    onSubmit: (values) => {
      dispatch(loginUser(values));
    },
  });

  useEffect(() => {
    if (authState.user !== null && authState.isError === false) {
      navigate('/');
      window.location.reload();
    }
  }, [authState]);

  return (
    <>
      <Meta title="Login" />
      <BreadCrumb title="Login" />
      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row justify-content-center">
          <div className="col-md-6">
            <div className="auth-card">
              <h3 className="text-center mb-3">Login</h3>
              <form onSubmit={formik.handleSubmit} className="gap-15">
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                  classname="mb-3"
                />
                <div className="error">
                  {formik.touched.email && formik.errors.email}
                </div>
                <CustomInput
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formik.values.password}
                  onChange={formik.handleChange('password')}
                  onBlur={formik.handleBlur('password')}
                  classname="mb-3"
                />
                <div className="error">
                  {formik.touched.password && formik.errors.password}
                </div>
                <div className="d-flex justify-content-between align-items-center">
                  <Link to="/forgot-password">Forgot Password?</Link>
                  <button className="button border-0" type="submit">
                    Login
                  </button>
                </div>
                <div className="mt-3 text-center">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-primary">
                    Sign Up
                  </Link>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Login;
