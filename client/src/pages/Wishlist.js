import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import Meta from '../components/Meta';
import BreadCrumb from '../components/BreadCrumb';
import Container from '../components/Container';
import { getUserProductWishlist } from '../features/user/userSlice';
import { addToWishlist } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import Loader from '../components/Loader';

const Wishlist = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    getWishlistFromDb();
  }, []);

  const getWishlistFromDb = () => {
    dispatch(getUserProductWishlist())
      .then(() => setLoading(false))
      .catch((error) => {
        console.error('Error fetching wishlist:', error);
        setLoading(false);
      });
  };

  const wishlistState = useSelector((state) => state?.auth?.wishlist?.wishlist);

  const removeFromWislist = (id) => {
    dispatch(addToWishlist(id));
    setTimeout(() => {
      dispatch(getUserProductWishlist());
    }, 300);
  };

  return (
    <>
      <Meta title="Wishlist" />
      <BreadCrumb title="Wishlist" />
      <Container class1="wishlist-wrapper home-wrapper-2 py-5">
        {loading ? (
          <Loader />
        ) : (
          <>
            <div className="row justify-content-center">
              <div className="col-md-6 col-lg-4">
                {wishlistState && wishlistState.length === 0 && (
                  <div className="text-center fs-3">No Items</div>
                )}
              </div>
            </div>
            <div className="row row-cols-2 row-cols-md-3 row-cols-lg-4 g-3">
              {wishlistState &&
                wishlistState?.map((item, index) => {
                  return (
                    <div className="col" key={index}>
                      <div className="wishlist-card position-relative">
                        <img
                          onClick={() => removeFromWislist(item?._id)}
                          src="images/cross.svg"
                          alt="cross"
                          className="position-absolute cross img-fluid"
                        />
                        <div
                          className="wishlist-card-image cursor-pointer"
                          onClick={() => navigate(`/product/${item?._id}`)}
                        >
                          <img
                            src={
                              item?.images[0].url
                                ? item?.images[0].url
                                : 'images/watch.jpg'
                            }
                            className="img-fluid"
                            alt="watch"
                          />
                        </div>
                        <div className="py-3 px-3">
                          <h5 className="title">{item?.title}</h5>
                          <h6 className="price">₹ {item?.price}</h6>
                        </div>
                      </div>
                      <div>
                        <button
                          className="button border-0"
                          onClick={() => navigate(`/product/${item?._id}`)}
                        >
                          View product
                        </button>
                      </div>
                    </div>
                  );
                })}
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default Wishlist;
