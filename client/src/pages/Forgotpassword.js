import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import CustomInput from '../components/CustomInput';
import { Link, useNavigate } from 'react-router-dom';
import Container from '../components/Container';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useDispatch, useSelector } from 'react-redux';
import { forgotPasswordToken } from '../features/user/userSlice';

const emailSchema = yup.object({
  email: yup
    .string()
    .email('Invalid email address')
    .required('Email is required'),
});

const Forgotpassword = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      email: '',
    },
    validationSchema: emailSchema,
    onSubmit: (values) => {
      dispatch(forgotPasswordToken(values));

      formik.resetForm();
    },
  });
  return (
    <>
      <Meta title="Forgot-password" />
      <BreadCrumb title="Forgot-password" />

      <Container class1="login-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="auth-card">
              <h3 className="text-center mb-3">Reset Your Password</h3>
              <p className="text-center mt-3 mb-3">
                Enter the email address associated with your Trendfy account.
                <br /> We will send you an email to reset your password
              </p>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex flex-column gap-15"
              >
                <CustomInput
                  type="email"
                  name="email"
                  placeholder="Email"
                  value={formik.values.email}
                  onChange={formik.handleChange('email')}
                  onBlur={formik.handleBlur('email')}
                />
                <div className="error text-center">
                  {formik.touched.email && formik.errors.email}
                </div>

                <div>
                  <div className="mt-3 d-flex flex-column justify-content-center gap-15 align-items-center">
                    <button className="button border-0" type="submit">
                      Continue
                    </button>
                    <Link to="/login">Cancel</Link>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};
export default Forgotpassword;
