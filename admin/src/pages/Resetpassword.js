import React from 'react';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const Resetpassword = () => {
  return (
    <>
      <section className="formcard-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <h4 className="text-center mb-4 title">Reset Password</h4>
                <p className="text-center mb-4">Please enter new password</p>
                <form action="#" className="login-form">
                  <div className="form-group ">
                    <CustomInput
                      type="password"
                      label="New Password"
                      id="password"
                    />
                  </div>
                  <div className="form-group ">
                    <CustomInput
                      type="password"
                      label="Confirm Password"
                      id="confirmpass"
                    />
                  </div>
                  <div className="form-group">
                    <Link
                      type="submit"
                      className="button submit form-control btn text-white text-decoration-none mb-0"
                    >
                      Reset
                    </Link>
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

export default Resetpassword;
