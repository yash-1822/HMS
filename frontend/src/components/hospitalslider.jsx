// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";

// const hospitals = [
//   { id: 1, name: "City General Hospital", image: "/images/hospital1.png" },
//   { id: 2, name: "Central Medical Center", image: "/images/hospital2.png" },
//   { id: 3, name: "Riverside Health Institute", image: "/images/hospital3.png" },
// ];

// const HospitalSlider = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 3,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 2 } },
//       { breakpoint: 768, settings: { slidesToShow: 1 } },
//     ],
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
//         Featured Hospitals
//       </h2>
//       <Slider {...settings}>
//         {hospitals.map((hospital) => (
//           <div key={hospital.id} className="p-4">
//             <div className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
//               <img
//                 src={hospital.image}
//                 alt={hospital.name}
//                 className="w-full object-cover h-48"
//               />
//               <div className="p-4">
//                 <h3 className="text-lg font-semibold text-gray-800">
//                   {hospital.name}
//                 </h3>
//               </div>
//             </div>
//           </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default HospitalSlider;

import { useNavigate } from "react-router-dom";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const hospitals = [
  { id: 1, name: "City General Hospital", image: "/images/hospital1.png" },
  { id: 2, name: "Central Medical Center", image: "/images/hospital2.png" },
  { id: 3, name: "Riverside Health Institute", image: "/images/hospital3.png" },
];

const HospitalSlider = () => {
  const navigate = useNavigate(); // Added useNavigate for redirection

  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 768, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        Featured Hospitals
      </h2>
      <Slider {...settings}>
        {hospitals.map((hospital) => (
          <div key={hospital.id} className="p-4" onClick={() => navigate("/hospital/:id/hospitalBody")}> {/* Added onClick event for redirection */}
            <div className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl">
              <img
                src={hospital.image}
                alt={hospital.name}
                className="w-full object-cover h-48"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold text-gray-800">
                  {hospital.name}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default HospitalSlider;
