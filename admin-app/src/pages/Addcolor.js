import React from 'react';
import CustomInput from '../components/CustomInput';

const Addcolor = () => {
  return (
    <div>
      <h3 className="mb-3 title">Add Color</h3>
      <div>
        <form action="">
          <CustomInput type="color" label="Enter color" />
          <button className="button my-4 px-3">Add Color</button>
        </form>
      </div>
    </div>
  );
};

export default Addcolor;
