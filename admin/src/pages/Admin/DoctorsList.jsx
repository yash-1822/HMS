// import React from 'react'
// import { useContext,useState } from 'react'
// import { AdminContext } from '../../context/AdminContext'
// import { useEffect } from 'react'
// import axios from 'axios'

// const DoctorsList = () => {

//   const {aToken,getAllDoctors, changeAvailability,backendUrl} = useContext(AdminContext)
//   const [doctors,setDoctors]  = useState([]);

//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`${backendUrl}/hospitalAdmin/getDoctors`, {
//           headers: { atoken: aToken },
//         });
  
//         if (res.data.success) {
//           setDoctors(res.data.doctors);
          
//         }
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };
  
//     useEffect(() => {
//       fetchDoctors();
//     }, []);

//   // useEffect(() => {
//   //   if(aToken) {
//   //     getAllDoctors()
//   //   }
//   // },[aToken])

//   return (
//     <div className='m-5 max-h-[90vh] overflow-y-scroll'>
//       <h1 className='text-lg font-medium'>All Doctors</h1>
//       <div className='w-full flex flex-wrap gap-4 pt-5 gap-y-6'>
//         {
//           doctors.map((item,index)=>(
//             <div className='border border-indigo-200 rounded-xl max-w-56 overflow-hidden cursor-pointer group' key={index}>
//               <img className='bg-indigo-50 group-hover:bg-green-400 transition-all duration-500:' src={item.doctor_image} alt="" />
//               <div className='p-4'>
//                 <p className='text-neutral-800 text-lg font-medium'>{item.name}</p>
//                 <p className='text-zinc-600 text-sm'>{item.specialty}</p>
//                 {/* <div className='mt-2 flex items-center gap-1 text-sm'>
//                   <input onChange={()=>changeAvailability(item._id)} type="checkbox" checked={item.available} />
//                   <p>Available</p>

//                 </div> */}
//               </div>
//             </div>
            
//           ))
//         }
//       </div>
//     </div>
//   )
// }

// export default DoctorsList





import React, { useContext, useState, useEffect } from 'react';
import { AdminContext } from '../../context/AdminContext';
import axios from 'axios';

const DoctorsList = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [doctors, setDoctors] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hospitalAdmin/getDoctors`, {
        headers: { atoken: aToken },
      });

      if (res.data.success) {
        setDoctors(res.data.doctors);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  return (
    <div className='m-5 max-h-[90vh] overflow-y-scroll'>
      <h1 className='text-lg font-medium'>All Doctors</h1>
      <div className='w-full flex flex-wrap gap-8 pt-5 gap-y-6'>
        {doctors.map((item, index) => (
          <div
            className='w-56 h-65 border border-indigo-200 rounded-xl overflow-hidden cursor-pointer group flex flex-col'
            key={index}
          >
            <div className='w-full h-40 bg-indigo-50 group-hover:bg-green-400 transition-all duration-500'>
              <img
                src={item.doctor_image}
                alt=""
                className='w-full h-full object-center'
              />
            </div>
            <div className='p-4 flex flex-col justify-between gap-2'>
              <p className='text-neutral-800 text-lg font-medium truncate'>{item.name}</p>
              <p className='text-zinc-600 text-sm  truncate'>{item.specialty}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DoctorsList;

