import React from 'react';
import Slider from 'react-slick';
import { useNavigate } from 'react-router-dom';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const MainBannerSlider = ({ mainBannersData }) => {
  const navigate = useNavigate();

  const settings = {
    dots: true,
    infinite: true,
    autoplay: true,
    autoplaySpeed: 5000,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  return (
    <Slider {...settings}>
      {mainBannersData.map((banner, index) => (
        <div key={index}>
          <div className="main-banner position-relative">
            <img
              className="img-fluid rounded-3"
              src={banner.image}
              alt={banner.alt}
            />
            <div className="main-banner-content position-absolute">
              <h4>{banner.title}</h4>
              <h5>{banner.subtitle}</h5>
              <p>{banner.priceInfo}</p>
              <button
                className="button buy border-0 text-center"
                onClick={() => navigate(banner.link)}
              >
                BUY NOW
              </button>
            </div>
          </div>
        </div>
      ))}
    </Slider>
  );
};

export default MainBannerSlider;
