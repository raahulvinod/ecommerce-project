import React, { useEffect, useState } from 'react';

import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';
import Loader from '../components/Loader';
import { useNavigate } from 'react-router-dom';

const Orders = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  const orderState = useSelector(
    (state) => state.auth?.getOrderedProduct?.orders
  );

  useEffect(() => {
    dispatch(getOrders())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching orders:', error);
        setLoading(false);
      });
  }, []);
  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                {orderState && orderState.length === 0 && (
                  <div className="text-center fs-3">No Ordered Items</div>
                )}
              </div>
            </div>
            <div className="row">
              <div className="col-12 mt-3">
                {orderState &&
                  orderState.map((item, index) => (
                    <div
                      className="row my-3"
                      style={{ backgroundColor: '#febd69' }}
                      key={index}
                    >
                      <div className="col-12">
                        <div className="row bg-white p-3">
                          {item?.orderItems?.map((i, index) => (
                            <div key={index} className="col-lg-12 mb-3">
                              <div
                                className="row"
                                onClick={() =>
                                  navigate(`/product/${i.product?._id}`)
                                }
                                style={{ cursor: 'pointer' }}
                              >
                                <div className="col-lg-3 col-md-6">
                                  <h6>Product Details</h6>
                                  <p>{i.product?.title}</p>
                                  <div>
                                    <img
                                      className="mb-3"
                                      style={{
                                        width: '100%',
                                        maxWidth: '100px',
                                        height: 'auto',
                                      }}
                                      src={i.product?.images[0]?.url}
                                      alt="Product"
                                    />
                                  </div>
                                </div>
                                <div className="col-lg-2 col-md-6">
                                  <h6>Quantity</h6>
                                  <p>{i.quantity}</p>
                                </div>
                                <div className="col-lg-2 col-md-6">
                                  <h6>Price</h6>
                                  <p>₹ {i.price}</p>
                                </div>
                                <div className="col-lg-2 col-md-6">
                                  <h6>Color</h6>
                                  <ul className="colors p-0">
                                    <li
                                      style={{
                                        backgroundColor: i.color?.title,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                                <div className="col-lg-3 col-md-6">
                                  <h6>Order Details</h6>
                                  <p>
                                    Order Id: <b>{item?._id}</b>
                                  </p>
                                  <p>Total Amount: ₹{item?.totalPrice}</p>
                                  <p>
                                    Total After Discount :{' '}
                                    <strong>
                                      ₹ {item?.totalPriceAfterDiscount}
                                    </strong>
                                  </p>
                                  <p style={{ color: '#26a541' }}>
                                    &#x2714;
                                    <strong>{item?.orderStatus}</strong>
                                  </p>
                                </div>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Orders;
