import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { BiArrowBack } from 'react-icons/bi';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import { useFormik } from 'formik';
import * as yup from 'yup';
import axios from 'axios';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { config } from '../utils/AxiosConfig';
import { base_url } from '../utils/AxiosConfig';
import {
  createAnOrder,
  deleteUserCart,
  resetState,
} from '../features/user/userSlice';

const shippingSchema = yup.object({
  firstName: yup.string().required('First name is required'),
  lastName: yup.string().required('Last name is required'),
  address: yup.string().required('Address is required'),
  landmark: yup.string().required('Landmark is required'),
  city: yup.string().required('city is required'),
  state: yup.string().required('State is required'),
  country: yup.string().required('Country is required'),
  pincode: yup.number().required('Pincode is required'),
});

const Checkout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state.auth);
  const [totalAmount, setTotalAmount] = useState(0);
  const [cartProductState, setCartProductState] = useState([]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  useEffect(() => {
    if (
      authState?.orderedProduct?.order !== null &&
      authState?.orderedProduct?.success === true
    ) {
      navigate('/my-orders');
    }
  }, [authState]);

  useEffect(() => {
    let items = [];
    for (let index = 0; index < cartState?.length; index++) {
      items.push({
        product: cartState[index]?.productId?._id,
        quantity: cartState[index]?.quantity,
        color: cartState[index]?.color._id,
        price: cartState[index]?.price,
      });
    }
    setCartProductState(items);
  }, []);

  const loadScript = (src) => {
    return new Promise((resolve) => {
      const script = document.createElement('script');
      script.src = src;
      script.onload = () => {
        resolve(true);
      };
      script.onerror = () => {
        resolve(false);
      };
      document.body.appendChild(script);
    });
  };

  const checkoutHandler = async () => {
    const res = await loadScript(
      'https://checkout.razorpay.com/v1/checkout.js'
    );
    if (!res) {
      alert('Razorpay SDK failed to load!');
      return;
    }
    const result = await axios.post(
      `${base_url}user/order/checkout`,
      { amount: totalAmount },
      config
    );
    if (!result) {
      alert('Something went wrong');
      return;
    }
    const { amount, id: order_id, currency } = result.data.order;

    const options = {
      key: process.env.REACT_APP_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
      amount: amount.toString(),
      currency: currency,
      name: 'Trendfy',
      description: 'Test Transaction',
      // image: logo,
      order_id: order_id,
      handler: async function (response) {
        const data = {
          orderCreationId: order_id,
          razorpayPaymentId: response.razorpay_payment_id,
          razorpayOrderId: response.razorpay_order_id,
        };

        const result = await axios.post(
          `${base_url}user/order/paymentVerification`,
          data,
          config
        );

        dispatch(
          createAnOrder({
            totalPrice: totalAmount,
            totalPriceAfterDiscount: totalAmount,
            orderItems: cartProductState,
            paymentInfo: result.data,
            shippingInfo: JSON.parse(localStorage.getItem('address')),
          })
        );
        dispatch(deleteUserCart());
        localStorage.removeItem('address');
        dispatch(resetState());
      },
      prefill: {
        name: 'Trendfy',
        email: 'Shopping@trendfy.com',
        contact: '9400273000',
      },
      notes: {
        address: 'Trendfy Office',
      },
      theme: {
        color: '#61dafb',
      },
    };

    const paymentObject = new window.Razorpay(options);
    paymentObject.open();
  };

  const formik = useFormik({
    initialValues: {
      firstName: '',
      lastName: '',
      address: '',
      landmark: '',
      city: '',
      state: '',
      country: '',
      pincode: '',
    },
    validationSchema: shippingSchema,
    onSubmit: (values) => {
      localStorage.setItem('address', JSON.stringify(values));
      setTimeout(() => {
        checkoutHandler();
      }, 300);
    },
  });

  return (
    <>
      <Meta title="Checkout" />
      <BreadCrumb title="Checkout" />
      <Container class1="checkout-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-lg-7 mb-4">
            <div className="checkout-left-data">
              <h3 className="website-name">Trendfy</h3>
              <nav
                style={{ '--bs-breadcrumb-divider': '>' }}
                aria-label="breadcrumb"
              >
                <ol className="breadcrumb">
                  <li className="breadcrumb-item">
                    <Link className="text-dark total-price" to="/cart">
                      Cart
                    </Link>
                  </li>
                  &nbsp; /&nbsp;
                  <li
                    className="breadcrumb-ite total-price active"
                    aria-current="page"
                  >
                    Information
                  </li>
                  &nbsp; /
                  <li className="breadcrumb-item total-price active">
                    Shipping
                  </li>
                  &nbsp; /
                  <li
                    className="breadcrumb-item total-price active"
                    aria-current="page"
                  >
                    Payment
                  </li>
                </ol>
              </nav>
              <h4 className="title total">Contact Information</h4>
              <p className="user-details total">shopping@trendfy.com</p>
              <h4 className="mb-3">Shipping Address</h4>
              <form
                onSubmit={formik.handleSubmit}
                className="d-flex gap-15 flex-wrap justify-content-between"
              >
                <div className="flex-grow-1">
                  <select
                    className="form-control form-select"
                    id=""
                    name="country"
                    onChange={formik.handleChange('country')}
                    onBlur={formik.handleChange('country')}
                    value={formik.values.country}
                  >
                    <option value="selected">Select Country</option>
                    <option value="India">India</option>
                  </select>
                  <div className="error">
                    {formik.touched.country && formik.errors.country}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="First Name"
                    className="form-control"
                    name="firstName"
                    onChange={formik.handleChange('firstName')}
                    onBlur={formik.handleChange('firstName')}
                    value={formik.values.firstName}
                  />
                  <div className="error">
                    {formik.touched.firstName && formik.errors.firstName}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="form-control"
                    name="lastName"
                    onChange={formik.handleChange('lastName')}
                    onBlur={formik.handleChange('lastName')}
                    value={formik.values.lastName}
                  />
                  <div className="error">
                    {formik.touched.lastName && formik.errors.lastName}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Address(Area and Street)"
                    className="form-control"
                    name="address"
                    onChange={formik.handleChange('address')}
                    onBlur={formik.handleChange('address')}
                    value={formik.values.address}
                  />
                  <div className="error">
                    {formik.touched.address && formik.errors.address}
                  </div>
                </div>
                <div className="w-100">
                  <input
                    type="text"
                    placeholder="Landmark"
                    className="form-control"
                    name="landmark"
                    onChange={formik.handleChange('landmark')}
                    onBlur={formik.handleChange('landmark')}
                    value={formik.values.landmark}
                  />
                  <div className="error">
                    {formik.touched.landmark && formik.errors.landmark}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="City"
                    className="form-control"
                    name="city"
                    onChange={formik.handleChange('city')}
                    onBlur={formik.handleChange('city')}
                    value={formik.values.city}
                  />
                  <div className="error">
                    {formik.touched.city && formik.errors.city}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <select
                    name="state"
                    onChange={formik.handleChange('state')}
                    onBlur={formik.handleChange('state')}
                    value={formik.values.state}
                    className="form-control form-select"
                    id=""
                  >
                    <option value="" defaultValue="selected" disabled>
                      Select State
                    </option>
                    <option value="Kerala">Kerala</option>
                    <option value="tamilnadu">Tamilnadu</option>
                  </select>
                  <div className="error">
                    {formik.touched.state && formik.errors.state}
                  </div>
                </div>
                <div className="flex-grow-1">
                  <input
                    type="text"
                    placeholder="Pincode"
                    className="form-control"
                    name="pincode"
                    onChange={formik.handleChange('pincode')}
                    onBlur={formik.handleChange('pincode')}
                    value={formik.values.pincode}
                  />
                  <div className="error">
                    {formik.touched.pincode && formik.errors.pincode}
                  </div>
                </div>
                <div className="w-100">
                  <div className="d-grid gap-2">
                    <Link
                      to="/cart"
                      className="text-dark btn btn-outline-secondary"
                    >
                      <BiArrowBack className="me-2" />
                      Return to Cart
                    </Link>
                    <button
                      type="submit"
                      className="button border-0"
                      style={{ width: '100%' }}
                    >
                      Place order
                    </button>
                  </div>
                </div>
              </form>
            </div>
          </div>

          <div className="col-lg-5">
            <div className="border-bottom py-4">
              {cartState &&
                cartState?.map((item, index) => {
                  return (
                    <div
                      key={index}
                      className="d-flex gap-10 mb-2 align-align-items-center"
                    >
                      <div className="w-25 position-relative">
                        <span
                          style={{ top: '-10px', right: '2px' }}
                          className="badge bg-secondary d-none d-lg-block text-white rounded-circle p-2 position-absolute"
                        >
                          {item?.quantity}
                        </span>
                        <img
                          className=""
                          src={item?.productId?.images[0]?.url}
                          alt="product"
                          width={100}
                          height={100}
                          style={{
                            width: '100%',
                            height: 'auto',
                          }}
                        />
                      </div>
                      <div className="w-75 d-flex flex-column gap-2">
                        <h5 className="total-price">{item?.productId.title}</h5>
                        <p className="total-price">{item?.productId.brand}</p>
                        <div className="flex-grow-1">
                          <h5 className="total">
                            ₹ {item?.quantity * item?.price}
                          </h5>
                        </div>
                      </div>
                    </div>
                  );
                })}
            </div>
            <div className="border-bottom py-4">
              <div className="d-flex justify-content-between align-items-center">
                <p className="total">
                  Price ({cartState?.length ? cartState?.length : ''} Item)
                </p>
                <p className="total-price">₹ {totalAmount}</p>
              </div>
              <div className="d-flex justify-content-between align-items-center">
                <p className="mb-0 total">Delivery Charges</p>
                <p className="mb-0 total-price" style={{ color: '#388e3c' }}>
                  Free
                </p>
              </div>
            </div>
            <div className="d-flex justify-content-between align-items-center border-bottom py-4">
              <h4 className="total">Total Amount</h4>
              <h5 className="total">₹ {totalAmount ? totalAmount : 0}</h5>
            </div>
          </div>
        </div>
      </Container>
    </>
  );
};

export default Checkout;
