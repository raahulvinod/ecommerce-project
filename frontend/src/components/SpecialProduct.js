import React from 'react';
import ReactStars from 'react-rating-stars-component';
import { Link } from 'react-router-dom';

const SpecialProduct = () => {
  return (
    <div className="col-6 mb-3">
      <div className="special-product-card">
        <div className="d-flex justify-content-between">
          <div>
            <img src="/images/mob1.avif" className="img-fluid" alt="mobile" />
          </div>
          <div className="special-product-content">
            <h5 className="brand">samsung</h5>
            <h6 className="title">Galaxy Note 10+ Mobile Phone...</h6>
            <ReactStars
              value={4}
              edit={false}
              count={5}
              size={24}
              activeColor="#ffd700"
            />
            <p className="price">
              <span className="red-p">₹30999</span>&nbsp;<strike>₹55000</strike>
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
              <p>Products: 5</p>
              <div className="progress">
                <div
                  className="progress-bar bg-danger"
                  role="progressbar"
                  style={{ width: '25%' }}
                  aria-valuenow="25"
                  aria-valuemin="0"
                  aria-valuemax="100"
                ></div>
              </div>
            </div>
            <Link className="button my-3">Add to cart</Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SpecialProduct;
