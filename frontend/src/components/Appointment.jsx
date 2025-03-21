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

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { assets, doctors } from "../assets/assets";
import RelatedDoctors from '../components/RelatedDoctors';

const Appointment = () => {
  const { doctorId } = useParams();
  console.log("doctorId", doctorId);

  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];

  const [docInfo, setDocInfo] = useState(null);
  const [docSlots, setDocSlots] = useState([]);
  const [slotIndex, setSlotIndex] = useState(0);
  const [slotTime, setSlotTime] = useState('');

  console.log("doctors data from appointment", doctors);

  useEffect(() => {
    const fetchDocInfo = () => {
      const doc = doctors.find((doc) => doc._id === doctorId);
      setDocInfo(doc);
    };
    fetchDocInfo();
  }, [doctorId]);

  console.log("DOCINFO IS:", docInfo);

  useEffect(() => {
    if (docInfo) {
      getAvailableSlots();
    }
  }, [docInfo]);

  const getAvailableSlots = () => {
    let today = new Date();
    let slots = [];

    for (let i = 0; i < 7; i++) {
      let currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);

      let endTime = new Date(currentDate);
      endTime.setHours(21, 0, 0);

      if (today.getDate() === currentDate.getDate()) {
        currentDate.setHours(currentDate.getHours() > 10 ? currentDate.getHours() + 1 : 10);
        currentDate.setMinutes(currentDate.getMinutes() > 30 ? 30 : 0);
      } else {
        currentDate.setHours(10);
        currentDate.setMinutes(0);
      }

      let timeSlots = [];
      while (currentDate < endTime) {
        let formattedTime = currentDate.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

        timeSlots.push({
          datetime: new Date(currentDate),
          time: formattedTime
        });

        currentDate.setMinutes(currentDate.getMinutes() + 30);
      }

      slots.push(timeSlots);
    }
    setDocSlots(slots);
  };

  return docInfo && (
    <div className="mx-4 sm:mx-16 md:mx-24 lg:mx-32">
      {/* Doctor Details */}
      <div className='flex flex-col sm:flex-row gap-4 items-center sm:items-start'>
        <div className="w-full sm:w-auto">
          <img className='bg-green-400 w-full sm:max-w-72 rounded-lg shadow-lg transition-transform duration-300 hover:scale-105' src={docInfo.image} alt="" />
        </div>
        <div className='flex-1 border border-gray-400 rounded-lg p-6 py-7 bg-white shadow-md hover:shadow-lg transition-shadow duration-300 text-center sm:text-left'>
          <p className='flex justify-center sm:justify-start items-center gap-2 text-2xl font-medium text-gray-900'>
            {docInfo.name} <img className='w-5' src={assets.verified_icon} alt="" />
          </p>
          <div className='flex justify-center sm:justify-start items-center gap-2 text-sm mt-1 text-gray-600'>
            <p>{docInfo.degree} - {docInfo.speciality}</p>
            <button className='py-0.5 px-2 border text-xs rounded-full'>{docInfo.experience}</button>
          </div>
          <div>
            <p className='flex justify-center sm:justify-start items-center gap-1 text-sm font-medium text-gray-900 mt-3'>
              About <img src={assets.info_icon} alt="" />
            </p>
            <p className='text-sm text-gray-500 max-w-[700px] mt-1 mx-auto sm:mx-0'>{docInfo.about}</p>
          </div>
          <p className='text-gray-500 font-medium mt-4'>
            Appointment fee: <span className='text-gray-600'>{docInfo.fees}</span>
          </p>
        </div>
      </div>

      {/* Booking Slots */}
      <div className='sm:ml-72 sm:pl-4 mt-4 font-medium text-gray-700'>
        <p>Booking slots</p>
        <div className='flex gap-3 items-center w-full overflow-x-auto mt-4 pb-2'>
          {docSlots.length > 0 && docSlots.map((item, index) => (
            <div
              key={index}
              onClick={() => setSlotIndex(index)}
              className={`text-center py-6 min-w-16 rounded-full cursor-pointer transition-all duration-300 ${slotIndex === index ? 'bg-green-400 text-white scale-110' : 'border border-gray-200'}`}
            >
              <p>{item[0] && daysOfWeek[item[0].datetime.getDay()]}</p>
              <p>{item[0] && item[0].datetime.getDate()}</p>
            </div>
          ))}
        </div>

        <div className='flex items-center gap-3 w-full overflow-x-auto mt-4 pb-2'>
          {docSlots.length > 0 && docSlots[slotIndex].map((item, index) => (
            <p
              key={index}
              onClick={() => setSlotTime(item.time)}
              className={`text-sm font-light flex-shrink-0 px-5 py-2 rounded-full cursor-pointer transition-all duration-300 ${item.time === slotTime ? 'bg-green-400 text-white scale-110' : 'text-gray-400 border border-gray-300'}`}
            >
              {item.time.toLowerCase()}
            </p>
          ))}
        </div>
        <button className='bg-green-400 text-white text-sm font-light px-14 py-3 rounded-full my-6 transition-transform duration-300 hover:scale-105 w-full sm:w-auto'>Book an appointment</button>
      </div>

      {/* Related Doctors */}
      <RelatedDoctors doctorId={doctorId} speciality={docInfo.speciality} />
    </div>
  );
};

export default Appointment;