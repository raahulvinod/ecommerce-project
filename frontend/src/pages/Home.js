import React from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import Marquee from 'react-fast-marquee';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';

const Home = () => {
  return (
    <>
      <Container class1={'home-wrapper-1 py-5'}>
        <div className="row">
          <div className="col-6">
            <div className="main-banner position-relative">
              <img
                className="img-fluid rounded-3"
                src="images/iphone-main.jpg"
                alt="main banner"
              />
              <div className="main-banner-content position-absolute">
                <h4>SUPERCHARGED FOR PROS.</h4>
                <h5>iPad S13+ Pro.</h5>
                <p>From $999.00 or $41.62/mo. </p>
                <Link className="button">BUY NOW</Link>
              </div>
            </div>
          </div>
          <div className="col-6">
            <div className="d-flex flex-wrap gap-10 justify-content-between align-items-center">
              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-01.jpg"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>best sale</h4>
                  <h5>Laptops</h5>
                  <p>From $999.00.</p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-02.jpg"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>15% off</h4>
                  <h5>Smart Watches</h5>
                  <p>From $999.00.</p>
                </div>
              </div>

              <div className="small-banner position-relative">
                <img
                  className="img-fluid rounded-3"
                  src="images/catbanner-03.jpg"
                  alt="main banner"
                />
                <div className="small-banner-content position-absolute">
                  <h4>new arrivals</h4>
                  <h5>Buy IPads</h5>
                  <p>From $999.00.</p>
                </div>
              </div>

              <div className="small-banner position-relative">
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
      </Container>
      <Container class1={'home-wrapper-2 py-5'}>
        <div className="row">
          <div className="col-12">
            <div className="services d-flex align-items-center justify-content-between">
              {services?.map((service, index) => {
                return (
                  <div className="d-flex align-items-center gap-10" key={index}>
                    <img src={service.image} alt="services" />
                    <div>
                      <h6>{service.title}</h6>
                      <p className="mb-0">{service.tagline}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </Container>

      <Container class1={'home-wrapper-2 py-5'}>
        <div className="row">
          <div className="col-12">
            <div className="categories d-flex flex-wrap align-items-center justify-content-between">
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>Camera</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>HeadPhones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="headpone" />
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>laptop</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/laptop.jpg" alt="laptop" />
              </div>

              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>Camera</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/camera.jpg" alt="camera" />
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>Smart Tv</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/tv.jpg" alt="tv" />
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>HeadPhones</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/headphone.jpg" alt="headpone" />
              </div>
              <div className="d-flex gap-10 align-items-center">
                <div>
                  <h6>laptop</h6>
                  <p>10 Items</p>
                </div>
                <img src="images/laptop.jpg" alt="laptop" />
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={'featured-wrapper py-5 home-wrapper-2'}>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Featured Collection</h3>
          </div>
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>

      <Container class1={'famous-wrapper py-5 home-wrapper-2'}>
        <div className="row">
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="/images/famous-1.webp"
                alt="famous"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5>Big screen</h5>
                <h6>Smart Watch Series 7</h6>
                <p>From ₹999or ₹160/mo. for 24 mo.*</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="/images/famous-2.webp"
                alt="famous"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Macbook</h5>
                <h6 className="text-dark">Apple Macbook Air M1</h6>
                <p className="text-dark">Apple M1 Processor</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="/images/famous-3.webp"
                alt="famous"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Smartphones</h5>
                <h6 className="text-dark">APPLE iPhone 14 Pro</h6>
                <p className="text-dark">Super Retina XDR Display</p>
              </div>
            </div>
          </div>
          <div className="col-3">
            <div className="famous-card position-relative">
              <img
                src="/images/famous-4.webp"
                alt="famous"
                className="img-fluid"
              />
              <div className="famous-content position-absolute">
                <h5 className="text-dark">Home Speakers</h5>
                <h6 className="text-dark">Room Filling Sound</h6>
                <p className="text-dark">
                  EMI starts at ₹167. No Cost EMI available
                </p>
              </div>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={'special-wrapper py-5 home-wrapper-2'}>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Special Products</h3>
          </div>
          <div className="row">
            <SpecialProduct />
            <SpecialProduct />
            <SpecialProduct />
          </div>
        </div>
      </Container>

      <Container class1={'popular-wrapper py-5 home-wrapper-2'}>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Popular Products</h3>
          </div>
        </div>
        <div className="row">
          <ProductCard />
          <ProductCard />
          <ProductCard />
          <ProductCard />
        </div>
      </Container>

      <Container class1={'marque-wrapper py-5'}>
        <div className="row">
          <div className="col-12">
            <div className="marquee-inner-wrapper card-wrapper">
              <Marquee>
                <div className="d-flex">
                  <div className="mx-4 w-25">
                    <img src="images/brand-01.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-02.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-03.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-04.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-05.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-06.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-07.png" alt="brand" />
                  </div>
                  <div className="mx-4 w-25">
                    <img src="images/brand-08.png" alt="brand" />
                  </div>
                </div>
              </Marquee>
            </div>
          </div>
        </div>
      </Container>

      <Container class1={'blog-wrapper py-5 home-wrapper-2'}>
        <div className="row">
          <div className="col-12">
            <h3 className="section-heading">Our Latest Blogs</h3>
          </div>
        </div>
        <div className="row">
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
          <div className="col-3">
            <BlogCard />
          </div>
        </div>
      </Container>
    </>
  );
};

export default Home;
