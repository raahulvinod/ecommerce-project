import ReactStars from 'react-rating-stars-component';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';
import { addToWishlist } from '../features/products/productSlice';

const ProductCard = ({ grid, data }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  let location = useLocation();

  const addToWish = (id) => {
    dispatch(addToWishlist(id));
  };

  return (
    <>
      {data?.map((item, index) => {
        return (
          <div
            key={index}
            className={`${
              location.pathname === '/product'
                ? `gr-${grid} col-md-6 col-sm-5 col-6`
                : 'col-3'
            }`}
          >
            <div className="product-card position-relative">
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
                onClick={() => navigate('/product/' + item?._id)}
                style={{ cursor: 'pointer' }}
              >
                <img
                  src={item?.images[0]?.url}
                  alt="products"
                  width={220}
                  height={200}
                />
                <img
                  src={item?.images[1]?.url}
                  alt="products"
                  width={220}
                  height={200}
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
                <p
                  className={`description ${
                    grid === 12 ? 'd-block' : 'd-none'
                  }`}
                  dangerouslySetInnerHTML={{ __html: item.description }}
                ></p>
                <p className="price">₹{item.price}</p>
              </div>
              <div className="action-bar position-absolute">
                <div className="d-flex flex-column gap-15">
                  <button className="border-0 bg-transparent">
                    <img src={prodcompare} alt="compare" />
                  </button>
                  <button className="border-0 bg-transparent">
                    <img
                      src={view}
                      alt="view"
                      onClick={() => navigate('/product/' + item?._id)}
                    />
                  </button>
                  <Link
                    to={'/product/' + item?._id}
                    className="border-0 bg-transparent"
                  >
                    <img src={addcart} alt="addcart" />
                  </Link>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
};

export default ProductCard;
