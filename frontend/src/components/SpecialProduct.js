import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = (props) => {
  const { id, title, brand, totalrating, price, quantity, sold, images } =
    props;

  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex gap-3">
          <div>
            <img
              src={images}
              className=""
              alt="mobile"
              height={250}
              width={250}
            />
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
            <p className="price">
              <span className="red-p">₹{price}</span>&nbsp;
              {/* <strike>₹55000</strike> */}
            </p>
            <div className="discount-till d-flex align-items-center gap-10">
              <p className="mb-0">
                <b>5 </b>days
              </p>
              <div className="d-flex gap-10 align-items-center">
                <span className="badge rounded-circle p-2">11</span>:
                <span className="badge rounded-circle p-2">11</span>:
                <span className="badge rounded-circle p-2">11</span>
              </div>
            </div>
            <div className="prod-count mt-3">
              <p>Products: {quantity}</p>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: (quantity / quantity + sold) * 100 + '%' }}
                  aria-valuenow={(quantity / quantity + sold) * 100}
                  aria-valuemin={quantity}
                  aria-valuemax={sold + quantity}
                ></div>
              </div>
            </div>
            <Link className="button my-3" to={`/product/` + id}>
              View
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
