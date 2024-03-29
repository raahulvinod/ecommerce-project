import React, { useEffect, useState } from 'react';
import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import { Link, useNavigate } from 'react-router-dom';
import { AiFillDelete } from 'react-icons/ai';
import Container from '../components/Container';
import { useDispatch, useSelector } from 'react-redux';
import {
  deleteCartProduct,
  getUserCart,
  updateCartProduct,
} from '../features/user/userSlice';
import Loader from '../components/Loader';

const Cart = () => {
  const [productUpdateDetail, setProductUpdateDetail] = useState(null);
  const [totalAmount, setTotalAmount] = useState(0);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userCartState = useSelector((state) => state.auth.cartProducts);

  useEffect(() => {
    dispatch(getUserCart())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching cart:', error);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (productUpdateDetail !== null) {
      dispatch(
        updateCartProduct({
          cartItemId: productUpdateDetail?.cartItemId,
          newQuantity: productUpdateDetail?.quantity,
        })
      );
      setTimeout(() => {
        dispatch(getUserCart());
      }, 200);
    }
  }, [productUpdateDetail]);

  const deleteACartProduct = (id) => {
    dispatch(deleteCartProduct(id));
    setTimeout(() => {
      dispatch(getUserCart());
    }, 200);
  };

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < userCartState?.length; index++) {
      sum =
        sum +
        Number(userCartState[index].quantity) *
          Number(userCartState[index].price);
      setTotalAmount(sum);
    }
  }, [userCartState]);

  return (
    <>
      <Meta title="Your Cart" />
      <BreadCrumb title="Cart" />
      <Container class1="cart-wrapper home-wrapper-2">
        <div className="row">
          {loading ? (
            <Loader />
          ) : (
            <>
              <div className="col-12">
                {userCartState?.length !== 0 ? (
                  <div className="cart-header py-3 d-none d-md-flex justify-content-between align-items-center">
                    <h4 className="cart-col-1">Product</h4>
                    <h4 className="cart-col-2">Price</h4>
                    <h4 className="cart-col-3">Quantity</h4>
                    <h4 className="cart-col-4">Total</h4>
                  </div>
                ) : (
                  <div className="text-center">
                    <h4>Your cart is empty!</h4>
                    <p>Add items to it now.</p>
                    <Link to="/" className="button">
                      Shop now
                    </Link>
                  </div>
                )}

                {userCartState &&
                  userCartState?.map((item, index) => {
                    return (
                      <div
                        key={index}
                        className="cart-data py-3 mb-2 d-flex justify-content-between align-items-center"
                      >
                        <div
                          className="cart-col-1 gap-15 d-flex align-items-center"
                          onClick={() =>
                            navigate(`/product/${item?.productId?._id}`)
                          }
                          style={{ cursor: 'pointer' }}
                        >
                          <div className="w-25">
                            <img
                              src={item?.productId?.images[0]?.url}
                              className="img-fluid"
                              alt="product"
                            />
                          </div>
                          <div className="w-75">
                            <p>{item?.productId?.title}</p>
                            <p>{item?.productId?.brand}</p>
                            <div className="d-flex gap-3">
                              <p>Color:</p>
                              <div className="colors ps-0">
                                <li
                                  className="border border-secondary"
                                  style={{
                                    backgroundColor: item?.color?.title,
                                  }}
                                ></li>
                              </div>
                            </div>
                          </div>
                        </div>
                        <div className="cart-col-2">
                          <h5 className="price">₹ {item?.productId?.price}</h5>
                        </div>
                        <div className="cart-col-3 d-flex align-items-center gap-15">
                          <div>
                            <input
                              className="form-control"
                              type="number"
                              name={'quantity' + item?._id}
                              min={1}
                              max={10}
                              id={'cart' + item?._id}
                              value={item?.quantity}
                              onChange={(e) =>
                                setProductUpdateDetail({
                                  cartItemId: item?._id,
                                  quantity: e.target.value,
                                })
                              }
                            />
                          </div>
                          <div>
                            <AiFillDelete
                              role="button"
                              className="text-secondary"
                              onClick={() => {
                                deleteACartProduct(item?._id);
                              }}
                            />
                          </div>
                        </div>
                        <div className="cart-col-4">
                          <h5 className="price">
                            ₹ {item?.productId?.price * item?.quantity}
                          </h5>
                        </div>
                      </div>
                    );
                  })}
              </div>
              <div className="col-12 py-2 mt-4">
                <div className="d-flex flex-column justify-content-center align-items-center">
                  {userCartState?.length !== 0 && (
                    <div className="total-amount text-center mb-2">
                      <h4>Total Amount: ₹ {totalAmount}</h4>
                      <p className="small-text">
                        Taxes and shipping calculated at checkout
                      </p>
                    </div>
                  )}

                  {userCartState?.length !== 0 && (
                    <Link to="/checkout" className="button text-center mb-2">
                      Checkout
                    </Link>
                  )}

                  {userCartState?.length !== 0 && (
                    <Link to="/" className="button mb-4 text-center">
                      Continue To Shopping
                    </Link>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      </Container>
    </>
  );
};

export default Cart;
