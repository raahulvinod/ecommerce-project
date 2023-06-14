import ReactStars from 'react-rating-stars-component';
import { Link, useLocation } from 'react-router-dom';

const ProductCard = (props) => {
  const { grid } = props;
  // alert(grid);
  let location = useLocation();
  return (
    <>
      <div
        className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="/images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src="/images/cam1.avif" alt="products" className="img-fluid" />
            <img src="/images/cam2.avif" alt="products" className="img-fluid" />
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
              <Link>
                <img src="images/prodcompare.svg" alt="compare" />
              </Link>
              <Link>
                <img src="images/view.svg" alt="view" />
              </Link>
              <Link>
                <img src="images/add-cart.svg" alt="addcart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
      <div
        className={`${location.pathname === '/store' ? `gr-${grid}` : 'col-3'}`}
      >
        <Link className="product-card position-relative">
          <div className="wishlist-icon position-absolute">
            <Link>
              <img src="/images/wish.svg" alt="wishlist" />
            </Link>
          </div>
          <div className="product-image">
            <img src="/images/cam1.avif" alt="products" className="img-fluid" />
            <img src="/images/cam2.avif" alt="products" className="img-fluid" />
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
              <Link>
                <img src="images/prodcompare.svg" alt="compare" />
              </Link>
              <Link>
                <img src="images/view.svg" alt="view" />
              </Link>
              <Link>
                <img src="images/add-cart.svg" alt="addcart" />
              </Link>
            </div>
          </div>
        </Link>
      </div>
    </>
  );
};

export default ProductCard;
