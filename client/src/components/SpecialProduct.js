import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
  const { id, title, brand, totalrating, price, quantity, sold, images } =
    props;

  return (
    <div className="col-lg-4 col-md-6 col-sm-6 col-12 mb-3">
      <div className="special-product-card" style={{ cursor: 'pointer' }}>
        <div className="d-flex flex-column flex-sm-row gap-3">
          <div>
            <img src={images} className="img-fluid" alt="mobile" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">{brand}</h5>
            <h6 className="title">{title}</h6>
            <ReactStars
              value={totalrating}
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
            <div className="prod-count mt-3">
              <p>Products: {quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: (quantity / (quantity + sold)) * 100 + '%' }}
                  aria-valuenow={(quantity / (quantity + sold)) * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={quantity + sold}
                ></div>
              </div>
            </div>
            <Link className="button my-3 text-center" to={`/product/` + id}>
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
