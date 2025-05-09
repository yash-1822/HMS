// import React from 'react';
// import { useContext,useState,useEffect } from 'react';
// import { useLocation, useParams } from 'react-router-dom';
// import { MapPin, Phone, Mail, Stethoscope, FileCheck2 } from 'lucide-react';
// import { FaStar } from 'react-icons/fa';
// import { SuperAdminContext } from '../../context/SuperAdminContext';
// import axios from 'axios';

// const HospitalDetails = () => {
//   // const { id } = useParams();
//   const { hospitalId } = useParams();
//   const { state } = useLocation();
//   const { backendUrl } = useContext(SuperAdminContext);
//   const [hospital, setHospital] = useState();
//   const [loading, setLoading] = useState(true);
  

//   console.log("hospital id is:",hospitalId)
//   console.log("hospital data is:",hospital);
  


//   const fetchHospitalDetails = async () => {
//     try {
//       const { data } = await axios.get(`${backendUrl}/superadmin/getHospital/${hospitalId}`);
//       if (data.success) {
//         setHospital(data.data);
//       }
//     } catch (error) {
//       console.error("Failed to fetch hospital details", error);
//     } finally {
//       setLoading(false);
//     }
//   };
 

  
//   useEffect(() => {
//       fetchHospitalDetails()
//   }, [hospitalId]);

  
//   if (loading) return <div className="p-6 text-center text-gray-600 ml-64">Loading...</div>;

//   if (!hospital) {
//     return (
//       <div className="p-6 text-center text-gray-600 ml-64">
//         <p>Hospital not found. Please go back and try again.</p>
//       </div>
//     );
//   }

//   return (
//     <div className="h-full w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-10 p-5 pt-[80px]  animate-fadeIn ">
//       {/* Image Section */}
//       <div className="flex-shrink-0 w-full md:w-[500px]">
//         <img
//           src={hospital.image}
//           alt={hospital.name}
//           className="w-full h-[400px] object-cover rounded-xl"
//         />
//       </div>

//       {/* Details Section */}
//       <div className="flex flex-col gap-4 max-w-xl">
//         <h2 className="text-3xl font-bold text-gray-800">{hospital.name}</h2>

//         {/* Ratings & Location */}
//         <div className="flex items-center gap-4 flex-wrap">
//           <div className="flex items-center gap-1 text-yellow-500">
//             {Array.from({ length: 5 }).map((_, idx) => (
//               <FaStar key={idx} className="text-xl" />
//             ))}
//           </div>

//           <div className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
//             <MapPin className="text-red-500" size={16} />
//             <span>{hospital.location}</span>
//           </div>
//         </div>

//         {/* Extra Details */}
//         <div className="space-y-2 text-sm text-gray-700">
//           <div className="flex items-center gap-2">
//             <Phone size={16} className="text-blue-500" />
//             <span className="font-medium">Phone:</span>
//             <span>{hospital.contact}</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <Mail size={16} className="text-green-500" />
//             <span className="font-medium">Email:</span>
//             <span>{hospital.email || 'info@hospital.org'}</span>
//           </div>

//           <div className="flex items-center gap-2">
//             <Stethoscope size={16} className="text-purple-500" />
//             <span className="font-medium">Specialty:</span>
//             <span>{hospital.specialty}</span>
//           </div>

//           <div className="flex items-start gap-2">
//             <FileCheck2 size={16} className="text-teal-500 mt-1" />
//             <div>
//               <span className="font-medium">Certificates:</span>
//               <div className="flex flex-wrap gap-2 mt-1">
//                 {(hospital.certificates || []).map((cert, index) => (
//                   <span
//                     key={index}
//                     className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
//                   >
//                     {cert}
//                   </span>
//                 ))}
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Description */}
//         <p className="text-gray-600 leading-relaxed">
//           We provide top-tier healthcare services with experienced doctors,
//           modern facilities, and seamless appointment booking.
//         </p>

//         {/* Buttons */}
//         <div className="flex gap-4 mt-2">
//           <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium">
//             Book Appointment
//           </button>
//           <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
//             About
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default HospitalDetails;






import React, { useContext, useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { MapPin, Phone, Mail, Stethoscope, FileCheck2 } from 'lucide-react';
import { FaStar } from 'react-icons/fa';
import { SuperAdminContext } from '../../context/SuperAdminContext';
import axios from 'axios';

const HospitalDetails = () => {
  const { hospitalId } = useParams();
  const { backendUrl } = useContext(SuperAdminContext);
  const [hospital, setHospital] = useState();
  const [loading, setLoading] = useState(true);

  const fetchHospitalDetails = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/superadmin/getHospital/${hospitalId}`);
      if (data.success) {
        setHospital(data.data);
      }
    } catch (error) {
      console.error("Failed to fetch hospital details", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHospitalDetails();
  }, [hospitalId]);

  if (loading) return <div className="p-6 text-center text-gray-600 ml-64">Loading...</div>;

  if (!hospital) {
    return (
      <div className="p-6 text-center text-gray-600 ml-64">
        <p>Hospital not found. Please go back and try again.</p>
      </div>
    );
  }

  return (
    // <div className="h-full w-full flex flex-col md:flex-row justify-center items-center md:items-start gap-10 p-5 pt-[80px] animate-fadeIn">
    //   {/* Image Section */}
    //   <div className="flex-shrink-0 w-full md:w-[500px]">
    //     <img
    //       src={hospital.Featured_Image}
    //       alt={hospital.Place_name}
    //       className="w-full h-[400px] object-cover rounded-xl"
    //     />
    //   </div>

    //   {/* Details Section */}
    //   <div className="flex flex-col gap-4 max-w-xl">
    //     <h2 className="text-3xl font-bold text-gray-800">{hospital.Place_name}</h2>

    //     {/* Ratings & Location */}
    //     <div className="flex items-center gap-4 flex-wrap">
    //       <div className="flex items-center gap-1 text-yellow-500">
    //         {Array.from({ length: Math.round(hospital.Total_score) }).map((_, idx) => (
    //           <FaStar key={idx} className="text-xl" />
    //         ))}
    //       </div>

    //       <div className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
    //         <MapPin className="text-red-500" size={16} />
    //         <a href={hospital.Location} target="_blank" rel="noopener noreferrer">
    //           <span>View on Maps</span>
    //         </a>
    //       </div>
    //     </div>

    //     {/* Extra Details */}
    //     <div className="space-y-2 text-sm text-gray-700">
    //       <div className="flex items-center gap-2">
    //         <Phone size={16} className="text-blue-500" />
    //         <span className="font-medium">Phone:</span>
    //         <span>{hospital.Phone}</span>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <Mail size={16} className="text-green-500" />
    //         <span className="font-medium">Email:</span>
    //         <span>{hospital.Email}</span>
    //       </div>

    //       <div className="flex items-center gap-2">
    //         <Stethoscope size={16} className="text-purple-500" />
    //         <span className="font-medium">Specialities:</span>
    //         <span>{hospital.Speciality?.join(', ')}</span>
    //       </div>

    //       <div className="flex items-start gap-2">
    //         <FileCheck2 size={16} className="text-teal-500 mt-1" />
    //         <div>
    //           <span className="font-medium">Specializations:</span>
    //           <div className="flex flex-wrap gap-2 mt-1">
    //             {hospital.specializations?.map((spec, index) => (
    //               <span
    //                 key={index}
    //                 className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
    //               >
    //                 {spec}
    //               </span>
    //             ))}
    //           </div>
    //         </div>
    //       </div>

    //       <div className="text-sm mt-2">
    //         <p><span className="font-semibold">Address:</span> {hospital.Address1}</p>
    //         <p><span className="font-semibold">District:</span> {hospital.District}</p>
    //         <p><span className="font-semibold">State:</span> {hospital.State}</p>
    //         <p><span className="font-semibold">Pincode:</span> {hospital.Pincode}</p>
    //       </div>
    //     </div>

    //     {/* Description */}
    //     <p className="text-gray-600 leading-relaxed mt-2">
    //       We provide top-tier healthcare services with experienced doctors, modern facilities,
    //       and seamless appointment booking.
    //     </p>

    //     {/* Buttons */}
    //     <div className="flex gap-4 mt-4">
    //       <button className="bg-green-600 hover:bg-green-700 text-white px-6 py-2 rounded-full font-medium">
    //         Book Appointment
    //       </button>
    //       <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-full font-medium">
    //         About
    //       </button>
    //     </div>
    //   </div>
    // </div>



    <div className="h-full  w-full flex flex-col md:flex-row justify-center items-start gap-8 p-5 pt-[80px] animate-fadeIn">
  {/* Image Section */}
  <div className="flex-shrink-0 w-[370px]  h-[440px]">
    <img
      src={hospital.Featured_Image}
      alt={hospital.Place_name}
      className="w-full h-full object-cover rounded-xl"
    />
  </div>

  {/* Details Section */}
  <div className="flex flex-col gap-4 w-full">
    <h2 className="text-2xl font-bold text-gray-800">{hospital.Place_name}</h2>

    {/* Ratings & Location */}
    <div className="flex items-center gap-4 flex-wrap">
      <div className="flex items-center gap-1 text-yellow-500">
        {Array.from({ length: Math.round(hospital.Total_score) }).map((_, idx) => (
          <FaStar key={idx} className="text-xl" />
        ))}
      </div>

      <div className="flex items-center gap-2 bg-gray-100 text-gray-700 text-sm px-3 py-1 rounded-full">
        <MapPin className="text-red-500" size={16} />
        <a href={hospital.Location} target="_blank" rel="noopener noreferrer">
          <span>View on Maps</span>
        </a>
      </div>
    </div>

    {/* Extra Details */}
    <div className="space-y-2 text-sm text-gray-700">
      <div className="flex items-center gap-2">
        <Phone size={16} className="text-blue-500" />
        <span className="font-medium">Phone:</span>
        <span>{hospital.Phone}</span>
      </div>

      <div className="flex items-center gap-2">
        <Mail size={16} className="text-green-500" />
        <span className="font-medium">Email:</span>
        <span>{hospital.Email}</span>
      </div>

      <div className="flex items-center gap-2">
        <Stethoscope size={16} className="text-purple-500" />
        <span className="font-medium">Specialities:</span>
        <span>{hospital.Speciality?.join(', ')}</span>
      </div>

      <div className="flex items-start gap-2">
        <FileCheck2 size={1} className="text-teal-500 mt-1" />
        <div>
          <span className="font-medium">Specializations:</span>
          <div className="flex flex-wrap gap-2 mt-1">
            {hospital.specializations?.map((spec, index) => (
              <span
                key={index}
                className="bg-blue-100 text-blue-800 text-xs px-3 py-1 rounded-full"
              >
                {spec}
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="text-sm mt-3">
        <p className='mb-1'><span className="font-semibold ">Address:</span> {hospital.Address1}</p>
        <p className='mb-1'><span className="font-semibold ">District:</span> {hospital.District}</p>
        <p className='mb-1'><span className="font-semibold ">State:</span> {hospital.State}</p>
        <p className='mb-1'><span className="font-semibold ">Pincode:</span> {hospital.Pincode}</p>
      </div>
    </div>
  </div>
</div>

  );
};

export default HospitalDetails;
