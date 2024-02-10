import React from 'react';
import BreadCrumb from '../components/BreadCrumb';
import Meta from '../components/Meta';
import Container from '../components/Container';

const ShippingPolicy = () => {
  return (
    <div>
      <Meta title="Shipping Policy" />
      <BreadCrumb title="Shipping Policy" />
      <Container className="policy-wrapper py-5 home-wrapper-2">
        <div className="row">
          <div className="col-12">
            <div className="policy"></div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default ShippingPolicy;
