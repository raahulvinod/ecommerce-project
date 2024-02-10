import React, { useEffect, useState } from 'react';
import { NavLink, Link, useNavigate } from 'react-router-dom';
import { BsSearch } from 'react-icons/bs';
import { useDispatch, useSelector } from 'react-redux';

import menu from '../images/menu.svg';
import { getUserCart } from '../features/user/userSlice';
import { Typeahead } from 'react-bootstrap-typeahead';
import 'react-bootstrap-typeahead/css/Typeahead.css';
import { getAProduct } from '../features/products/productSlice';

const Header = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartState = useSelector((state) => state?.auth?.cartProducts);
  const authState = useSelector((state) => state?.auth);
  const productState = useSelector((state) => state?.product?.product);
  const [totalAmount, setTotalAmount] = useState(0);
  const [productOpt, setProductOpt] = useState([]);

  useEffect(() => {
    dispatch(getUserCart());
  }, []);

  useEffect(() => {
    let data = [];
    for (let index = 0; index < productState.length; index++) {
      const element = productState[index];
      data.push({ id: index, prod: element?._id, name: element?.title });
    }
    setProductOpt(data);
  }, [productState]);

  useEffect(() => {
    let sum = 0;
    for (let index = 0; index < cartState?.length; index++) {
      sum =
        sum +
        Number(cartState[index].quantity) * Number(cartState[index].price);
      setTotalAmount(sum);
    }
  }, [cartState]);

  const handleLogout = () => {
    localStorage.clear();
    window.location.reload();
  };

  return (
    <>
      <header className="header-upper py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-2">
              <h2>
                <Link to="/" className="text-white">
                  Trendfy.
                </Link>
              </h2>
            </div>
            <div className="col-5">
              <div className="input-group ">
                <Typeahead
                  id="pagination-example"
                  onPaginate={() => console.log('Results paginated')}
                  options={productOpt}
                  placeholder="Search products..."
                  labelKey={'name'}
                  minLength={2}
                  onChange={(selected) => {
                    navigate(`/product/${selected[0]?.prod}`);
                    dispatch(getAProduct(selected[0]?.prod));
                  }}
                />
                <span className="input-group-text p-3" id="basic-addon2">
                  <BsSearch className="fs-6" />
                </span>
              </div>
            </div>
            <div className="col-5 d-flex justify-content-end gap-4">
              <Link
                to="/wishlist"
                className="d-flex align-items-center gap-10 text-white"
              >
                <img src="/images/wishlist.svg" alt="wishist" />
                <p className="mb-0 d-none d-lg-block">wishlist</p>
              </Link>

              <Link
                to={authState?.user === null ? '/login' : '/my-profile'}
                className="d-flex align-items-center gap-10 text-white"
              >
                <img src="/images/user.svg" alt="user" />
                {authState?.user === null ? (
                  <p className="mb-0 d-none d-lg-block">Login</p>
                ) : (
                  <p className="mb-0 d-none d-lg-block">
                    {authState?.user?.fistname}
                  </p>
                )}
              </Link>

              <Link
                to={authState?.user === null ? '/login' : '/cart'}
                className="d-flex align-items-center gap-10 text-white position-relative" // Add position-relative class
              >
                <div className="d-flex flex-column gap-10 align-items-end">
                  <span className="badge bg-white text-dark position-absolute top-0 end-0">
                    {cartState?.length ? cartState?.length : 0}
                  </span>
                  {cartState?.length !== 0 ? (
                    <div>
                      <p className="mb-0">₹ {totalAmount}</p>
                    </div>
                  ) : (
                    <div>
                      <p className="mb-0">₹ 0</p>
                    </div>
                  )}
                </div>
                <img src="/images/cart.svg" alt="cart" />
              </Link>
            </div>
          </div>
        </div>
      </header>
      <header className="header-bottom py-3">
        <div className="container-xxl">
          <div className="row align-items-center">
            <div className="col-6 col-md-2">
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle bg-transparent border-0 d-flex gap-15 align-items-center"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  <img src={menu} alt="menu" />
                  <span>Shop Categories</span>
                </button>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link className="dropdown-item text-white" to="">
                      Home
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" to="">
                      Home Appliances
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" to="">
                      Computers & Laptop
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" to="">
                      Mobiles & Tablets
                    </Link>
                  </li>
                  <li>
                    <Link className="dropdown-item text-white" to="">
                      Music & Gaming
                    </Link>
                  </li>
                </ul>
              </div>
            </div>
            <div className="col-6 col-md-10">
              <div className="menu-links d-md-flex justify-content-end">
                <div className="dropdown d-block d-md-none ms-auto">
                  <button
                    className="btn btn-secondary dropdown-toggle bg-transparent border-0 text-white"
                    type="button"
                    id="dropdownMenuButton2"
                    data-bs-toggle="dropdown"
                    aria-expanded="false"
                  >
                    Home
                  </button>
                  <ul
                    className="dropdown-menu dropdown-menu-end"
                    aria-labelledby="dropdownMenuButton2"
                  >
                    <li>
                      <NavLink className="dropdown-item" to="/">
                        Home
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/product">
                        Our store
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/my-orders">
                        My orders
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/blogs">
                        Blogs
                      </NavLink>
                    </li>
                    <li>
                      <NavLink className="dropdown-item" to="/contact">
                        Contact
                      </NavLink>
                    </li>
                    {authState?.user !== null && (
                      <li>
                        <button
                          className="dropdown-item"
                          type="button"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    )}
                  </ul>
                </div>
                {/* Regular links for medium and larger screens */}
                <div className="d-none d-md-flex align-items-center gap-15 mr-5">
                  <NavLink to="/" className="text-white">
                    Home
                  </NavLink>
                  <NavLink to="/product" className="text-white">
                    Our store
                  </NavLink>
                  <NavLink to="/my-orders" className="text-white">
                    My orders
                  </NavLink>
                  <NavLink to="/blogs" className="text-white">
                    Blogs
                  </NavLink>
                  <NavLink to="/contact" className="text-white">
                    Contact
                  </NavLink>
                  {authState?.user !== null && (
                    <button
                      className="border border-0 bg-transparent text-white text-uppercase"
                      type="button"
                      onClick={handleLogout}
                    >
                      Logout
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;
