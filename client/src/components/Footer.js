import { BsLinkedin, BsYoutube, BsInstagram, BsFacebook } from 'react-icons/bs';

const Footer = () => {
  return (
    <>
      <footer className="text-center text-lg-start text-white">
        <div className="container-xxl py-4">
          <section className="">
            <div className="row">
              <div className="col-md-3 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Trendfy
                </h6>
                <p>
                  <a href="/contact" className="text-white">
                    Contact us
                  </a>
                </p>
                <p>
                  <a href="/contact" className="text-white">
                    About us
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Careers
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Wholesales
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-2 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Information
                </h6>
                <p>
                  <a href="/" className="text-white">
                    Privacy Policy
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Refund Policy
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Shipping Policy
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Terms Of Service
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Account
                </h6>
                <p>
                  <a href="/" className="text-white">
                    Your Account
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Become an Affiliate
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Shipping Rates
                  </a>
                </p>
                <p>
                  <a href="/" className="text-white">
                    Help
                  </a>
                </p>
              </div>

              <hr className="w-100 clearfix d-md-none" />

              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mt-3">
                <h6 className="text-uppercase mb-4 font-weight-bold">
                  Contact
                </h6>
                <p>
                  <i className="fas fa-home mr-3"></i>No. 63, 1st Floor, 14th
                  Cross, 9th Main Road, 2nd Stage, Indiranagar, Bengaluru,
                  Karnataka 560038, India
                </p>
                <p>
                  <i className="fas fa-envelope mr-3"></i>shopping@trendfy.com
                </p>
                <p>
                  <i className="fas fa-phone mr-3"></i> +91 9400000072
                </p>
              </div>
            </div>
          </section>

          <section className="p-3 pt-0">
            <div className="row d-flex align-items-center">
              <div className="col-md-7 col-lg-8 text-center text-md-start">
                <div className="p-3">
                  &copy; {new Date().getFullYear()}{' '}
                  <a className="text-white" href="https://trendfy.com/">
                    Trendfy.com
                  </a>
                </div>
              </div>

              <div className="col-md-5 col-lg-4 ml-lg-0 text-center text-md-end">
                <a
                  className="text-white btn btn-floating m-1"
                  href="https://www.linkedin.com"
                >
                  <BsLinkedin className="fs-4" />
                </a>

                <a
                  className="btn btn-floating m-1 text-white"
                  href="https://www.youtube.com"
                >
                  <BsYoutube className="fs-4" />
                </a>

                <a
                  className="btn btn-floating m-1 text-white"
                  href="https://www.instagram.com"
                >
                  <BsInstagram className="fs-4" />
                </a>

                <a
                  className="btn btn-floating m-1 text-white"
                  href="https://www.facebook.com"
                >
                  <BsFacebook className="fs-4" />
                </a>
              </div>
            </div>
          </section>
        </div>
      </footer>
    </>
  );
};

export default Footer;
