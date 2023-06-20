import React from 'react';
import CustomInput from '../components/CustomInput';

const Addbrand = () => {
  return (
    <div>
      <h3 className="mb-3">Add Brand</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter brand" />
          <button className="btn btn-success border-0 rounded-3 my-4">
            Add brand
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addbrand;
