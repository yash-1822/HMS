// import React, { useContext } from 'react';
// import { doctors } from '../assets/assets';
// import { useNavigate } from 'react-router-dom';
// // import { AppContext } from '../context/AppContext';

// const TopDoctors = () => {
//     const navigate=useNavigate();
//     // const {doctors}=useContext(AppContext);
//   return (
//     <div className="flex flex-col items-center py-12 text-green-800 font-[Ubuntu] px-4">
//       <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
//       <p className="text-center text-sm sm:w-1/2 w-full">Simply browse through our extensive list of trusted doctors</p>
      
//       <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl cursor-pointer">
//         {doctors.slice(0, 8).map((item, index) => (
//           <div 
//           onClick={()=>navigate(`/appointment/${item._id}`)}
//             key={index} 
//             className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-xs"
//           >
//             <img 
//               src={item.image} 
//               alt={item.name} 
//               className="w-24 h-24 object-cover rounded-full mb-3"
//             />
//             <div className="text-center w-full">
//               <div className="flex flex-col items-center text-green-600 font-medium">
//                 <span className="flex items-center gap-1 text-green-600 text-sm">
//                   <span className="w-2 h-2 bg-green-600 rounded-full"></span>
//                   Available
//                 </span>
//                 <p className="mt-1 text-base text-gray-800">{item.name}</p>
//               </div>
//               <p className="text-gray-600 text-sm mt-1">{item.speciality}</p>
//             </div>
//           </div>
//         ))}
//       </div>
      
//       <button onClick={()=>{navigate('/hospital/:hospitalId/doctors'); scrollTo(0,0)}} className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition">More</button>
//     </div>
//   );
// };

// export default TopDoctors;



import React from 'react';
import { doctors } from '../assets/assets';
import { useNavigate } from 'react-router-dom';

const TopDoctors = () => {
    const navigate = useNavigate();
  
    return (
        <div className="flex flex-col items-center py-12 text-green-800 font-[Ubuntu] px-4">
            <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
            <p className="text-center text-sm sm:w-1/2 w-full">Simply browse through our extensive list of trusted doctors</p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl cursor-pointer">
                {doctors.slice(0, 8).map((item, index) => (
                    <div 
                        onClick={() => navigate(`/hospital/${item.hospitalId}/doctors/${item._id}`)}
                        key={index} 
                        className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-xs"
                    >
                        <img 
                            src={item.image} 
                            alt={item.name} 
                            className="w-24 h-24 object-cover rounded-full mb-3"
                        />
                        <div className="text-center w-full">
                            <div className="flex flex-col items-center text-green-600 font-medium">
                                <span className="flex items-center gap-1 text-green-600 text-sm">
                                    <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                    Available
                                </span>
                                <p className="mt-1 text-base text-gray-800">{item.name}</p>
                            </div>
                            <p className="text-gray-600 text-sm mt-1">{item.speciality}</p>
                        </div>
                    </div>
                ))}
            </div>
            
            <button 
                onClick={() => { navigate('/hospital/:hospitalId/doctors'); scrollTo(0,0); }} 
                className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
            >
                More
            </button>
        </div>
    );
};

export default TopDoctors;