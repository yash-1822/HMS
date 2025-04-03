

// import React,{useState,useEffect} from 'react';
// import { assets } from '../assets/assets';

// const Header = ({hospitalId}) => {

//   const [hospitalData, setHospitalData] = useState(null);

//   useEffect(() => {
//     if (!hospitalId) return;

//     const fetchHospitalData = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/hospital/findHospital/${hospitalId}`);
//         if (!response.ok) throw new Error("Failed to fetch hospital data");

//         const data = await response.json();
//         setHospitalData(data);
//       } catch (error) {
//         console.error("Error fetching hospital data:", error);
//       }
//     };

//     fetchHospitalData();
//   }, [hospitalId]);


//   return (
//     <div className='flex flex-col md:flex-row items-center bg-green-500 rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-[0.4vw]'>
//       {/* Left Section - Heading & Text */}
//       <div className="md:w-1/2 flex flex-col items-start gap-4 text-center md:text-left">
//         <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
//           Book Appointment <br /> With Trusted Doctors
//         </p>
//         <div className="flex items-center gap-3 text-white text-sm font-light">
//           <img className='w-24' src={assets.group_profiles} alt="Profiles" />
//           <p>
//             Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
//             schedule your appointment hassle-free.
//           </p>
//         </div>
//         <a href="#speciality" className='flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 text-sm font-medium mt-4 hover:scale-105 transition-all duration-300 shadow-md'>
//           Book Appointment <img className='w-3' src={assets.arrow_icon} alt="Arrow" />
//         </a>
//       </div>

//       {/* Right Section - Image */}
//       <div className="md:w-1/2 h-full flex justify-center items-center mt-6 mb-0 md:mt-0">
//         <img className='w-full h-full max-w-sm md:max-w-md lg:max-w-lg justify-center rounded-lg shadow-lg object-cover' src={hospitalData.Featured_Image} alt="Doctor Consultation" />
//       </div>
//     </div>
//   );
// };

// export default Header;


// import React, { useState, useEffect } from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import { Autoplay, Navigation, Pagination } from "swiper/modules";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import { FaStar, FaMapMarkerAlt } from "react-icons/fa";

// const Header = ({ hospitalId }) => {
//   const [hospitalData, setHospitalData] = useState(null);

//   useEffect(() => {
//     if (!hospitalId) return;

//     const fetchHospitalData = async () => {
//       try {
//         const response = await fetch(
//           `http://localhost:8000/hospital/findHospital/${hospitalId}`
//         );
//         if (!response.ok) throw new Error("Failed to fetch hospital data");

//         const data = await response.json();
//         setHospitalData(data);
//       } catch (error) {
//         console.error("Error fetching hospital data:", error);
//       }
//     };

//     fetchHospitalData();
//   }, [hospitalId]);

//   let hospitalImages = hospitalData?.images || [hospitalData?.Featured_Image || "/placeholder.jpg"];

//   // Ensure at least 2 images exist to enable smooth looping
//   if (hospitalImages.length === 1) {
//     hospitalImages = [...hospitalImages, ...hospitalImages]; // Duplicate the single image
//   }

//   return (
//     <div className="bg-white shadow-lg rounded-lg overflow-hidden p-6 md:p-8 lg:p-10">
//       <div className="flex flex-col lg:flex-row items-center gap-6">
//         {/* Left Side - Hospital Image (Carousel) */}
//         <div className="w-full lg:w-1/2 flex justify-center">
//           <div className="w-full max-w-md sm:max-w-lg">
//             <Swiper
//               modules={[Autoplay, Navigation, Pagination]}
//               autoplay={{ delay: 3000, disableOnInteraction: false }}
//               loop={true}
//               navigation
//               pagination={{ clickable: true }}
//               className="rounded-lg shadow-md"
//             >
//               {hospitalImages.map((image, index) => (
//                 <SwiperSlide key={index}>
//                   <img
//                     src={image}
//                     alt={`Hospital ${index + 1}`}
//                     className="w-full h-[250px] sm:h-[300px] md:h-[350px] object-cover rounded-lg"
//                   />
//                 </SwiperSlide>
//               ))}
//             </Swiper>
//           </div>
//         </div>

//         {/* Right Side - Hospital Details */}
//         <div className="w-full lg:w-1/2 flex flex-col gap-4 text-center lg:text-left px-4">
//           <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-800">
//             {hospitalData?.name || "World-Class Healthcare Facility"}
//           </h2>

//           {/* Ratings */}
//           <div className="flex items-center justify-center lg:justify-start gap-2 text-yellow-500">
//             <FaStar className="text-lg sm:text-xl" />
//             <span className="text-lg font-semibold">{hospitalData?.ratings || "4.5"}</span>
//             <span className="text-gray-500 text-sm">(Based on reviews)</span>
//           </div>

//           {/* Location */}
//           <div className="flex items-center justify-center lg:justify-start gap-2 text-gray-600">
//             <FaMapMarkerAlt className="text-lg sm:text-xl text-red-500" />
//             <span className="text-lg">{hospitalData?.location || "Location not available"}</span>
//           </div>

//           {/* Description */}
//           <p className="text-gray-600 text-base sm:text-lg leading-relaxed">
//             {hospitalData?.description ||
//               "We provide top-tier healthcare services with experienced doctors, modern facilities, and seamless appointment booking."}
//           </p>

//           {/* Buttons - Book Appointment & Contact Us */}
//           <div className="mt-4 flex flex-col sm:flex-row justify-center lg:justify-start gap-4">
//             <a
//               href="#appointment"
//               className="flex-1 sm:flex-none sm:w-40 bg-green-600 text-white px-5 py-3 rounded-full font-medium text-sm md:text-base shadow-md hover:bg-green-700 hover:scale-105 transition-all duration-300 text-center"
//             >
//               Book Appointment
//             </a>
//             <a
//               href="#contact"
//               className="flex-1 sm:flex-none sm:w-40 bg-blue-600 text-white px-5 py-3 rounded-full font-medium text-sm md:text-base shadow-md hover:bg-blue-700 hover:scale-105 transition-all duration-300 text-center"
//             >
//               Contact Us
//             </a>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Header;





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
  // const openGoogleMaps = () => {
  //   if (!hospitalData?.Place_name) {
  //     alert("Hospital location not available");
  //     return;
  //   }
  
  //   if (navigator.geolocation) {
  //     navigator.geolocation.getCurrentPosition(
  //       (position) => {
  //         const { latitude, longitude } = position.coords;
  
  //         // Use Google Maps Directions Mode
  //         let googleMapsUrl = `https://www.google.com/maps/dir/?api=1&origin=${latitude},${longitude}&destination=${encodeURIComponent(hospitalData.Place_name)}&travelmode=driving`;
  
  //         window.open(googleMapsUrl, "_blank");
  //       },
  //       (error) => {
  //         console.error("Error getting location:", error);
  //         alert("Unable to fetch your location. Please enable location services.");
  //       }
  //     );
  //   } else {
  //     alert("Geolocation is not supported by your browser.");
  //   }
  // };


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
          `http://localhost:8000/hospital/findHospital/${hospitalId}`
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
