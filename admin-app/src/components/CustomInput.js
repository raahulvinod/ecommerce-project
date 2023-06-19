import React from 'react';

const CustomInput = (props) => {
  const { type, label, i_id, i_class } = props;
  return (
    <div>
      <input
        type={type}
        className={`form-control rounded-left ${i_class}`}
        placeholder={label}
        id={i_id}
        required
      />
    </div>
  );
};

export default CustomInput;
