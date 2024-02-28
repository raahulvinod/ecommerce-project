import { useDispatch } from 'react-redux';
import ReactStars from 'react-rating-stars-component';

import prodcompare from '../images/prodcompare.svg';
import { addToWishlist } from '../features/products/productSlice';
import { useNavigate } from 'react-router-dom';
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { toast } from 'react-toastify';

const SimilarProduct = ({ productData }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
    toast.success('Item added to whishlist');
  };

  return (
    <>
      {productData &&
        productData.map((item, index) => {
          if (item.tags === 'popular') {
            return (
              <div key={index} className="col-lg-3 col-md-4 col-sm-6 col-6">
                <div
                  className="product-card position-relative mb-3"
                  style={{ cursor: 'pointer' }}
                >
                  <div className="wishlist-icon position-absolute">
                    <button
                      className="border-0 bg-transparent"
                      onClick={() => addToWish(item?._id)}
                    >
                      <img src={wish} alt="wishlist" />
                    </button>
                  </div>

                  <div
                    className="product-image"
                    onClick={() => navigate(`/product/${item?._id}`)}
                  >
                    <img
                      src={item?.images[0]?.url}
                      alt="products"
                      className="img-fluid"
                    />
                    <img
                      src={item?.images[1]?.url}
                      alt="products"
                      className="img-fluid"
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
                        <img
                          onClick={() => navigate(`/product/${item?._id}`)}
                          src={view}
                          alt="view"
                        />
                      </button>
                      {/* <button className="border-0 bg-transparent">
                        <img src={addcart} alt="addcart" />
                      </button> */}
                    </div>
                  </div>
                </div>
              </div>
            );
          }
        })}
    </>
  );
};

export default SimilarProduct;
