// import React, { useContext, useEffect, useState } from 'react';
// import { AppContext } from '../context/AppContext';
// import { useNavigate } from 'react-router-dom';
// import { doctors } from "../assets/assets";

// const RelatedDoctors = ({ speciality, docId }) => {
//   // const { doctors } = useContext(AppContext);
//   const navigate = useNavigate();
//   const [relDoc, setRelDocs] = useState([]);

//   useEffect(() => {
//     if (doctors.length > 0 && speciality) {
//       const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
//       setRelDocs(doctorsData);
//     }
//   }, [doctors, speciality, docId]);

//   return (
//     <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
//       <h1 className="text-3xl font-medium">Related Doctors</h1>
//       <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

//       <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
//         {relDoc.slice(0, 5).map((item, index) => (
//           <div
//             onClick={() => {
//               navigate(`/hospital/doctors/appointment`);
//               window.scrollTo(0, 0);
//             }}
//             className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
//             key={index}
//           >
//             <img className="bg-blue-50" src={item.image} alt="" />
//             <div className="p-4">
//               <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//               <p className="text-gray-600 text-sm">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// };

// export default RelatedDoctors;



import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctors } from "../assets/assets";

const RelatedDoctors = ({ speciality, docId, hospitalId }) => {
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
    if (doctors.length > 0 && speciality) {
      const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== docId);
      setRelDocs(doctorsData);
    }
  }, [speciality, docId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/hospital/${hospitalId}/doctors/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50 w-full h-40 object-cover" src={item.image} alt={item.name} />
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
