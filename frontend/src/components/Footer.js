import React from 'react';
import { Link } from 'react-router-dom/';
import { BsLinkedin, BsYoutube, BsInstagram, BsFacebook } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-5">
              <div className="footer-top-data d-flex gap-30 align-items-center">
                <img src="images/newsletter.png" alt="newsletter" />
                <h2 className="mb-0 text-white">Sign Up for Newsletter</h2>
              </div>
            </div>
            <div className="col-7">
              <div className="input-group ">
                <input
                  type="text"
                  className="form-control py-1"
                  placeholder="Your Email Address"
                  aria-label="Your Email Address"
                  aria-describedby="basic-addon2"
                />
                <span className="input-group-text p-2" id="basic-addon2">
                  Subscribe
                </span>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-4">
              <h4 className="text-white mb-4">Contact Us</h4>
              <div>
                <address className="text-white fs-6">
                  Trendfy Internet Private Limited,
                  <br /> Kollam, 691589,
                  <br /> Kerala, India.
                </address>
                <a
                  href="tel:+9400000072"
                  className="mt-3 text-white mb-1 d-block mb-3"
                >
                  +91 9400000072
                </a>
                <a
                  href="mailto:trendfy@gmail.com"
                  className="mt-2 text-white mb-0 d-block mb-3"
                >
                  shopping@trendfy.com
                </a>
                <div className="social-icons d-flex aligin-items-center gap-30 mt-4">
                  <a className="text-white" href="https://www.linkedin.com">
                    <BsLinkedin className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.youtube.com">
                    <BsYoutube className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.instagram.com">
                    <BsInstagram className="fs-4" />
                  </a>
                  <a className="text-white" href="https://www.facebook.com">
                    <BsFacebook className="fs-4" />
                  </a>
                </div>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Information</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Privacy Policy</Link>
                <Link className="text-white py-2 mb-1">Refund Policy</Link>
                <Link className="text-white py-2 mb-1">Shipping Policy</Link>
                <Link className="text-white py-2 mb-1">Terms Of Service</Link>
                <Link className="text-white py-2 mb-1">Blogs</Link>
              </div>
            </div>
            <div className="col-3">
              <h4 className="text-white mb-4">Account</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Search</Link>
                <Link className="text-white py-2 mb-1">About</Link>
                <Link className="text-white py-2 mb-1">Faq</Link>
                <Link className="text-white py-2 mb-1">Contact</Link>
                <Link className="text-white py-2 mb-1">Size chart</Link>
              </div>
            </div>
            <div className="col-2">
              <h4 className="text-white mb-4">Quick Links</h4>
              <div className="footer-links d-flex flex-column">
                <Link className="text-white py-2 mb-1">Accessories</Link>
                <Link className="text-white py-2 mb-1">Laptops</Link>
                <Link className="text-white py-2 mb-1">Headphones</Link>
                <Link className="text-white py-2 mb-1">Smart Watches</Link>
                <Link className="text-white py-2 mb-1">Tablets</Link>
              </div>
            </div>
          </div>
        </div>
      </footer>
      <footer className="py-4">
        <div className="container-xxl">
          <div className="row">
            <div className="col-12">
              <p className="text-center text-white mb-0">
                &copy; {new Date().getFullYear()} Trendfy.com
              </p>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
};

export default Footer;
