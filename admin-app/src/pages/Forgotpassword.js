import React from 'react';
import CustomInput from '../components/CustomInput';

const Forgotpassword = () => {
  return (
    <div>
      <section className="formcard-section">
        <div className="container">
          <div className="row justify-content-center">
            <div className="col-md-7 col-lg-5">
              <div className="login-wrap p-4 p-md-5">
                <h4 className="text-center mb-4">Forgot Password</h4>
                <p className="text-center mb-4">
                  Please enter your registered email.
                </p>
                <form action="#" className="login-form">
                  <div className="form-group">
                    <CustomInput type="text" label="Email Address" id="email" />
                  </div>

                  <div className="form-group">
                    <button
                      type="submit"
                      className="form-control btn btn-dark rounded submit px-3"
                    >
                      Send Link
                    </button>
                  </div>
                  <div className="form-group d-md-flex">
                    <div className="w-100 text-md-right">
                      <a href="/forgot-password">Forgot Password?</a>
                    </div>
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
