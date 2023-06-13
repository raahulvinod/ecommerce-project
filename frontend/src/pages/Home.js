import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <>
      <section className="home-wrapper-1 py-5">
        <div className="container-xxl">
          <div className="row">
            <div className="col-6 ">
              <div className="main-banner position-relative p-3">
                <img
                  className="img-fluid rounded-3"
                  src="images/main-banner-1.jpg"
                  alt="main banner"
                />
                <div className="main-banner-content position-absolute">
                  <h4>SUPERCHARGED FOR PROS.</h4>
                  <h5>iPad S13+ Pro.</h5>
                  <p>From $999.00 or $41.62/mo. Footnote</p>
                  <Link className="button">BUY NOW</Link>
                </div>
              </div>
            </div>
            <div className="col-6">
              <div className="d-flex flex-wrap gap-10 justify-content-between aligin-items-center">
                <div className="small-banner position-relative p-3">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-01.jpg"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>best sale</h4>
                    <h5>Laptops</h5>
                    <p>From $999.00 or $41.62/mo.</p>
                  </div>
                </div>

                <div className="small-banner position-relative p-3">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-02.jpg"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>15% off</h4>
                    <h5>Smart Watches</h5>
                    <p>From $999.00 or $41.62/mo.</p>
                  </div>
                </div>

                <div className="small-banner position-relative p-3">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-03.jpg"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>new arrivals</h4>
                    <h5>Buy IPads</h5>
                    <p>From $999.00 or $41.62/mo.</p>
                  </div>
                </div>

                <div className="small-banner position-relative p-3">
                  <img
                    className="img-fluid rounded-3"
                    src="images/catbanner-04.jpg"
                    alt="main banner"
                  />
                  <div className="small-banner-content position-absolute">
                    <h4>free engraving</h4>
                    <h5>HeadPhones</h5>
                    <p>From $999.00 </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
