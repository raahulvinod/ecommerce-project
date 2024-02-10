import React, { useEffect } from 'react';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import {
  getMonthlyData,
  getOrders,
  getYearlyData,
  login,
} from '../features/auth/authSlice';

let userSchema = Yup.object({
  email: Yup.string()
    .email('Invalid email address')
    .required('Email is Required'),
  password: Yup.string().required('Password is Required'),
});

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
    },
    validationSchema: userSchema,
    onSubmit: (values) => {
      dispatch(login(values));
    },
  });

  const authState = useSelector((state) => state);

  const { user, isLoading, isError, isSuccess, message } = authState.auth;

  useEffect(() => {
    if (isSuccess) {
      navigate('admin');
    } else {
      navigate('');
    }
  }, [user, isLoading, isError, isSuccess, message]);
  return (
    <>
      <section className="formcard-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <div className="icon d-flex align-items-center justify-content-center">
                  <span className="fa fa-user-o"></span>
                </div>
                <h4 className="text-center mb-4 title">Admin Login</h4>
                <div className="error text-center">
                  {message.message === 'Rejected' ? 'You are not an Admin' : ''}
                </div>
                <form
                  action="#"
                  className="login-form"
                  onSubmit={formik.handleSubmit}
                >
                  <div className="form-group">
                    <CustomInput
                      type="text"
                      name="email"
                      label="Email Address"
                      id="email"
                      val={formik.values.email}
                      onChng={formik.handleChange('email')}
                    />
                  </div>
                  <div className="error">
                    {formik.touched.email && formik.errors.email ? (
                      <div>{formik.errors.email}</div>
                    ) : null}
                  </div>
                  <div className="form-group ">
                    <CustomInput
                      type="password"
                      name="password"
                      label="Password"
                      id="password"
                      val={formik.values.password}
                      onChng={formik.handleChange('password')}
                    />
                  </div>
                  <div className="error">
                    {formik.touched.password && formik.errors.password ? (
                      <div>{formik.errors.password}</div>
                    ) : null}
                  </div>
                  <div className="form-group">
                    <button
                      type="submit"
                      className="button form-control btn text-white text-decoration-none mb-0"
                    >
                      Login
                    </button>
                  </div>
                  <div className="form-group d-md-flex text-end">
                    <div className="w-100 text-md-right">
                      <Link to="/forgot-password">Forgot Password?</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Login;
