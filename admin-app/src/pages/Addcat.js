import React from 'react';
import CustomInput from '../components/CustomInput';

const Addcat = () => {
  return (
    <div>
      <h3 className="mb-3 title">Add Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter category" />
          <button className="btn btn-success border-0 rounded-3 my-4">
            Add Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
