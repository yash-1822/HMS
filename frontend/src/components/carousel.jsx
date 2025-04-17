import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1600,
  };

  return (
    <div className="w-full overflow-hidden py-4">
      <div>
        <Slider {...settings}>
          <div className="w-full h-[200px] sm:h-[180px] lg:h-[450px]">
            <img
              src="/images/banner1.jpg"
              alt="Hospital 1"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full h-[200px] sm:h-[180px] lg:h-[450px]">
            <img
              src="/images/banner2.jpg"
              alt="Hospital 2"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
          <div className="w-full h-[200px] sm:h-[180px] lg:h-[450px]">
            <img
              src="/images/banner3.jpg"
              alt="Hospital 3"
              className="w-full h-full object-cover rounded-lg"
            />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
