import React from 'react';
import CustomInput from '../components/CustomInput';

const Addblogcat = () => {
  return (
    <div>
      <h3 className="mb-3 title">Add Blog Category</h3>
      <div>
        <form action="">
          <CustomInput type="text" label="Enter blog category" />
          <button className="button rounded-3 my-4 px-3">
            Add Blog Category
          </button>
        </form>
      </div>
    </div>
  );
};

export default Addblogcat;
