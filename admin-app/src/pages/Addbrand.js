import React from 'react';
import CustomInput from '../components/CustomInput';

const Addbrand = () => {
  return (
    <div>
      <h3 className="mb-3 title">Add Brand</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter brand" />
          <button className="button border-0  my-3">Add brand</button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
