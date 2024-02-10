import React from 'react';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const Forgotpassword = () => {
  return (
    <div>
      <section className="formcard-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <h4 className="text-center mb-4 title">Forgot Password</h4>
                <p className="text-center mb-4">
                  Please enter your registered email.
                </p>
                <form action="#" className="login-form">
                  <div className="form-group">
                    <CustomInput type="text" label="Email Address" id="email" />
                  </div>

                  <div className="form-group">
                    <Link
                      type="submit"
                      className="button form-control btn text-white text-decoration-none mb-0"
                    >
                      Send Link
                    </Link>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Forgotpassword;
