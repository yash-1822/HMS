// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets } from "../assets/assets";
// import RelatedDoctors from '../components/RelatedDoctors';
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";
// import { useNavigate,useLocation } from "react-router-dom";

// const Appointment = () => {
//   const { doctorId } = useParams();
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   const [docInfo, setDocInfo] = useState(null);
//   const [availableDays, setAvailableDays] = useState([]);
// const [selectedDayIndex, setSelectedDayIndex] = useState(0);
// const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
// const [selectedSlotTime, setSelectedSlotTime] = useState("");
// const navigate = useNavigate(); 
// const location = useLocation();
// const [isAuthenticated, setIsAuthenticated] = useState(null);

// useEffect(() => {
//   const verifyToken = async () => {
//     try {
//       // const response = await fetch("http://localhost:8000/patient/verify-token", {
//       //   method: "GET",
//       //   credentials: "include", // Ensures cookies are sent
//       // });


//       const token = localStorage.getItem("authToken");

//         if (!token) {
//           throw new Error("Token not found");
//         }

//         const response = await fetch("http://localhost:8000/patient/verify-token", {
//           method: "GET",
//           headers: {
//             Authorization: `Bearer ${token}`, // ✅ Send token via Authorization header
//           },
//         });

//       const data = await response.json();
//       console.log("Token verification response:", data);

//       if (response.ok) {
//         setIsAuthenticated(true);
//       } else {
//         setIsAuthenticated(false);
//         navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`); // Redirect with intended path
//       }
//     } catch (error) {
//       console.error("Token verification failed:", error);
//       setIsAuthenticated(false);
//       navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
//     }
//   };

//   verifyToken();
// }, [navigate, location.pathname])

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const token = localStorage.getItem("authToken");
//         const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
//           // method: "GET",
//           // credentials: "include",
//           // headers: {
//           //   "Content-Type": "application/json",
//           // },

//           method: "GET",
//           headers: {
//             "Content-Type": "application/json",
//             "Authorization": `Bearer ${token}`,
//           },
//         });
//         if (!response.ok) throw new Error("Failed to fetch doctor details");
//         const data = await response.json();
//         setDocInfo(data);
//       } catch (error) {
//         console.error("Error fetching doctor:", error);
//       } 
//     };

//     fetchDoctor();
//   }, [doctorId]);

//   useEffect(() => {
//     if (docInfo) {
//       generateNext7Days();
//     }
//   }, [docInfo]);

//   const generateNext7Days = () => {
//     let today = new Date();
//     let daysArray = [];
  
//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);
  
//       let dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
//       let formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
  
//       let availability = docInfo.availability.find(avail => avail.day === dayName);
      
//       if (availability && availability.slots.length > 0) {
//         daysArray.push({
//           date: formattedDate,
//           day: dayName,
//           slots: availability.slots
//         });
//       }
//     }
  
//     setAvailableDays(daysArray);
  
//     if (daysArray.length > 0) {
//       setSelectedDayIndex(0);
//       setAvailableTimeSlots(daysArray[0].slots);
//     }
//   };

//   const handleDaySelection = (index) => {
//     setSelectedDayIndex(index);
//     setAvailableTimeSlots(availableDays[index].slots);
//     setSelectedSlotTime("");
//   };
  
//   const handleTimeSlotSelection = (time) => {
//     setSelectedSlotTime(time);
//   };



//   const renderStars = (rating) => {
//     const filledStars = Math.floor(rating);
//     const emptyStars = 5 - filledStars;
//     return (
//       <div className="flex text-yellow-400">
//         {Array(filledStars)
//           .fill()
//           .map((_, i) => (
//             <AiFillStar key={i} size={20} />
//           ))}
//         {Array(emptyStars)
//           .fill()
//           .map((_, i) => (
//             <AiOutlineStar key={i} size={20} />
//           ))}
//       </div>
//     );
//   };

//   return docInfo && (
//     <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//       <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
//         <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 sm:p-8 flex flex-col md:flex-row  gap-8 lg:gap-40 md:items-center">
//           <div className="w-full md:w-80 flex-shrink-0">
//             <img src={docInfo.doctor_image} alt={docInfo.name} className="w-full h-auto rounded-lg shadow-lg" />
//           </div>


// <div className="flex-1 space-y-4">
//   {/* Doctor Name & Verified Badge */}
//   <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
//     {docInfo.name}
//     <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
//   </h1>

//   {/* Specialty & Body Part */}
//   <p className="text-md md:text-xl font-semibold text-gray-800">
//   {docInfo.specialty}  <span className="text-blue-600">({docInfo.bodyPart} Specialist)</span>  
//   </p>

//   {/* Qualification & Experience */}
//   <p className="text-md md:text-lg text-gray-700">
//     <span className="font-medium text-gray-900">Qualification:</span> {docInfo.qualification}
//   </p>
//   <p className="text-md md:text-lg text-gray-700">
//     <span className="font-medium text-gray-900">Experience:</span> {docInfo.experience} years
//   </p>

//   {/* Star Rating */}
//   <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
//     Rating: {renderStars(docInfo.ratings)}
//   </div>

//   {/* Consultation Fee */}
//   <p className="text-lg md:text-xl font-semibold text-green-600">
//     Consultation Fee: ₹{docInfo.consultancyFees}
//   </p>
// </div>


//         </div>

//         {/* Appointment Booking Section */}
//         <div className="p-[11px] md:p-6">
//           <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Date</h2>

//           {/* Day Selection */}
//           {/* <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
//   {availableDays.map((item, index) => (
//     <button 
//       key={index} 
//       onClick={() => handleDaySelection(index)} 
//       className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 ${selectedDayIndex === index ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//     >
//       <span className="text-xs sm:text-sm font-medium">{item.day}</span>
//       <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
//     </button>
//   ))}
// </div> */}


// {/* Day Selection */}
// {/* Day Selection */}
// <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
//   {availableDays.map((item, index) => {
//     const availabilityInfo = docInfo.availability.find(avail => avail.day === item.day);
//     const isUnavailable = availabilityInfo ? !availabilityInfo.available : false;

//     return (
//       <button
//         key={index}
//         onClick={() => handleDaySelection(index)} // Allow clicking on all days
//         className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 
//           ${selectedDayIndex === index ? 'bg-green-500 text-white' : isUnavailable ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
//         title={isUnavailable ? "Doctor is not available" : ""}
//       >
//         <span className="text-xs sm:text-sm font-medium">{item.day}</span>
//         <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
//       </button>
//     );
//   })}
// </div>



//       {/* Time Slot Selection */}
// <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Slot</h2>

// {docInfo.availability.find(avail => avail.day === availableDays[selectedDayIndex]?.day)?.available ? (
//   <div className="flex lg:justify-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
//     {availableTimeSlots.map((time, index) => (
//       <button
//         key={index}
//         onClick={() => handleTimeSlotSelection(time)}
//         className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${selectedSlotTime === time ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//       >
//         {time}
//       </button>
//     ))}
//   </div>
// ) : (
//   <p className="text-center text-red-500 font-medium mb-2">Doctor is not available on this day.</p>
// )}



//           {/* Book Appointment Button */}
//           <div className = "flex justify-center">
//           <button 
//             className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
//             onClick={""} // add here
//           >
//             Book Appointment
//           </button>
//           </div>
//         </div>
//       </div>

//       {/* Related Doctors */}
//       <div className="mt-12">
//         <RelatedDoctors doctorId={doctorId} specialty={docInfo.specialty} />
//       </div>
//     </div>
//   );
// };

// export default Appointment;



import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { assets } from "../assets/assets";
import RelatedDoctors from '../components/RelatedDoctors';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Swal from "sweetalert2";

const Appointment = () => {
  const { doctorId,hospitalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token not found");

        const response = await fetch("http://localhost:8000/patient/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      }
    };

    verifyToken();
  }, [navigate, location.pathname]);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch doctor details");
        const data = await response.json();
        setDocInfo(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (docInfo) {
      generateNext7Days();
    }
  }, [docInfo]);

  const generateNext7Days = () => {
    let today = new Date();
    let daysArray = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
      let formattedDate = currentDate.toISOString().split("T")[0];

      let availability = docInfo.availability.find(avail => avail.day === dayName);

      if (availability && availability.slots.length > 0) {
        daysArray.push({
          date: formattedDate,
          day: dayName,
          slots: availability.slots
        });
      }
    }

    setAvailableDays(daysArray);
    if (daysArray.length > 0) {
      setSelectedDayIndex(0);
      setAvailableTimeSlots(daysArray[0].slots);
    }
  };

  const handleDaySelection = (index) => {
    setSelectedDayIndex(index);
    setAvailableTimeSlots(availableDays[index].slots);
    setSelectedSlotTime("");
  };

  const handleTimeSlotSelection = (time) => {
    setSelectedSlotTime(time);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return (
      <div className="flex text-yellow-400">
        {Array(filledStars).fill().map((_, i) => (
          <AiFillStar key={i} size={20} />
        ))}
        {Array(emptyStars).fill().map((_, i) => (
          <AiOutlineStar key={i} size={20} />
        ))}
      </div>
    );
  };

  const handleBookAppointmentClick = () => {
    setIsModalOpen(true);
  };

  const handlePayment = (method) => {
    setIsModalOpen(false);
    Swal.fire({
      icon: "success",
      title: "Appointment Booked!",
      text: `You chose to pay ${method}.`,
      confirmButtonColor: "#3085d6",
    });
  };

  return docInfo && (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isModalOpen && (
        <div className="fixed inset-0 z-50 backdrop-blur bg-opacity-50 flex items-center justify-center">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-80 text-center">
            <h3 className="text-xl font-semibold text-gray-800 mb-4">Choose Payment Method</h3>
            <div className="space-y-4">
              <button 
                onClick={() => handlePayment("online")}
                className="w-full bg-green-500 text-white py-2 rounded-lg hover:bg-green-600 transition-all"
              >
                Pay Online
              </button>
              <button 
                onClick={() => handlePayment("offline")}
                className="w-full bg-gray-500 text-white py-2 rounded-lg hover:bg-gray-600 transition-all"
              >
                Pay Offline
              </button>
              <button 
                onClick={() => setIsModalOpen(false)}
                className="w-full mt-2 text-sm text-red-500 hover:underline"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 sm:p-8 flex flex-col md:flex-row gap-8 lg:gap-40 md:items-center">
          <div className="w-full md:w-80 flex-shrink-0">
            <img src={docInfo.doctor_image} alt={docInfo.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
              {docInfo.name}
              <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
            </h1>
            <p className="text-md md:text-xl font-semibold text-gray-800">
              {docInfo.specialty} <span className="text-blue-600">({docInfo.bodyPart} Specialist)</span>  
            </p>
            <p className="text-md md:text-lg text-gray-700">
              <span className="font-medium text-gray-900">Qualification:</span> {docInfo.qualification}
            </p>
            <p className="text-md md:text-lg text-gray-700">
              <span className="font-medium text-gray-900">Experience:</span> {docInfo.experience} years
            </p>
            <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
              Rating: {renderStars(docInfo.ratings)}
            </div>
            <p className="text-lg md:text-xl font-semibold text-green-600">
              Consultation Fee: ₹{docInfo.consultancyFees}
            </p>
          </div>
        </div>

        <div className="p-[11px] md:p-6">
          <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Date</h2>

          <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
            {availableDays.map((item, index) => {
              const availabilityInfo = docInfo.availability.find(avail => avail.day === item.day);
              const isUnavailable = availabilityInfo ? !availabilityInfo.available : false;

              return (
                <button
                  key={index}
                  onClick={() => handleDaySelection(index)}
                  className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 
                    ${selectedDayIndex === index ? 'bg-green-500 text-white' : isUnavailable ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                  title={isUnavailable ? "Doctor is not available" : ""}
                >
                  <span className="text-xs sm:text-sm font-medium">{item.day}</span>
                  <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
                </button>
              );
            })}
          </div>

          <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Slot</h2>

          {docInfo.availability.find(avail => avail.day === availableDays[selectedDayIndex]?.day)?.available ? (
            <div className="flex lg:justify-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {availableTimeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSlotSelection(time)}
                  className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${selectedSlotTime === time ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 font-medium mb-2">Doctor is not available on this day.</p>
          )}

          <div className="flex justify-center">
            <button 
              className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
              onClick={handleBookAppointmentClick}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RelatedDoctors doctorId={doctorId} specialty={docInfo.specialty} hospitalId={hospitalId} />
      </div>
    </div>
  );
};

export default Appointment;







