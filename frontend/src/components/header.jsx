import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { FaStar, FaMapMarkerAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom"; 

const Header = ({ hospitalId }) => {
  const [hospitalData, setHospitalData] = useState(null);
  const navigate = useNavigate(); 
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const openGoogleMaps = () => {
    if (!hospitalData?.Place_name) {
      alert("Hospital location not available");
      return;
    }
  
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
  
          // Google Maps Directions with Start Navigation Option
          let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(hospitalData.Place_name)}&travelmode=driving&dir_action=navigate`;
  
          window.open(googleMapsUrl, "_blank");
        },
        (error) => {
          console.error("Error getting location:", error);
          alert("Unable to fetch your location. Please enable location services.");
        }
      );
    } else {
      alert("Geolocation is not supported by your browser.");
    }
  };
  
  
  

  useEffect(() => {
    if (!hospitalId) return;

    const fetchHospitalData = async () => {
      try {
        const response = await fetch(
          `${backendUrl}/hospital/findHospital/${hospitalId}`
        );
        if (!response.ok) throw new Error("Failed to fetch hospital data");

        const data = await response.json();
        setHospitalData(data);
      } catch (error) {
        console.error("Error fetching hospital data:", error);
      }
    };

    fetchHospitalData();
  }, [hospitalId]);

  let hospitalImages = hospitalData?.images || [hospitalData?.Featured_Image || "/placeholder.jpg"];

  // Ensure at least 2 images exist to enable smooth looping
  if (hospitalImages.length === 1) {
    hospitalImages = [...hospitalImages, ...hospitalImages]; // Duplicate the single image
  }

  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 md:p-8 lg:p-10">
      <div className="flex flex-col lg:flex-row items-center gap-6">
        {/* Left Side - Hospital Image (Carousel) */}
        <div className="w-full lg:w-1/2 flex justify-center">
          <div className="w-full max-w-md sm:max-w-lg md:max-w-xl">
            <Swiper
              modules={[Autoplay, Navigation, Pagination]}
              autoplay={{ delay: 3000, disableOnInteraction: false }}
              loop={true}
              navigation={{ clickable: true }}
              pagination={{ clickable: true }}
              className="rounded-lg shadow-md"
            >
              {hospitalImages.map((image, index) => (
                <SwiperSlide key={index}>
                  <img
                    src={image}
                    alt={`Hospital ${index + 1}`}
                    className="w-full object-cover rounded-lg 
                      h-[180px] md:h-[280px] lg:h-[350px]"
                  />
                </SwiperSlide>
              ))}
            </Swiper>

            <style>
  {`
    .swiper-button-prev:after, .swiper-button-next:after {
      font-size: 20px; /* Default for mobile */
    }

    @media (min-width: 768px) { /* Tablet */
      .swiper-button-prev:after, .swiper-button-next:after {
        font-size: 24px;
      }
    }

    @media (min-width: 1024px) { /* Desktop */
      .swiper-button-prev:after, .swiper-button-next:after {
        font-size: 28px;
      }
    }

    @media (min-width: 1280px) { /* Large screens */
      .swiper-button-prev:after, .swiper-button-next:after {
        font-size: 32px;
      }
    }
  `}
</style>

            
          </div>
        </div>

        {/* Right Side - Hospital Details */}
        <div className="w-full lg:w-1/2 flex flex-col gap-4 text-center lg:text-left lg:px-4 md:px-4 px-0">
          <h2 className="text-lg  md:text-3xl font-bold text-gray-800">
            {hospitalData?.Place_name || "World-Class Healthcare Facility"}
          </h2>

          {/* Ratings & Location in Same Row */}
          <div className="flex md:justify-center justify-evenly lg:justify-start items-center gap-4 md:gap-8 w-full">
            


<div className="flex items-center gap-[2px] text-yellow-500">
<span className="text-gray-700 font-medium">Ratings:</span>
  {Array.from({ length: 5 }, (_, index) => {
    const fullStars = Math.floor(hospitalData?.ratings || 4.5);
    const hasHalfStar = (hospitalData?.ratings || 4.5) % 1 !== 0;
    
    return (
      <span key={index}>
        {index < fullStars ? (
          <FaStar className="text-lg sm:text-xl" />
        ) : index === fullStars && hasHalfStar ? (
          <FaStar className="text-lg sm:text-xl text-yellow-300" style={{ clipPath: "inset(0 50% 0 0)" }} />
        ) : (
          <FaStar className="text-lg sm:text-xl text-gray-300" />
        )}
      </span>
    );
  })}
   
</div>

            {/* Location Button */}
            <button onClick={openGoogleMaps} className="flex items-center gap-2 bg-gray-200 px-3 py-2 rounded-full text-gray-700 hover:bg-gray-300 transition-all">
              <FaMapMarkerAlt className="text-lg sm:text-xl text-red-500" />
              <span className="text-sm font-medium">Location</span>
            </button>
          </div>

          {/* Description */}
          <p className="text-gray-600 md:text-base text-sm ">
            {hospitalData?.description ||
              "We provide top-tier healthcare services with experienced doctors, modern facilities, and seamless appointment booking."}
          </p>

          {/* Buttons in the Same Row */}
          <div className="mt-4 flex justify-center lg:justify-start gap-4">
          <button
              onClick={() => navigate(`/hospital/${hospitalId}/doctors`)}
              className="whitespace-nowrap bg-green-600 text-white px-4 py-2 rounded-full font-medium text-sm md:text-base shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300 text-center"
            >
              Book Appointment
            </button>

            {/* About Button */}
            <button
              onClick={() => navigate(`/hospital/${hospitalId}/about`)}
              className="whitespace-nowrap bg-blue-600 text-white px-4 py-2 rounded-full font-medium text-sm md:text-base shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-center"
            >
              About
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
