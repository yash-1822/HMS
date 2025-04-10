import React from 'react';
import { specialityData } from '../assets/assets';
import { Link } from 'react-router-dom';
import { AppContext } from "../context/AppContext";

const SpecialityMenu = () => {
  return (
    <div id='speciality' className='flex flex-col items-center gap-4 py-12 text-green-800'>
      <h1 className='text-3xl font-medium text-center px-4'>Find by Speciality</h1>
      <p className='sm:w-1/3 w-5/6 text-center text-sm'>Simply browse through our extensive list of trusted doctors, schedule your appointment hassle-free.</p>
      <div className="flex gap-6 sm:gap-10 pt-5 w-full overflow-x-auto sm:justify-center scrollbar-hide px-4">
        {specialityData.map((item, index) => (
          <Link 
          onClick={()=>scrollTo(0,0)}
            key={index} 
            to={`/hospital/:id/doctors/${item.speciality}`} 
            className="flex flex-col items-center gap-1 transform transition duration-300 hover:scale-105 hover:text-green-600"
          >
            <img 
              src={item.image} 
              alt={item.speciality} 
              className="w-14 h-14 sm:w-20 sm:h-20 object-cover rounded-full shadow-md" 
            />
            <p className="mt-2 text-xs sm:text-sm font-medium text-center">{item.speciality}</p>
          </Link>
        ))}
      </div>
      <style>
        {`
          .scrollbar-hide::-webkit-scrollbar {
            display: none;
          }
          .scrollbar-hide {
            -ms-overflow-style: none;
            scrollbar-width: none;
          }
        `}
      </style>
    </div>
  );
};

export default SpecialityMenu;






