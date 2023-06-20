import React from 'react';
import CustomInput from '../components/CustomInput';

const Addcolor = () => {
  return (
    <div>
      <h3 className="mb-3">Add Color</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Enter color" />
          <button className="btn btn-success border-0 rounded-3 my-4">
            Add Color
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
