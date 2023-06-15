import React from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const Forgotpassword = () => {
  return (
    <>
      <Meta title="Forgot-password" />
      <BreadCrumb title="Forgot-password" />

      <div className="login-wrapper py-5 home-wrapper-2">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <div className="auth-card">
                <h3 className="text-center mb-3">Reset Yout Password</h3>
                <p className="text-center mt-3 mb-3">
                  We will send you an email to reset your password
                </p>
                <form action="" className="d-flex flex-column gap-15">
                  <CustomInput type="email" name="email" placeholder="Email" />

                  <div>
                    <div className="mt-3 d-flex flex-column justify-content-center gap-15 align-items-center">
                      <button className="button border-0" type="submit">
                        Submit
                      </button>
                      <Link to="/login">Cancel</Link>
                    </div>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
export default Forgotpassword;
