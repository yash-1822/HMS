// import { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// const HospitalSlider = ({ selectedBodyPart }) => {
//   const [hospitals, setHospitals] = useState([]);
//   const [filteredHospitals, setFilteredHospitals] = useState([]);
//   const [seeMore, setSeeMore] = useState(false);
//   const sliderRef = useRef(null);

//   console.log(selectedBodyPart)

//   useEffect(() => {
//     const fetchHospitals = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/hospital/hospitals/eluru");
//         const data = await response.json();
//         setHospitals(data);
//       } catch (error) {
//         console.error("Error fetching hospitals:", error);
//       }
//     };
//     fetchHospitals();
//   }, []);

//   const getFirstTiming = (hours) => {
//     if (!hours) return "Timing info not available";
//     const matches = hours.match(/\[(.*?)\]/);
//     return matches ? matches[1] : "Timing info not available";
//   };

//   // Filter hospitals based on the selected body part\
//   console.log("filteredHospitals",filteredHospitals)
//   useEffect(() => {
//     if (!selectedBodyPart) {
//       setFilteredHospitals(hospitals);
//     } else {
//       const filtered = hospitals.filter((hospital) =>
//         hospital.Speciality.some(speciality => speciality.toLowerCase() === selectedBodyPart)
//       );
//       setFilteredHospitals(filtered);
//     }
//   }, [selectedBodyPart, hospitals]);

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     arrows: false,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 640, settings: { slidesToShow: 1 } },
//     ],
//   };

//   const renderStars = (score) => {
//     const fullStars = Math.floor(score);
//     const hasHalfStar = score % 1 !== 0;
//     return (
//       <>
//         {[...Array(fullStars)].map((_, i) => <AiFillStar key={i} className="text-green-500 text-xl" />)}
//         {hasHalfStar && <AiOutlineStar className="text-green-400 text-xl" />}
//       </>
//     );
//   };

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
//         {selectedBodyPart ? `Hospitals for ${selectedBodyPart}` : "Featured Hospitals"}
//       </h2>

//       {!seeMore ? (
//         <div className="relative">
//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
//             onClick={() => sliderRef.current.slickPrev()}
//           >
//             <FaChevronLeft />
//           </button>

//           <Slider ref={sliderRef} {...settings}>
//             {filteredHospitals.map((hospital) => (
//               <div key={hospital._id} className="p-4">
//                 <div className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer h-[340px] flex flex-col justify-between">
//                   <img
//                     src={hospital.Featured_Image || "/images/hospital1.png"}
//                     alt={hospital.Place_name}
//                     className="w-full object-cover h-40 rounded-t-lg"
//                     onError={(e) => (e.target.src = "/images/hospital1.png")}
//                   />
//                   <div className="p-4 flex flex-col justify-between flex-grow">
//                     <h3 className="text-lg font-semibold text-gray-800">{hospital.Place_name}</h3>
//                     <p className="text-sm text-gray-600 line-clamp-2">{hospital.Address1}</p>
//                     <div className="flex mt-2">
//                       <span className="text-md font-semibold text-gray-800 -mt-[3px]">Ratings:</span>
//                       {renderStars(hospital.Total_score)}
//                     </div>
//                     <p className="text-sm text-gray-600 mt-2">⏰ {getFirstTiming(hospital.Hours)}</p>
//                   </div>
//                 </div>
//               </div>
//             ))}
//           </Slider>

//           <button
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
//             onClick={() => sliderRef.current.slickNext()}
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       ) : (
//         <p className="text-center text-gray-600">No hospitals found for {selectedBodyPart}.</p>
//       )}
//     </div>
//   );
// };

// export default HospitalSlider;



import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";

const HospitalSlider = ({ selectedBodyPart,searchQuery }) => {
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const sliderRef = useRef(null);

  console.log("searchquery is:",searchQuery);

  console.log("Selected Body Part:", selectedBodyPart);

  useEffect(() => {
    const fetchHospitals = async () => {
      try {
        const response = await fetch("http://localhost:8000/hospital/hospitals/eluru");
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      }
    };
    fetchHospitals();
  }, []);

  const getFirstTiming = (hours) => {
    if (!hours) return "Timing info not available";
    const matches = hours.match(/\[(.*?)\]/);
    return matches ? matches[1] : "Timing info not available";
  };

  // useEffect(() => {
  //   if (!selectedBodyPart || selectedBodyPart === "all") {
  //     setFilteredHospitals(hospitals); // Show all hospitals if "All" is selected
  //   } else {
  //     const filtered = hospitals.filter((hospital) =>
  //       hospital.Speciality.some(
  //         (speciality) => speciality.toLowerCase() === selectedBodyPart
  //       )
  //     );
  //     setFilteredHospitals(filtered);
  //   }
  // }, [selectedBodyPart, hospitals]);

  useEffect(() => {
    let filtered = hospitals;
  
    // Filter by selected body part
    if (selectedBodyPart && selectedBodyPart !== "all") {
      filtered = filtered.filter((hospital) =>
        hospital.Speciality.some(
          (speciality) => speciality.toLowerCase() === selectedBodyPart.toLowerCase()
        )
      );
    }
  
    // Filter by search query
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((hospital) =>
        hospital.Place_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.Speciality.some((speciality) =>
          speciality.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        hospital.Address1.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
  
    setFilteredHospitals(filtered);
  }, [selectedBodyPart, searchQuery, hospitals]);
  

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <AiFillStar key={i} className="text-green-500 text-xl" />
        ))}
        {hasHalfStar && <AiOutlineStar className="text-green-400 text-xl" />}
      </>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        {selectedBodyPart === "all"
          ? "All Hospitals"
          : selectedBodyPart
          ? `Hospitals for ${selectedBodyPart}`
          : "Featured Hospitals"}
      </h2>

      {!seeMore ? (
        // Slider Mode
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <div key={hospital._id} className="px-4 py-5">
                  <div 
                  className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer h-[345px] flex flex-col justify-between"
                  onClick={() => navigate(`/hospital/${hospital._id}`)}
                  >
                    <img
                      src={hospital.Featured_Image || "/images/hospital1.png"}
                      alt={hospital.Place_name}
                      className="w-full object-cover h-40 rounded-t-lg"
                      onError={(e) => (e.target.src = "/images/hospital1.png")}
                    />
                    <div className="px-4 py-2 flex flex-col justify-between flex-grow">
                      <h3 className="text-lg font-semibold text-gray-800">{hospital.Place_name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{hospital.Address1}</p>
                      <div className="mt-1">
    <span className="text-md font-semibold text-gray-800">Specialized in : </span>
    <span className="text-sm text-gray-600">
      {hospital.Speciality.length > 0 ? hospital.Speciality.join(", ") : "Not Available"}
    </span>
  </div>
                      <div className="flex mt-1">
                        <span className="text-md font-semibold text-gray-800 -mt-[3px]">Ratings:</span>
                        {renderStars(hospital.Total_score)}
                      </div>
                      
                      <p className="text-sm text-gray-600 mt-1">
                        ⏰ {getFirstTiming(hospital.Hours)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No hospitals found for {selectedBodyPart}.</p>
            )}
          </Slider>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        // Grid View Mode (See More)
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div key={hospital._id}   className="bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col justify-between">
                <img
                  src={hospital.Featured_Image || "/images/hospital1.png"}
                  alt={hospital.Place_name}
                  className="w-full object-cover h-40 rounded-t-lg"
                  onError={(e) => (e.target.src = "/images/hospital1.png")}
                />
                <div className="mt-3">
                  <h3 className="text-lg font-semibold text-gray-800">{hospital.Place_name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{hospital.Address1}</p>
                  <div className="mt-1">
    <span className="text-md font-semibold text-gray-800">Specialized in : </span>
    <span className="text-sm text-gray-600">
      {hospital.Speciality.length > 0 ? hospital.Speciality.join(", ") : "Not Available"}
    </span>
  </div>
                  <div className="flex mt-2">
                    <span className="text-md font-semibold text-gray-800 -mt-[3px]">Ratings:</span>
                    {renderStars(hospital.Total_score)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    ⏰ {getFirstTiming(hospital.Hours)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No hospitals found for {selectedBodyPart}.
            </p>
          )}
        </div>
      )}

      {/* Button placed BELOW the cards */}
      <div className="text-center mt-6">
        <button
          className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default HospitalSlider;

