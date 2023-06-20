import React from 'react';
import CustomInput from '../components/CustomInput';
import { Link } from 'react-router-dom';

const Login = () => {
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
                <h4 className="text-center mb-4 title">Login</h4>
                <form action="#" className="login-form">
                  <div className="form-group">
                    <CustomInput type="text" label="Email Address" id="email" />
                  </div>
                  <div className="form-group ">
                    <CustomInput
                      type="password"
                      label="Password"
                      id="password"
                    />
                  </div>
                  <div className="form-group">
                    <Link
                      to="/admin"
                      type="submit"
                      className="form-control btn btn-dark rounded submit px-3 text-decoration-none"
                    >
                      Login
                    </Link>
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
