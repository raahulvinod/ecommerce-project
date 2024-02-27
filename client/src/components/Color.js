import React, { useState } from 'react';

const Color = ({ colorData, setColor }) => {
  const [selectedColor, setSelectedColor] = useState(null);

  const handleClick = (colorId) => {
    setColor(colorId);
    setSelectedColor(colorId);
  };

  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData.map((color, index) => (
            <li
              role="button"
              className={`border  ${
                selectedColor === color._id ? 'border-success border-2' : ''
              }`}
              onClick={() => handleClick(color._id)}
              style={{ backgroundColor: color.title }}
              key={index}
            ></li>
          ))}
      </ul>
    </>
  );
};

export default Color;
