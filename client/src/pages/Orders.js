import React, { useEffect } from 'react';
import Container from '../components/Container';
import BreadCrumb from '../components/BreadCrumb';
import { useDispatch, useSelector } from 'react-redux';
import { getOrders } from '../features/user/userSlice';

const Orders = () => {
  const dispatch = useDispatch();
  const orderState = useSelector(
    (state) => state.auth?.getOrderedProduct?.orders
  );
  console.log(orderState);

  useEffect(() => {
    dispatch(getOrders());
  }, []);
  return (
    <>
      <BreadCrumb title="My Orders" />
      <Container class1="cart-wrapper home-wrapper-2 py-5">
        <div className="row">
          <div className="col-12 mt-3">
            {orderState &&
              orderState?.map((item, index) => {
                return (
                  <div
                    className="row my-3"
                    style={{ backgroundColor: '#febd69' }}
                    key={index}
                  >
                    <div className="col-12">
                      <div className="row bg-white p-3">
                        <div className="col-3">
                          <h6>Product Details</h6>
                        </div>
                        <div className="col-2">
                          <h6>Quantity</h6>
                        </div>
                        <div className="col-2">
                          <h6>Price</h6>
                        </div>
                        <div className="col-2">
                          <h6>Color</h6>
                        </div>
                        <div className="col-3">
                          <h6>Order Details</h6>
                        </div>
                        {item?.orderItems?.map((i, index) => {
                          return (
                            <div className="col-12" key={index}>
                              <div className="row bg-white p-3">
                                <div className="col-3">
                                  <p>{i.product?.title}</p>
                                  <div>
                                    <img
                                      className="mb-5"
                                      style={{ width: 100, height: 100 }}
                                      src={i.product?.images[0]?.url}
                                    ></img>
                                  </div>
                                </div>
                                <div className="col-2">
                                  <p>{i.quantity}</p>
                                </div>
                                <div className="col-2">
                                  <p>₹ {i.price}</p>
                                </div>
                                <div className="col-2">
                                  <ul className="colors">
                                    <li
                                      style={{
                                        backgroundColor: i.color?.title,
                                      }}
                                    ></li>
                                  </ul>
                                </div>
                                <div className="col-3">
                                  <p>
                                    Order Id: <b>{item?._id}</b>
                                  </p>
                                  <p>Total Amount: ₹{item?.totalPrice}</p>
                                  <p>
                                    Total After Discount :
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
                          );
                        })}
                      </div>
                    </div>
                  </div>
                );
              })}
          </div>
        </div>
      </Container>
    </>
  );
};

export default Orders;
