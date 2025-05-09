// import React, { useContext, useEffect } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { AppContext } from "../../context/AppContext";
// import { assets } from "../../assets/assets";
// const AllAppointments = () => {
//   const adminContext = useContext(AdminContext);
//   const appContext = useContext(AppContext);

//   // Ensure context exists before destructuring
//   const { aToken, appointments, getAllAppointments, cancelAppointmet } = adminContext || {};
//   const calculateAge = appContext?.calculateAge || (() => "N/A"); // Provide fallback function
//   const slotDateFormat = appContext?.slotDateFormat || (() => "N/A"); // Provide fallback function
//   const {currency} = AppContext?.currency || (()=> "N/A")
//   useEffect(() => {
//     if (aToken) {
//       getAllAppointments();
//     }
//   }, [aToken, getAllAppointments]);

//   return (
//     <div className="w-full max-w-6xl m-5">
//       <p className="mb-3 text-lg font-medium">All Appointments</p>
//       <div className="bg-white rounded text-sm max-h-[80vh] min-h-[60vh] overflow-y-scroll">
//         <div className="hidden sm:grid grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] grid-flow-col py-3 px-6 border-b">
//           <p>#</p>
//           <p>Patient</p>
//           <p>Age</p>
//           <p>Date & Time</p>
//           <p>Doctor</p>
//           <p>Fees</p>
//           <p>Actions</p>
//         </div>

//         {appointments?.map((item, index) => (
//           <div
//             className="flex flex-wrap justify-between max-sm:gap-2 sm:grid sm:grid-cols-[0.5fr_3fr_1fr_3fr_3fr_1fr_1fr] items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50"
//             key={index}
//           >
//             <p className="max-sm:hidden">{index + 1}</p>
//             <div className="flex items-center gap-2">
//               <img className="w-8 rounded-full" src={item.userData.image} alt="" />
//               <p>{item.userData.name}</p>
//             </div>
//             <p className="max-sm:hidden">{calculateAge(item.userData.dob)}</p>
//             {/*             <p>slotDateFormat(item.slotDate), slotDateFormat(item.slotTime)</p> */}
//             <p>{item.slotDate}, {item.slotTime}</p>
            
//             <div className="flex items-center gap-2">
//               <img className="w-8 rounded-full bg-gray-200" src={item.docData.image} alt="" />
//               <p>{item.docData.name}</p>
//             </div>
//             <p>{currency || '$'} {item.amount}</p>
//             {item.cancelled
//             ? <p className="text-red-400 text-xs font-medium">cancelled</p>
//             : item.isCompleted
//             ? <p className="text-green-500 text-xs font-medium">Completed</p>
//             : <img onClick={()=> cancelAppointmet(item._id)} className="w-10 cursor-pointer" src={assets.cancel_icon} alt="" />
//             }
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default AllAppointments;





import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { AppContext } from "../../context/AppContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const AllAppointments = () => {
  const adminContext = useContext(AdminContext);
  const appContext = useContext(AppContext);

  const {
    aToken,
    appointments,
    getAllAppointments,
    cancelAppointmet,
    backendUrl,
  } = adminContext || {};

  const calculateAge = appContext?.calculateAge || (() => "N/A");
  const slotDateFormat = appContext?.slotDateFormat || ((val) => val);
  const currency = appContext?.currency || "$";

  const [doctorCount, setDoctorCount] = useState(0);
  const [doctorList, setDoctorList] = useState([]);
  const [latestAppointments, setLatestAppointments] = useState([]);

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hospitalAdmin/fetchAppointments`, {
        headers: { atoken: aToken },
      });

      if (res.data.success) {
        setLatestAppointments(res.data.AllAppointments);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    if (aToken) {
      // getAllAppointments();
      fetchDoctors();
    }
  }, [aToken, getAllAppointments]);

  return (
    <div className="w-full max-w-6xl m-5 ">
      <p className="mb-3 text-lg font-medium text-center">All Appointments</p>

      {/* Latest Appointments Summary Section */}
      <div className="bg-white mb-6 rounded border border-gray-300 h-[550px] overflow-y-scroll">
        {/* <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-300 bg-gray-100 rounded-t">
          <img className="font-semibold" src={assets.list_icon} alt="icon" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div> */}

        <div className="overflow-x-auto">
          <div className="min-w-[800px]">
            <div className="grid grid-cols-7 font-semibold text-gray-700 px-2 py-4 border-b border-gray-200 bg-gray-100 text-sm">
              <p>Patient</p>
              <p>Doctor</p>
              <p>Slot</p>
              <p>Date</p>
              <p>Payment Mode</p>
              <p>Phone Number</p>
              <p>Status</p>
            </div>

            {latestAppointments?.map((item, index) => (
              <div
                className="grid grid-cols-7 items-center px-2 py-3 border-b border-gray-100 hover:bg-gray-50 text-sm"
                key={index}
              >
                <div className="flex items-center gap-2">
                  {/* <img
                    className="rounded-full w-8 h-8 object-cover"
                    src={item.docData?.image || assets.user_icon}
                    alt="doc"
                  /> */}
                  <p className="text-gray-800 font-medium">{item.name}</p>
                </div>

                <p className="text-gray-700">{item.docData?.name || "N/A"}</p>

                <p className="text-gray-700">{item.slotTime}</p>

                <p className="text-gray-700">{item.slotDate} </p>

                <p className="text-gray-700">{item.payment ? "Online" : "Cash"}</p>

                <p className="text-gray-700">{item.phone || "N/A"}</p>

                <p
                  className={`text-xs font-medium ${
                    item.cancelled
                      ? "text-red-400"
                      : item.isCompleted
                      ? "text-green-500"
                      : "text-yellow-500"
                  }`}
                >
                  {item.cancelled
                    ? "Cancelled"
                    : item.isCompleted
                    ? "Completed"
                    : "Upcoming"}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>

        </div>
  );
};

export default AllAppointments;


