import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';
import prodcompare from '../images/prodcompare.svg';
import wish from '../images/wish.svg';
import cam1 from '../images/cam1.avif';
import cam2 from '../images/cam2.avif';
import addcart from '../images/add-cart.svg';
import view from '../images/view.svg';

const ProductCard = (props) => {
  const { grid } = props;
  let location = useLocation();
  return (
    <>
      <div
        className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}
      >
        <Link to="/product/:id" className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src={wish} alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={cam1} alt="products" className="img-fluid" />
            <img src={cam2} alt="products" className="img-fluid" />
          </div>
          <div className="product-details">
            <h6 className="brand">FUJIFILM</h6>
            <h5 className="product-title">
              FUJIFILM X-T3 Mirrorless Camera X-T3
            </h5>
            <ReactStars
              value={4}
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
              1 Camera Body with XF 16-80mm Lens, Rechargeable Battery, USB
              Cable, AC Power Adapter, Headphone Adapter, Shoulder Strap
            </p>
            <p className="price">₹ 999.00</p>
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
      <div
        className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}
      >
        <Link to="/product/:id" className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <button className="border-0 bg-transparent">
              <img src="/images/wish.svg" alt="wishlist" />
            </button>
          </div>
          <div className="product-image">
            <img src={cam1} alt="products" className="img-fluid" />
            <img src={cam2} alt="products" className="img-fluid" />
          </div>
          <div className="product-details">
            <h6 className="brand">FUJIFILM</h6>
            <h5 className="product-title">
              FUJIFILM X-T3 Mirrorless Camera X-T3
            </h5>
            <ReactStars
              value={4}
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
            <p className={`description ${grid === 12 ? 'd-block' : 'd-none'}`}>
              1 Camera Body with XF 16-80mm Lens, Rechargeable Battery, USB
              Cable, AC Power Adapter, Headphone Adapter, Shoulder Strap
            </p>
            <p className="price">₹ 999.00</p>
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
    </>
  );
};

export default ProductCard;
