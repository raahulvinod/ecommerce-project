import React from 'react';
import CustomInput from '../components/CustomInput';

const Addcat = () => {
  return (
    <div>
      <h3 className="mb-3 title">Add Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter category" />
          <button className="button my-3 px-3">Add Category</button>
        </form>
      </div>
    </div>
  );
};

export default Addcat;
