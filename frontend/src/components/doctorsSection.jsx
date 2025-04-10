// import Slider from "react-slick";
// import "slick-carousel/slick/slick.css";
// import "slick-carousel/slick/slick-theme.css";
// import { useState,useEffect } from "react";

// const DoctorsSection = () => {
//   const settings = {
//     dots: true,
//     infinite: true,
//     speed: 500,
//     slidesToShow: 4,
//     slidesToScroll: 1,
//     autoplay: true,
//     autoplaySpeed: 3000,
//     responsive: [
//       { breakpoint: 1024, settings: { slidesToShow: 3 } },
//       { breakpoint: 768, settings: { slidesToShow: 2 } },
//       { breakpoint: 480, settings: { slidesToShow: 1 } },
//     ],
//   };

//   const [doctorss,setDoctorss] = useState([]);

//   console.log("doctors is",doctorss)
  
//        useEffect(() => {
//           const fetchDoctors = async () => {
//             try {
//               const response = await fetch("http://localhost:8000/doctors/getdoctors"); // Ensure backend is running
//               const data = await response.json();
//               console.log(data)
//               setDoctorss(data);
//             } catch (error) {
//               console.error("Error fetching doctors:", error);
//             }
//           };
      
//           fetchDoctors();
//         }, []);

//   const doctors = [
//     { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", image: "/images/doc1.png" },
//     { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrician", image: "/images/doc2.png" },
//     { id: 3, name: "Dr. Mike Johnson", specialty: "Neurologist", image: "/images/doc3.png" },
//     { id: 4, name: "Dr. Sarah Brown", specialty: "Dermatologist", image: "/images/doc4.png" },
//     { id: 5, name: "Dr. Emily Davis", specialty: "Oncologist", image: "/images/doc5.png" },
//   ];

//   return (
//     <div className="container mx-auto py-10 px-4">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-8">Our Expert Doctors</h2>
//       <Slider {...settings}>
//         {doctorss.map((doctor) => (
          // <div key={doctor.id} className="px-2">
          //   <a
          //     href={`/appointment/${doctor.id}`}
          //     className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200"
          //   >
          //     <div className="p-6 text-center">
          //       <img
          //         src={doctor.doctor_image || "/placeholder.svg"}
          //         alt={doctor.name}
          //         className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
          //       />
          //       <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
          //       <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
          //     </div>
          //   </a>
          // </div>
//         ))}
//       </Slider>
//     </div>
//   );
// };

// export default DoctorsSection;







// import { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DoctorsSection = ({ selectedBodyPart, searchQuery }) => {
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [filteredDoctors, setFilteredDoctors] = useState([]);
//   const [seeMore, setSeeMore] = useState(false);
//   const sliderRef = useRef(null);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/doctors/getdoctors");
//         const data = await response.json();
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, []);

  

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

//   return (
//     <div className="container mx-auto py-10">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
//         {selectedBodyPart === "all"
//           ? "All Doctors"
//           : selectedBodyPart
//           ? `Doctors for ${selectedBodyPart}`
//           : "Featured Doctors"}
//       </h2>

//       {!seeMore ? (
//         // Slider Mode
//         <div className="relative">
//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
//             onClick={() => sliderRef.current.slickPrev()}
//           >
//             <FaChevronLeft />
//           </button>

//           <Slider ref={sliderRef} {...settings}>
//             {doctors.length > 0 ? (
//               doctors.map((doctor) => (
//                 <div key={doctor._id} className="px-4 py-5">
//                   <div
//                     className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer h-[345px] flex flex-col justify-between"
//                     onClick={() => navigate(`/appointment/${doctor._id}`)}
//                   >
//                     <img
//                       src={doctor.doctor_image || "/images/doc_placeholder.png"}
//                       alt={doctor.name}
//                       className="w-full object-cover h-40 rounded-t-lg"
//                       onError={(e) => (e.target.src = "/images/doc_placeholder.png")}
//                     />
//                     <div className="px-4 py-2 flex flex-col justify-between flex-grow">
//                       <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
//                       <p className="text-sm text-green-600 font-medium">{doctor.specialty}</p>
//                     </div>
//                   </div>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-600">No doctors found for {selectedBodyPart}.</p>
//             )}
//           </Slider>

//           <button
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10"
//             onClick={() => sliderRef.current.slickNext()}
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       ) : (
//         // Grid View Mode (See More)
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor) => (
//               <div
//                 key={doctor._id}
//                 onClick={() => navigate(`/appointment/${doctor._id}`)}
//                 className="cursor-pointer bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col justify-between"
//               >
//                 <img
//                   src={doctor.doctor_image || "/images/doc_placeholder.png"}
//                   alt={doctor.name}
//                   className="w-full object-cover h-40 rounded-t-lg"
//                   onError={(e) => (e.target.src = "/images/doc_placeholder.png")}
//                 />
//                 <div className="mt-3">
//                   <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
//                   <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
//                 </div>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">
//               No doctors found for {selectedBodyPart}.
//             </p>
//           )}
//         </div>
//       )}

//       {/* Button placed BELOW the cards */}
//       <div className="text-center mt-6">
//         <button
//           className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
//           onClick={() => setSeeMore(!seeMore)}
//         >
//           {seeMore ? "See Less" : "See More"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorsSection;


// /hospital/:hospitalId/doctors/:doctorId


// import { useState, useEffect, useRef } from "react";
// import Slider from "react-slick";
// import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
// import { useNavigate } from "react-router-dom";

// const DoctorsSection = ({ selectedBodyPart, searchQuery,city }) => {
//   const navigate = useNavigate();
//   const [doctors, setDoctors] = useState([]);
//   const [seeMore, setSeeMore] = useState(false);
//   const sliderRef = useRef(null);
//   const [filteredDoctors,setFilteredDoctors] = useState([]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {

//         console.log("city from doctors section is",city)
//         const cityParam = city && city.trim() !== "" ? city : "all";
//         const response = await fetch(`http://localhost:8000/doctors/getDoctorsByCity/${cityParam}`);
//         const data = await response.json();
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
//     fetchDoctors();
//   }, [city]);


  
//   useEffect(() => {
//     console.log("iam in")
//     if (!doctors || doctors.length === 0) return;
//     let filtered = [...doctors];  // Ensure immutability
//     console.log("filt are",filtered)
//     console.log("search is:",searchQuery)

//     if (searchQuery?.trim() !== "") {
//       filtered = filtered.filter((doctor) =>
//         doctor.name.toLowerCase().includes(searchQuery?.toLowerCase()) || // Doctor name
//         doctor.specialty?.toLowerCase().includes(searchQuery?.toLowerCase()) || // Specialty
//         doctor.qualification?.toLowerCase().includes(searchQuery?.toLowerCase()) // Qualification
//       );
//     }
  
//     setFilteredDoctors(filtered);
//   }, [searchQuery, doctors]); // Depend on `doctors` too!
  
// console.log("filters are:",filteredDoctors)
 

//   const settings = {
//     infinite: true,
//     speed: 500,
//     slidesToShow: 5,
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

//   return (
//     <div className="container mx-auto">
//       <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
//         {selectedBodyPart === "all"
//           ? "All Doctors"
//           : selectedBodyPart
//           ? `Doctors for ${selectedBodyPart}`
//           : "Featured Doctors"}
//       </h2>

//       {!seeMore ? (
//         // Slider Mode
//         <div className="relative">
//           <button
//             className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 hidden md:block"
//             onClick={() => sliderRef.current.slickPrev()}
//           >
//             <FaChevronLeft />
//           </button>

//           <Slider ref={sliderRef} {...settings}>
//             {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor) => (
//                 <div key={doctor.id} className="px-2">
//                   <a
//                     href={`/appointment/${doctor.id}`}
//                     className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200"
//                   >
//                     <div className="p-5 text-center">
//                       <img
//                         src={doctor.doctor_image || "/placeholder.svg"}
//                         alt={doctor.name}
//                         className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
//                       />
//                       <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
//                       <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
//                     </div>
//                   </a>
//                 </div>
//               ))
//             ) : (
//               <p className="text-center text-gray-600">No doctors found for {selectedBodyPart}.</p>
//             )}
//           </Slider>

//           <button
//             className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 hidden md:block"
//             onClick={() => sliderRef.current.slickNext()}
//           >
//             <FaChevronRight />
//           </button>
//         </div>
//       ) : (
//         // Grid View Mode (See More)
//         <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
//           {filteredDoctors.length > 0 ? (
//             filteredDoctors.map((doctor) => (
//               <div key={doctor.id} className="px-2">
//                 <a
//                   href={`/appointment/${doctor.id}`}
//                   className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200"
//                 >
//                   <div className="p-4 text-center">
//                     <img
//                       src={doctor.doctor_image || "/placeholder.svg"}
//                       alt={doctor.name}
//                       className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
//                     />
//                     <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
//                     <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
//                   </div>
//                 </a>
//               </div>
//             ))
//           ) : (
//             <p className="text-center text-gray-600 col-span-full">
//               No doctors found for {selectedBodyPart}.
//             </p>
//           )}
//         </div>
//       )}

//       {/* Button placed BELOW the cards */}
//       <div className="text-center mt-6 mb-4">
//         <button
//           className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
//           onClick={() => setSeeMore(!seeMore)}
//         >
//           {seeMore ? "See Less" : "See More"}
//         </button>
//       </div>
//     </div>
//   );
// };

// export default DoctorsSection;





import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorsSection = ({ selectedBodyPart, searchQuery, city }) => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const sliderRef = useRef(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("city from doctors section is", city);
        const cityParam = city && city.trim() !== "" ? city : "all";
        const response = await fetch(`http://localhost:8000/doctors/getDoctorsByCity/${cityParam}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [city]);

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;
    let filtered = [...doctors];

    if (searchQuery?.trim() !== "") {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        doctor.qualification?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleDoctorClick = (hospitalId, doctorId) => {
    navigate(`/hospital/${hospitalId}/doctors/${doctorId}`);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
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

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        {selectedBodyPart === "all"
          ? "All Doctors"
          : selectedBodyPart
          ? `Doctors for ${selectedBodyPart}`
          : "Featured Doctors"}
      </h2>

      {!seeMore ? (
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 hidden md:block"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {filteredDoctors.length > 0 ? (
              filteredDoctors.map((doctor) => (
                <div key={doctor.id} className="px-2">
                  <div
                    onClick={() => handleDoctorClick(doctor.hospital._id, doctor._id)}
                    className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200 cursor-pointer"
                  >
                    <div className="p-5 text-center">
                      <img
                        src={doctor.doctor_image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No doctors found for {selectedBodyPart}.</p>
            )}
          </Slider>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-gray-800 text-white p-3 rounded-full shadow-lg hover:bg-gray-700 z-10 hidden md:block"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="px-2">
                <div
                  onClick={() => handleDoctorClick(doctor.hospital._id, doctor._id)}
                  className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200 cursor-pointer"
                >
                  <div className="p-4 text-center">
                    <img
                      src={doctor.doctor_image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No doctors found for {selectedBodyPart}.
            </p>
          )}
        </div>
      )}

      <div className="text-center mt-6 mb-4">
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

export default DoctorsSection;

