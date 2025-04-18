// import React, { useContext, useEffect,useState } from "react";
// import { AdminContext } from "../../context/AdminContext";
// import { assets } from "../../assets/assets";
// import { AppContext } from "../../context/AppContext";
// import axios from 'axios'

// const Dashboard = () => {
//   const { aToken, getDashData, dashData,backendUrl } = useContext(AdminContext);
//   const [doctorCount, setDoctorCount] = useState(0);
// const [doctorList, setDoctorList] = useState([]);
// const [appointments,setAppointments] = useState([]);

//    const [stats, setStats] = useState({
//         totalEarnings: 0,
//         totalAppointments: 0,
//         totalPatients: 0
//       });

//       console.log("atoken is",aToken)


//    const fetchAppointmentStats = async () => {
//       try {
//         const res = await axios.get(`${backendUrl}/hospitalAdmin/getAppointmentStats`);
//         console.log("respnse is",res);
//         if (res.data.success) {
//           setStats({
//             totalEarnings: res.data.totalEarnings,
//             totalAppointments: res.data.totalAppointments,
//             totalPatients: res.data.totalPatients
//           });
//         } else {
//           // setError('Failed to fetch stats');
//         }
//       } catch (err) {
//           console.log("something went wrong")
//       } finally {
//         // setLoading(false);
//       }
//     };

//     const fetchDoctors = async () => {
//       try {
//         const res = await axios.get(`${backendUrl}/hospitalAdmin/getDoctors`, {
//           headers: { atoken: aToken }
//         });
    
//         if (res.data.success) {
//           setDoctorCount(res.data.count);
//           setDoctorList(res.data.doctors);
//           setAppointments(res.data.latestAppointments);
//         }
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//   useEffect(() => {
//    fetchAppointmentStats()
//    fetchDoctors();
//   }, [aToken]);

//   return (
//       <div className="m-5">
//         {/* Flex container for cards */}
//         <div className="flex flex-wrap gap-5">
//           {/* Doctors */}
//           <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all">
//             <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12" />
//             <div>
//               <p className="text-xl font-semibold">
//                 {/* {dashData.doctors ?? "N/A"} */}
//                 {doctorCount ?? "N/A"}
//               </p>
//               <p className="text-gray-500 text-sm">Doctors</p>
//             </div>
//           </div>

//           {/* Appointments */}
//           <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all">
//             <img
//               src={assets.appointment_icon}
//               alt="Appointments"
//               className="w-12 h-12 "
//             />
//             <div>
//               <p className="text-xl font-semibold">
//                 {stats.totalAppointments ?? "N/A"}
//               </p>
//               <p className="text-gray-500 text-sm">Appointments</p>
//             </div>
//           </div>

//           {/* Patients */}
//           <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all">
//             <img
//               src={assets.patients_icon}
//               alt="Patients"
//               className="w-12 h-12"
//             />
//             <div>
//               <p className="text-xl font-semibold">
//                 {stats.totalPatients ?? "N/A"}
//               </p>
//               <p className="text-gray-500 text-sm">Patients</p>
//             </div>
//           </div>
//         </div>

//         <div className="bg-white">
//           <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300">
//             <img className="font-semibold" src={assets.list_icon} alt="" />
//             <p>Latest Bookings</p>
//           </div>

//           <div className="pt-4 border border-t-0 border-gray-300">
//             {appointments?.map((item, index) => (
//               <div
//                 className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
//                 key={index}
//               >
//                 <img
//                   className="rounded-full w-10"
//                   src={item.docData.image}
//                   alt=""
//                 />
//                 <div className="flex-1 text-sm">
//                   <p className="text-gray-800 font-medium">
//                     {item.name}
//                   </p>

//                   <p className="text-gray-600">{item.slotDate}</p>
//                 </div>
//                 {item.cancelled ? (
//                   <p className="text-red-400 text-xs font-medium">cancelled</p>
//                 ) : item.isCompleted ? (
//                   <p className="text-green-500 text-xs font-medium">
//                     Completed
//                   </p>
//                 ) : (
//                   <img
//                     onClick={() => cancelAppointmet(item._id)}
//                     className="w-10 cursor-pointer"
//                     src={assets.cancel_icon}
//                     alt=""
//                   />
//                 )}
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
    
//   );
// };

// export default Dashboard;






import React, { useContext, useEffect, useState } from "react";
import { AdminContext } from "../../context/AdminContext";
import { assets } from "../../assets/assets";
import axios from "axios";

const Dashboard = () => {
  const { aToken, backendUrl } = useContext(AdminContext);
  const [doctorCount, setDoctorCount] = useState(0);
  const [doctorList, setDoctorList] = useState([]);
  const [appointments, setAppointments] = useState([]);
  const [stats, setStats] = useState({
    totalEarnings: 0,
    totalAppointments: 0,
    totalPatients: 0,
  });

  const fetchAppointmentStats = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hospitalAdmin/getAppointmentStats`);
      if (res.data.success) {
        setStats({
          totalEarnings: res.data.totalEarnings,
          totalAppointments: res.data.totalAppointments,
          totalPatients: res.data.totalPatients,
        });
      }
    } catch (err) {
      console.log("Failed to fetch stats:", err);
    }
  };

  const fetchDoctors = async () => {
    try {
      const res = await axios.get(`${backendUrl}/hospitalAdmin/getDoctors`, {
        headers: { atoken: aToken },
      });

      if (res.data.success) {
        setDoctorCount(res.data.count);
        setDoctorList(res.data.doctors);
        setAppointments(res.data.latestAppointments);
      }
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchAppointmentStats();
    fetchDoctors();
  }, [aToken]);

  return (
    <div className="m-5 ">
      {/* Top Stats Cards */}
      <div className="flex flex-wrap justify-around">
        {/* Doctors */}
        <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md hover:scale-105 transition-all">
          <img src={assets.doctor_icon} alt="Doctors" className="w-12 h-12" />
          <div>
            <p className="text-xl font-semibold">{doctorCount ?? "N/A"}</p>
            <p className="text-gray-500 text-sm">Doctors</p>
          </div>
        </div>

        {/* Appointments */}
        <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md hover:scale-105 transition-all">
          <img src={assets.appointment_icon} alt="Appointments" className="w-12 h-12" />
          <div>
            <p className="text-xl font-semibold">{stats.totalAppointments ?? "N/A"}</p>
            <p className="text-gray-500 text-sm">Appointments</p>
          </div>
        </div>

        {/* Patients */}
        <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md hover:scale-105 transition-all">
          <img src={assets.patients_icon} alt="Patients" className="w-12 h-12" />
          <div>
            <p className="text-xl font-semibold">{stats.totalPatients ?? "N/A"}</p>
            <p className="text-gray-500 text-sm">Patients</p>
          </div>
        </div>
      </div>

      {/* Latest Bookings */}
      <div className="bg-white mt-10 rounded border border-gray-300">
        <div className="flex items-center gap-2.5 px-4 py-4 border-b border-gray-300 bg-gray-100 rounded-t">
          <img className="font-semibold" src={assets.list_icon} alt="" />
          <p className="font-semibold text-gray-700">Latest Bookings</p>
        </div>

        <div className="overflow-x-auto">
          <div className="min-w-[1020px]">
            {/* Headings */}
            <div className="grid grid-cols-6 font-semibold text-gray-700 px-8 py-2 border-b border-gray-200 bg-gray-100 text-sm">
              <p>Patient</p>
              <p>Doctor</p>
              <p>Slot</p>
              <p>Payment Mode</p>
              <p>Phone Number</p>
              <p>Status</p>
            </div>

            {/* Appointment List */}
            {appointments?.map((item, index) => (
              <div
                className="grid grid-cols-6 items-center px-7  py-3 border-b border-gray-100 hover:bg-gray-50 text-sm"
                key={index}
              >
                {/* Patient */}
                <div className="flex items-center gap-2">
                  <img
                    className="rounded-full w-8 h-8 object-cover"
                    src={item.docData?.image || assets.user_icon}
                    alt="doc"
                  />
                  <p className="text-gray-800 font-medium">{item.name}</p>
                </div>

                {/* Doctor */}
                <p className="text-gray-700">{item.docData?.name || "N/A"}</p>

                {/* Slot */}
                <p className="text-gray-700">{item.slotTime}</p>

                {/* Payment Mode */}
                <p className="text-gray-700">{item.payment ? "Online" : "Cash"}</p>

                {/* Phone Number */}
                <p className="text-gray-700">{item.phone || "N/A"}</p>

                {/* Status */}
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

export default Dashboard;
