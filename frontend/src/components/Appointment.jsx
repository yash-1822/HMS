// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets, doctors } from "../assets/assets";
// import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment = () => {
//   const { doctorId } = useParams();
//   console.log("doctorId",doctorId)

//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState('');


//   console.log("doctors data from appointement",doctors)

//   useEffect(() => {
//     const fetchDocInfo = () => {
//       const doc = doctors.find((doc) => doc._id === doctorId);
//       setDocInfo(doc);
//     };
//     fetchDocInfo();
//   }, [doctorId]);

//   console.log("DOCINFO IS:",docInfo)

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   const getAvailableSlots = () => {
//     let today = new Date();
//     let slots = [];

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0);

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         });

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       slots.push(timeSlots);
//     }
//     setDocSlots(slots);
//   };

//   return docInfo && (
//     <div>
//       {/* Doctor Details */}
//       <div className='flex flex-col sm:flex-row gap-4'>
//         <div>
//           <img className='bg-green-400 w-full sm:max-w-72 rounded-lg' src={docInfo.image} alt="" />
//         </div>
//         <div className='flex-1 border border-gray-400 rounded-lg p-8 py-7 bg-white mx-2 sm:mx-0 mt-[-80px] sm:mt-0'>
//           <p className='flex items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.speciality}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
//           </div>
//           <div>
//             <p className='flex items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About <img src={assets.info_icon} alt="" />
//             </p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* Booking Slots */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-scroll mt-4'>
//           {docSlots.length > 0 && docSlots.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setSlotIndex(index)}
//               className={`text-center py-6 min-w-16 rounded-full cursor-pointer ${slotIndex === index ? 'bg-green-400 text-white' : 'border border-gray-200'}`}
//             >
//               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//               <p>{item[0] && item[0].datetime.getDate()}</p>
//             </div>
//           ))}
//         </div>

//         <div className='flex items-center gap-3 w-full overflow-x-scroll mt-4'>
//           {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
//             <p
//               key={index}
//               onClick={() => setSlotTime(item.time)}
//               className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer ${item.time === slotTime ? 'bg-green-400 text-white' : 'text-gray-400 border border-gray-300'}`}
//             >
//               {item.time.toLowerCase()}
//             </p>
//           ))}
//         </div>
//         <button className='bg-green-400 text-white text-sm font-light px-14 py-3 rounded-full my-6'>Book an appointment</button>
//       </div>

//       {/* Related Doctors */}
//       <RelatedDoctors doctorId={doctorId} speciality={docInfo.speciality} />
//     </div>
//   );
// };

// export default Appointment;





//This is static one 

// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets, doctors } from "../assets/assets";
// import RelatedDoctors from '../components/RelatedDoctors';

// const Appointment = () => {
//   const { doctorId } = useParams();
//   console.log("doctorId from appointment page", doctorId);

//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState('');

//   console.log("doctors data from appointment", doctors);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
//           method: "GET",
//           credentials: "include", // Ensures cookies (session/token) are sent
//           headers: {
//             "Content-Type": "application/json",
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

//   console.log("DOCINFO IS:", docInfo);

//   useEffect(() => {
//     if (docInfo) {
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   const getAvailableSlots = () => {
//     let today = new Date();
//     let slots = [];

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0);

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         });

//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }

//       slots.push(timeSlots);
//     }
//     setDocSlots(slots);
//   };

//   return docInfo && (
//     <div className="mx-4 sm:mx-16 md:mx-24 lg:mx-32">
//       {/* Doctor Details */}
//       <div className='flex flex-col sm:flex-row gap-4 items-center sm:items-start'>
//         <div className="w-full sm:w-auto">
//           <img className='bg-green-400 w-full sm:max-w-72 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105' src={docInfo.doctor_image} alt="" />
//         </div>
//         <div className='flex-1 border border-gray-400 rounded-lg p-6 py-7 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 text-center sm:text-left'>
//           <p className='flex justify-center sm:justify-start items-center gap-2 text-2xl font-medium text-gray-900'>
//             {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
//           </p>
//           <div className='flex justify-center sm:justify-start items-center gap-2 text-sm mt-1 text-gray-600'>
//             <p>{docInfo.degree} - {docInfo.specialty}</p>
//             <button className='py-0.5 px-2 border text-xs rounded-full'>2 years</button>
//           </div>
//           <div>
//             <p className='flex justify-center sm:justify-start items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
//               About <img src={assets.info_icon} alt="" />
//             </p>
//             <p className='text-sm text-gray-500 max-w-[700px] mt-1 mx-auto sm:mx-0'>{docInfo.about}</p>
//           </div>
//           <p className='text-gray-500 font-medium mt-4'>
//             Appointment fee: <span className='text-gray-600'>{docInfo.fees}</span>
//           </p>
//         </div>
//       </div>

//       {/* Booking Slots */}
//       <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
//         <p>Booking slots</p>
//         <div className='flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2'>
//           {docSlots.length > 0 && docSlots.map((item, index) => (
//             <div
//               key={index}
//               onClick={() => setSlotIndex(index)}
//               className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-green-400 text-white scale-110' : 'border border-gray-200'}`}
//             >
//               <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
//               <p>{item[0] && item[0].datetime.getDate()}</p>
//             </div>
//           ))}
//         </div>

//         <div className='flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2'>
//           {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
//             <p
//               key={index}
//               onClick={() => setSlotTime(item.time)}
//               className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime ? 'bg-green-400 text-white scale-110' : 'text-gray-400 border border-gray-300'}`}
//             >
//               {item.time.toLowerCase()}
//             </p>
//           ))}
//         </div>
//         <button className='bg-green-400 text-white text-sm font-light px-14 py-3 rounded-full my-6 transition-transform duration-300 hover:scale-105 w-full sm:w-auto'>Book an appointment</button>
//       </div>

//       {/* Related Doctors */}
//       <RelatedDoctors doctorId={doctorId} speciality={docInfo.specialty} />
//     </div>
//   );
// };

// export default Appointment;





// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets } from "../assets/assets";
// import RelatedDoctors from '../components/RelatedDoctors';
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// const Appointment = () => {
//   const { doctorId } = useParams();
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   const [docInfo, setDocInfo] = useState(null);
//   const [docSlots, setDocSlots] = useState([]);
//   const [slotIndex, setSlotIndex] = useState(0);
//   const [slotTime, setSlotTime] = useState('');

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
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
//       getAvailableSlots();
//     }
//   }, [docInfo]);

//   const getAvailableSlots = () => {
//     let today = new Date();
//     let slots = [];

//     for (let i = 0; i < 7; i++) {
//       let currentDate = new Date(today);
//       currentDate.setDate(today.getDate() + i);

//       let endTime = new Date(currentDate);
//       endTime.setHours(21, 0, 0);

//       if (today.getDate() === currentDate.getDate()) {
//         currentDate.setHours(Math.max(currentDate.getHours() + 1, 10));
//         currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
//       } else {
//         currentDate.setHours(10);
//         currentDate.setMinutes(0);
//       }

//       let timeSlots = [];
//       while (currentDate < endTime) {
//         let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
//         timeSlots.push({
//           datetime: new Date(currentDate),
//           time: formattedTime
//         });
//         currentDate.setMinutes(currentDate.getMinutes() + 30);
//       }
//       slots.push(timeSlots);
//     }
//     setDocSlots(slots);
//   };


//   console.log(docSlots);

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

// {/* <div className="flex-1 space-y-2">
//             <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
//               {docInfo.name} <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
//             </h1>
//             <p className="text-sm md:text-lg text-gray-700">{docInfo.specialty}  ({docInfo.bodyPart} Specialist)</p>
//             <p className="text-sm md:text-lg text-gray-700">Qualification: {docInfo.qualification}</p>
//             <p className="text-sm md:text-lg text-gray-700">Experience: {docInfo.experience} years</p>
//             <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
//             <div className="flex items-center gap-2">{renderStars(docInfo.ratings)}</div>
//             <p className="text-lg font-medium text-green-600">Consultation Fee: ₹{docInfo.consultancyFees}</p>
//           </div> */}

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
//           <div className="flex lg:justify-center justify-normal  gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
//             {docSlots.map((item, index) => (
//               <button 
//                 key={index} 
//                 onClick={() => setSlotIndex(index)} 
//                 className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 ${slotIndex === index ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//               >
//                 <span className="text-xs sm:text-sm font-medium">
//                   {item[0] && daysOfWeek[item[0].datetime.getDay()]}
//                 </span>
//                 <span className="text-xl sm:text-2xl font-bold mt-1">
//                   {item[0] && item[0].datetime.getDate()}
//                 </span>
//               </button>
//             ))}
//           </div>

//           {/* Time Slot Selection */}
//           <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment slot</h2>
//           <div className="flex lg:justify-center justify-normal gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
//             {docSlots[slotIndex]?.map((item, index) => (
//               <button 
//                 key={index} 
//                 onClick={() => setSlotTime(item.time)} 
//                 className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${item.time === slotTime ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//               >
//                 {item.time}
//               </button>
//             ))}
//           </div>

//           {/* Book Appointment Button */}
//           <div className = "flex justify-center">
//           <button 
//             className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
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









// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets } from "../assets/assets";
// import RelatedDoctors from '../components/RelatedDoctors';
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// const Appointment = () => {
//   const { doctorId } = useParams();
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   const [docInfo, setDocInfo] = useState(null);
//   const [availableDays, setAvailableDays] = useState([]);
// const [selectedDayIndex, setSelectedDayIndex] = useState(0);
// const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
// const [selectedSlotTime, setSelectedSlotTime] = useState("");

// console.log("Remaining data is",selectedDayIndex,availableTimeSlots,selectedSlotTime);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
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

// {/* <div className="flex-1 space-y-2">
//             <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
//               {docInfo.name} <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
//             </h1>
//             <p className="text-sm md:text-lg text-gray-700">{docInfo.specialty}  ({docInfo.bodyPart} Specialist)</p>
//             <p className="text-sm md:text-lg text-gray-700">Qualification: {docInfo.qualification}</p>
//             <p className="text-sm md:text-lg text-gray-700">Experience: {docInfo.experience} years</p>
//             <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
//             <div className="flex items-center gap-2">{renderStars(docInfo.ratings)}</div>
//             <p className="text-lg font-medium text-green-600">Consultation Fee: ₹{docInfo.consultancyFees}</p>
//           </div> */}

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
// <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
//   {availableDays.map((item, index) => {
//     const availabilityInfo = docInfo.availability.find(avail => avail.day === item.day);
//     const isUnavailable = availabilityInfo ? !availabilityInfo.available : false;

//     return (
//       <button
//         key={index}
//         onClick={() => !isUnavailable && handleDaySelection(index)} // Prevent clicking on unavailable days
//         className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 
//           ${selectedDayIndex === index ? 'bg-green-500 text-white' : isUnavailable ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-gray-200'}`}
//         title={isUnavailable ? "Unavailable" : ""}
//       >
//         <span className="text-xs sm:text-sm font-medium">{item.day}</span>
//         <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
//       </button>
//     );
//   })}
// </div>


//           {/* Time Slot Selection */}
//           <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment slot</h2>
//           <div className="flex lg:justify-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
//   {availableTimeSlots.map((time, index) => (
//     <button 
//       key={index} 
//       onClick={() => handleTimeSlotSelection(time)} 
//       className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${selectedSlotTime === time ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//     >
//       {time}
//     </button>
//   ))}
// </div>


//           {/* Book Appointment Button */}
//           <div className = "flex justify-center">
//           <button 
//             className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
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






// import React, { useEffect, useState } from 'react';
// import { useParams } from 'react-router-dom';
// import { assets } from "../assets/assets";
// import RelatedDoctors from '../components/RelatedDoctors';
// import { AiFillStar, AiOutlineStar } from "react-icons/ai";

// const Appointment = () => {
//   const { doctorId } = useParams();
//   const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
//   const [docInfo, setDocInfo] = useState(null);
//   const [availableDays, setAvailableDays] = useState([]);
// const [selectedDayIndex, setSelectedDayIndex] = useState(0);
// const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
// const [selectedSlotTime, setSelectedSlotTime] = useState("");

// console.log("Remaining data is",selectedDayIndex,availableTimeSlots,selectedSlotTime);

//   useEffect(() => {
//     const fetchDoctor = async () => {
//       try {
//         const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
//           method: "GET",
//           credentials: "include",
//           headers: {
//             "Content-Type": "application/json",
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

// {/* <div className="flex-1 space-y-2">
//             <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
//               {docInfo.name} <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
//             </h1>
//             <p className="text-sm md:text-lg text-gray-700">{docInfo.specialty}  ({docInfo.bodyPart} Specialist)</p>
//             <p className="text-sm md:text-lg text-gray-700">Qualification: {docInfo.qualification}</p>
//             <p className="text-sm md:text-lg text-gray-700">Experience: {docInfo.experience} years</p>
//             <p className="text-gray-600 leading-relaxed">{docInfo.about}</p>
//             <div className="flex items-center gap-2">{renderStars(docInfo.ratings)}</div>
//             <p className="text-lg font-medium text-green-600">Consultation Fee: ₹{docInfo.consultancyFees}</p>
//           </div> */}

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
// <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
//   {availableDays.map((item, index) => {
//     const availabilityInfo = docInfo.availability.find(avail => avail.day === item.day);
//     const isUnavailable = availabilityInfo ? !availabilityInfo.available : false;

//     return (
//       <button
//         key={index}
//         onClick={() => !isUnavailable && handleDaySelection(index)} // Prevent clicking on unavailable days
//         className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 
//           ${selectedDayIndex === index ? 'bg-green-500 text-white' : isUnavailable ? 'bg-red-500 text-white cursor-not-allowed' : 'bg-gray-200'}`}
//         title={isUnavailable ? "Unavailable" : ""}
//       >
//         <span className="text-xs sm:text-sm font-medium">{item.day}</span>
//         <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
//       </button>
//     );
//   })}
// </div>


//           {/* Time Slot Selection */}
//           <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment slot</h2>
//           <div className="flex lg:justify-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
//   {availableTimeSlots.map((time, index) => (
//     <button 
//       key={index} 
//       onClick={() => handleTimeSlotSelection(time)} 
//       className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${selectedSlotTime === time ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
//     >
//       {time}
//     </button>
//   ))}
// </div>


//           {/* Book Appointment Button */}
//           <div className = "flex justify-center">
//           <button 
//             className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
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
import { useParams } from 'react-router-dom';
import { assets } from "../assets/assets";
import RelatedDoctors from '../components/RelatedDoctors';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";

const Appointment = () => {
  const { doctorId } = useParams();
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
const [selectedDayIndex, setSelectedDayIndex] = useState(0);
const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
const [selectedSlotTime, setSelectedSlotTime] = useState("");

console.log("Remaining data is",selectedDayIndex,availableTimeSlots,selectedSlotTime);

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const response = await fetch(`http://localhost:8000/doctors/${doctorId}`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
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
      let formattedDate = currentDate.toISOString().split("T")[0]; // YYYY-MM-DD format
  
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
        {Array(filledStars)
          .fill()
          .map((_, i) => (
            <AiFillStar key={i} size={20} />
          ))}
        {Array(emptyStars)
          .fill()
          .map((_, i) => (
            <AiOutlineStar key={i} size={20} />
          ))}
      </div>
    );
  };

  return docInfo && (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 sm:p-8 flex flex-col md:flex-row  gap-8 lg:gap-40 md:items-center">
          <div className="w-full md:w-80 flex-shrink-0">
            <img src={docInfo.doctor_image} alt={docInfo.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>


<div className="flex-1 space-y-4">
  {/* Doctor Name & Verified Badge */}
  <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
    {docInfo.name}
    <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
  </h1>

  {/* Specialty & Body Part */}
  <p className="text-md md:text-xl font-semibold text-gray-800">
  {docInfo.specialty}  <span className="text-blue-600">({docInfo.bodyPart} Specialist)</span>  
  </p>

  {/* Qualification & Experience */}
  <p className="text-md md:text-lg text-gray-700">
    <span className="font-medium text-gray-900">Qualification:</span> {docInfo.qualification}
  </p>
  <p className="text-md md:text-lg text-gray-700">
    <span className="font-medium text-gray-900">Experience:</span> {docInfo.experience} years
  </p>

  {/* Star Rating */}
  <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
    Rating: {renderStars(docInfo.ratings)}
  </div>

  {/* Consultation Fee */}
  <p className="text-lg md:text-xl font-semibold text-green-600">
    Consultation Fee: ₹{docInfo.consultancyFees}
  </p>
</div>


        </div>

        {/* Appointment Booking Section */}
        <div className="p-[11px] md:p-6">
          <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Date</h2>

          {/* Day Selection */}
          {/* <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
  {availableDays.map((item, index) => (
    <button 
      key={index} 
      onClick={() => handleDaySelection(index)} 
      className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 ${selectedDayIndex === index ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
    >
      <span className="text-xs sm:text-sm font-medium">{item.day}</span>
      <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
    </button>
  ))}
</div> */}


{/* Day Selection */}
{/* Day Selection */}
<div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
  {availableDays.map((item, index) => {
    const availabilityInfo = docInfo.availability.find(avail => avail.day === item.day);
    const isUnavailable = availabilityInfo ? !availabilityInfo.available : false;

    return (
      <button
        key={index}
        onClick={() => handleDaySelection(index)} // Allow clicking on all days
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



      {/* Time Slot Selection */}
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



          {/* Book Appointment Button */}
          <div className = "flex justify-center">
          <button 
            className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            Book Appointment
          </button>
          </div>
        </div>
      </div>

      {/* Related Doctors */}
      <div className="mt-12">
        <RelatedDoctors doctorId={doctorId} specialty={docInfo.specialty} />
      </div>
    </div>
  );
};

export default Appointment;










