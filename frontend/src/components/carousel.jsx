import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const Carousel = () => {
  const settings = {
    dots: false,
    infinite: true,
    speed: 400,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 4000,
  };

  return (
    <div className="w-full overflow-hidden bg-blue-50 py-8">
      <div className="max-w-screen-xl mx-auto">
        <Slider {...settings}>
          <div className="w-full h-[100px] sm:h-[100px] lg:h-[100px]">
            <img src="/images/carousel1.jpg" alt="Hospital 1" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-full h-[100px] sm:h-[100px] lg:h-[100px]">
            <img src="/images/carousel2.jpg" alt="Hospital 2" className="w-full h-full object-cover rounded-lg" />
          </div>
          <div className="w-full h-[100px] sm:h-[100px] lg:h-[100px]">
            <img src="/images/carousel3.jpg" alt="Hospital 3" className="w-full h-full object-cover rounded-lg" />
          </div>
        </Slider>
      </div>
    </div>
  );
};

export default Carousel;
