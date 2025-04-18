// import React from 'react'
// import {doctors} from '../assets/assets';

// const MyAppointments = () => {
//   return (
//     <div>
//         <p>My appointments</p>
//         <div>
//             {doctors.slice(0,2).map((item,index)=>(
//                 <div key={index}>
//                     <div>
//                         <img src={item.image} alt="" />
//                     </div>
//                     <div>
//                         <p>{item.name}</p>
//                         <p>{item.speciality}</p>
//                         <p>Address:</p>
//                         <p>{item.address.line1}</p>
//                         <p>{item.address.line2}</p>
//                         <p> <span>Date & Time:</span> 25, July, 2024 | 8:30 PM</p>
//                     </div>
//                     <div></div>
//                     <div>
//                         <button>Pay Online</button>
//                         <button>Cancel appointment</button>
//                     </div>
//                 </div>
//             ))}
//         </div>
//     </div>
//   )
// }

// export default MyAppointments

import React from 'react';
import { doctors } from '../assets/assets';

const MyAppointments = () => {
  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h2 className="text-3xl font-bold text-green-700 mb-6 text-center">My Appointments</h2>

      <div className="space-y-6">
        {doctors.slice(0, 5).map((item, index) => (
          <div
            key={index}
            className="w-full bg-white shadow-md rounded-xl overflow-hidden flex flex-col md:flex-row transition-transform transform hover:scale-[1.015] duration-300"
          >
            <div className="md:w-1/3 bg-green-100 p-4 flex justify-center items-center">
              <img
                src={item.image}
                alt={item.name}
                className="w-24 h-24 md:w-32 md:h-32 object-cover rounded-full border-4 border-green-300 shadow-md"
              />
            </div>

            <div className="md:w-2/3 p-4 flex flex-col justify-between space-y-2">
              <div>
                <p className="text-lg font-semibold text-green-800">{item.name}</p>
                <p className="text-sm text-green-600 mb-1">{item.speciality}</p>

                <p className="text-sm text-gray-600">Address:</p>
                <p className="text-sm text-gray-800">{item.address.line1}</p>
                <p className="text-sm text-gray-800 mb-1">{item.address.line2}</p>

                <p className="text-sm text-green-700 font-medium">
                  <span className="font-semibold text-gray-700">Date & Time:</span> 25, July, 2024 | 8:30 PM
                </p>
              </div>

              <div className="flex gap-2 mt-2">
                <button className="bg-green-600 text-white px-3 py-1 rounded-lg hover:bg-green-700 transition text-sm">
                  Pay Online
                </button>
                <button className="bg-red-500 text-white px-3 py-1 rounded-lg hover:bg-red-600 transition text-sm">
                  Cancel
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyAppointments;
