import React from 'react';

const Color = ({ colorData, setcolor }) => {
  return (
    <>
      <ul className="colors ps-0">
        {colorData &&
          colorData?.map((color, index) => {
            return (
              <li
                onClick={() => setcolor(color?._id)}
                style={{ backgroundColor: color?.title }}
                key={index}
              ></li>
            );
          })}
      </ul>
    </>
  );
};

export default Color;
