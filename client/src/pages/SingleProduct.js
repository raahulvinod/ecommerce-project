import React, { useEffect, useState } from 'react';
import ReactStars from 'react-rating-stars-component';
import ReactImageZoom from 'react-image-zoom';
import { TbGitCompare } from 'react-icons/tb';
import { AiOutlineHeart } from 'react-icons/ai';
import { BsLink45Deg } from 'react-icons/bs';
import { useLocation, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Color from '../components/Color';
import Container from '../components/Container';
import {
  addRating,
  getAProduct,
  getAllProducts,
} from '../features/products/productSlice';
import { addProdToCart, getUserCart } from '../features/user/userSlice';
import SimilarProduct from '../components/SimilarProduct';
import Loader from '../components/Loader';

const SingleProduct = () => {
  const [color, setColor] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [alreadyAdded, setAlreadyAdded] = useState(false);
  const [popularProduct, setPopularProduct] = useState([]);
  const [star, setStar] = useState(null);
  const [comment, setComment] = useState(null);
  const [loading, setLoading] = useState(true);

  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const getProductId = location.pathname.split('/')[2];
  const productState = useSelector((state) => state?.product?.singleProduct);
  const productsState = useSelector((state) => state?.product?.product);
  const cartState = useSelector((state) => state?.auth?.cartProducts);

  useEffect(() => {
    dispatch(getAProduct(getProductId))
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching product:', error);
        setLoading(false);
      });

    dispatch(getUserCart());
    dispatch(getAllProducts());
  }, []);

  useEffect(() => {
    for (let index = 0; index < cartState?.length; index++) {
      if (getProductId === cartState[index]?.productId?._id) {
        setAlreadyAdded(true);
      }
    }
  }, []);

  const uploadCart = () => {
    if (color === null) {
      toast.error('Please choose color');
      return false;
    } else {
      dispatch(
        addProdToCart({
          productId: productState?._id,
          price: productState?.price,
          color,
          quantity,
        })
      ).then(() => {
        // Dispatch an action to fetch the latest cart state
        dispatch(getUserCart());
        // Reset color and quantity after successful addition to cart
        setColor(null);
        setQuantity(1);
      });
    }
  };

  const addRatingToProduct = () => {
    if (star === null) {
      toast.error('Please add start rating!');
      return false;
    } else if (comment === null) {
      toast.error('Please write review about product!');
      return false;
    } else {
      dispatch(
        addRating({ star: star, comment: comment, prodId: getProductId })
      );
      setTimeout(() => {
        dispatch(getAProduct(getProductId));
      }, 100);
    }
    return false;
  };

  const props = {
    width: 100,
    height: 380,
    zoomWidth: 600,
    img: productState?.images[0]?.url
      ? productState?.images[0]?.url
      : 'https://res.cloudinary.com/dxypazeq8/image/upload/v1708244291/screen_ifk5kw.png',
  };

  const copyToClipboard = (text) => {
    var textField = document.createElement('textarea');
    textField.innerText = text;
    document.body.appendChild(textField);
    textField.select();
    document.execCommand('copy');
    textField.remove();
  };

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productsState.length; index++) {
      const element = productsState[index];
      if (element.tags === 'popular') {
        data.push(element);
      }
      setPopularProduct(data);
    }
  }, [productsState]);

  return (
    <>
      <Meta title={productState?.title} />
      <BreadCrumb title={productState?.title} />
      {loading ? (
        <Loader />
      ) : (
        <Container class1="main-product-wrapper py-5 home-wrapper-2">
          <div className="row">
            <div className="col-lg-6 col-md-12 mb-4">
              <div className="main-product-image">
                <div className="main-image mb-3">
                  <ReactImageZoom {...props} />
                </div>
                <div className="other-product-images">
                  {productState &&
                    productState?.images.map((item, index) => {
                      return (
                        <div key={index} className="other-image">
                          <img
                            src={item?.url}
                            alt="product"
                            className="img-fluid"
                            style={{ maxWidth: '100%', height: 'auto' }}
                          />
                        </div>
                      );
                    })}
                </div>
              </div>
            </div>
            <div className="col-lg-6 col-md-12">
              <div className="main-product-details">
                <div className="border-bottom py-3">
                  <h3 className="title">{productState?.title}</h3>
                </div>
                <div className="border-bottom">
                  <p className="price">₹ {productState?.price}</p>
                  <div className="d-flex align-items-center gap-10">
                    <ReactStars
                      value={3}
                      edit={false}
                      count={5}
                      size={24}
                      activeColor="#ffd700"
                    />
                    <p className="mb-0 t-review">(2 Reviews)</p>
                  </div>
                  <a href="#review" className="review-btn mb-2">
                    Write a Review
                  </a>
                </div>
                <div className="py-2">
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Brand:</h3>
                    <p className="product-data">{productState?.brand}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Category:</h3>
                    <p className="product-data">{productState?.category}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Tags:</h3>
                    <p className="product-data">{productState?.tags}</p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-2">
                    <h3 className="product-heading">Availability:</h3>
                    <p className="product-data">In Stock</p>
                  </div>

                  <div className="d-flex gap-10 flex-column mt-2 mb-3">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Color :</h3>
                        <Color
                          setColor={setColor}
                          colorData={productState?.color}
                        />
                      </>
                    )}
                  </div>

                  <div className="d-flex gap-15 align-items-center flex-row mt-2 mb-3">
                    {alreadyAdded === false && (
                      <>
                        <h3 className="product-heading">Quantity:</h3>
                        <div className="">
                          <input
                            type="number"
                            name=""
                            min={1}
                            max={10}
                            className="form-control"
                            style={{ width: '70px' }}
                            id=""
                            onChange={(e) => setQuantity(e.target.value)}
                            value={quantity}
                          />
                        </div>
                      </>
                    )}
                    <div
                      className={
                        alreadyAdded
                          ? 'ms-0'
                          : 'ms-5' + 'd-flex align-items-center gap-30'
                      }
                    >
                      <button
                        className="button border-0"
                        // data-bs-toggle="modal"
                        // data-bs-target="#staticBackdrop"
                        type="button"
                        onClick={() => {
                          alreadyAdded ? navigate('/cart') : uploadCart();
                        }}
                      >
                        {alreadyAdded ? 'Go to cart' : 'Add to cart'}
                      </button>
                    </div>
                  </div>

                  <div className="d-flex gap-10 flex-column my-3">
                    <h3 className="product-heading">Shipping & Returns :</h3>
                    <p className="product-data">
                      Free shipping and returns available on all orders! <br />
                      We ship all indian domestic orders within
                      <b> 5-10 business days!</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 flex-column my-3">
                    <h3 className="product-heading">Easy Payment Options</h3>
                    <p className="product-data">
                      No cost EMI Available.
                      <br />
                      <b> Net banking & Credit/ Debit/ ATM card.</b>
                    </p>
                  </div>
                  <div className="d-flex gap-10 align-items-center my-3">
                    <h3 className="product-heading">
                      <BsLink45Deg />
                    </h3>
                    <p className="product-data">
                      <a
                        // href="javascript:void(0)"
                        onClick={() => {
                          copyToClipboard(window.location.href);
                        }}
                      >
                        Copy Link
                      </a>
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <Container class1="description-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h4>Description</h4>
                <div className="bg-white p-3">
                  <p
                    dangerouslySetInnerHTML={{
                      __html: productState?.description,
                    }}
                  ></p>
                </div>
              </div>
            </div>
          </Container>
          <Container class1="reviews-wrapper home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h4 id="review">Reviews</h4>
                <div className="review-inner-wrapper">
                  <div className="review-head d-flex justify-content-between align-items-end">
                    <div>
                      <h4 className="mb-2">Customer Reviews</h4>
                      <div className="d-flex gap-10 align-items-center">
                        <ReactStars
                          value={4}
                          edit={false}
                          count={5}
                          size={24}
                          activeColor="#ffd700"
                        />
                        <p className="mb-0">Based on 2 reviews</p>
                      </div>
                    </div>
                  </div>

                  <div className="review-form py-4">
                    <h4>Write a Review</h4>

                    <div>
                      <ReactStars
                        value={0}
                        edit={true}
                        count={5}
                        size={24}
                        activeColor="#ffd700"
                        onChange={(e) => {
                          setStar(e);
                        }}
                      />
                    </div>
                    <div>
                      <textarea
                        name=""
                        id=""
                        className="w-100 form-control mt-3"
                        cols="30"
                        rows="4"
                        placeholder="Comments"
                        onChange={(e) => {
                          setComment(e.target.value);
                        }}
                      ></textarea>
                    </div>
                    <div className="d-flex justify-content-end">
                      <button
                        type="button"
                        onClick={addRatingToProduct}
                        className="button border-0 mt-3"
                      >
                        Submit Review
                      </button>
                    </div>
                  </div>

                  <div className="reviews mt-4">
                    {productState &&
                      productState?.ratings?.map((item, index) => {
                        return (
                          <div key={index} className="review">
                            <div className="d-flex gap-10 align-items-center">
                              <ReactStars
                                value={item?.star}
                                edit={false}
                                count={5}
                                size={24}
                                activeColor="#ffd700"
                              />
                            </div>
                            <p className="mt-3">{item?.comment}</p>
                          </div>
                        );
                      })}
                  </div>
                </div>
              </div>
            </div>
          </Container>

          <Container class1="popular-wrapper py-5 home-wrapper-2">
            <div className="row">
              <div className="col-12">
                <h3 className="section-heading">You might be interested in</h3>
              </div>
            </div>
            <div className="row">
              <SimilarProduct productData={popularProduct} />
            </div>
          </Container>
        </Container>
      )}
    </>
  );
};

export default SingleProduct;
