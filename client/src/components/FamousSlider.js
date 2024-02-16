import React from 'react';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FamousSlider = ({ famousItemsData, navigate }) => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
          infinite: true,
        },
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          infinite: true,
        },
      },
    ],
  };

  return (
    <div className="famous-slider-wrapper">
      <Slider {...settings}>
        {famousItemsData.map((item, index) => (
          <div
            key={index}
            className="famous-card"
            onClick={() => navigate('/product')}
          >
            <img
              src={item.imageSrc}
              alt="famous"
              className="img-fluid"
              style={{ maxWidth: '100%', height: 'auto' }}
            />
            <div className="famous-content position-absolute">
              <h5 className={`${item.color} fw-bold fs-6 mb-1`}>
                {item.title}
              </h5>
              <h6 className={`${item.color} fs-7 mb-2`}>{item.subTitle}</h6>
              <p className={`${item.color} fs-8 mb-0`}>{item.description}</p>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default FamousSlider;
