import React, { useEffect } from 'react';
import { Link } from 'react-router-dom';
import BlogCard from '../components/BlogCard';
import ProductCard from '../components/ProductCard';
import Marquee from 'react-fast-marquee';
import SpecialProduct from '../components/SpecialProduct';
import Container from '../components/Container';
import { services } from '../utils/Data';
import { useDispatch, useSelector } from 'react-redux';
import moment from 'moment';
import { getAllBlogs } from '../features/blogs/blogSlice';
import {
  addToWishlist,
  getAllProducts,
} from '../features/products/productSlice';

import ReactStars from 'react-rating-stars-component';
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import prodcompare from '../images/prodcompare.svg';
import cam2 from '../images/cam2.avif';

const Home = () => {
  const dispatch = useDispatch();
  const blogState = useSelector((state) => state?.blog?.blog);
  const productState = useSelector((state) => state.product.product);
  console.log(productState);

  useEffect(() => {
    getBlogs();
    getProducts();
  }, []);

  const getBlogs = () => {
    dispatch(getAllBlogs());
  };

  const getProducts = () => {
    dispatch(getAllProducts());
  };

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

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
            {productState &&
              productState.map((item, index) => {
                if (item.tags === 'featured') {
                  return (
                    <SpecialProduct
                      key={index}
                      title={item?.title}
                      brand={item?.brand}
                      totalrating={+item?.totalrating}
                      price={item?.price}
                      quantity={item?.quantity}
                      sold={item?.sold ? item?.sold : 0}
                    />
                  );
                }
              })}
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
          {productState &&
            productState.map((item, index) => {
              if (item.tags === 'featured') {
                return (
                  <div key={index} className={'col-3'}>
                    <Link
                      // to={`${
                      //   location.pathname === '/'
                      //     ? '/product/:id'
                      //     : location.pathname === '/product/:id'
                      //     ? '/product/:id'
                      //     : ':id'
                      // }`}
                      className="product-card position-relative"
                    >
                      <div className="wishlist-icon position-absolute">
                        <button
                          className="border-0 bg-transparent"
                          onClick={() => addToWish(item?._id)}
                        >
                          <img src={wish} alt="wishlist" />
                        </button>
                      </div>

                      <div className="product-image ">
                        <img
                          src={item?.images[0].url}
                          alt="products"
                          className="img-fluid"
                          width={250}
                        />
                        <img
                          src={cam2}
                          alt="products"
                          className="img-fluid"
                          width={250}
                        />
                      </div>
                      <div className="product-details">
                        <h6 className="brand">{item?.brand}</h6>
                        <h5 className="product-title">{item?.title}</h5>
                        <ReactStars
                          value={+item?.totalrating}
                          edit={false}
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                        />

                        <p className="price">₹{item.price}</p>
                      </div>
                      <div className="action-bar position-absolute">
                        <div className="d-flex flex-column gap-15">
                          <button className="border-0 bg-transparent">
                            <img src={prodcompare} alt="compare" />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img src={view} alt="view" />
                          </button>
                          <button className="border-0 bg-transparent">
                            <img src={addcart} alt="addcart" />
                          </button>
                        </div>
                      </div>
                    </Link>
                  </div>
                );
              }
            })}
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
          {blogState?.map((blog, index) => {
            if (index < 4) {
              return (
                <div className="col-3 mb-3" key={index}>
                  <BlogCard
                    id={blog?._id}
                    title={blog?.title}
                    description={blog?.description}
                    image={blog?.images[0]?.url}
                    date={moment(blog?.createdAt).format(
                      'MMMM Do YYYY, h:mm a'
                    )}
                  />
                </div>
              );
            }
          })}
        </div>
      </Container>
    </>
  );
};

export default Home;
