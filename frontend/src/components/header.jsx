// import React from 'react'
// import { assets } from '../assets/assets'

// const Header = () => {
//   return (
//     <div className='flex flex-col md:flex-row flex-wrap bg-green-500 rounded-lg px-6 md:px-10 lg:px-20'>
//         <div className="md:w-1/2 flex flex-col items-start justify-center gap-4 py-10 m-auto md:py-[10vw] md:mb-[-30px]">
//             <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight md:leading-tight lg:leading-tight'>Book Appointment <br /> With Trusted Doctors</p>
//         </div>
//         <div className="flex flex-col md:flex-row items-center gap-3 text-white text-small font-light">
//             <img  className='w-28 ' src={assets.group_profiles} alt="" />
//             <p>Simply browse through our extensive list of Trusted doctors, <br className='hidden sm:block' />schedule your appointment hassle-free.</p>
//         </div>
//         <a href="#speciality" className='flex items-center gap-2 bg-white px-8 py-3 rounded-full text-gray-600 text-sm m-auto md:m-0 hover:scale-105 transition-all duration-300'>
//             Book Appointment <img className='w-3' src={assets.arrow_icon} alt="" />
//         </a>
//         <div className="md:w-1/2 relative ">
//             <img className='w-full md:absoulte bottom-0 h-auto rounded-lg' src={assets.header_img} alt="" />
//         </div>
//     </div>
//   )
// }

// export default Header

import React from 'react';
import { assets } from '../assets/assets';

const Header = () => {
  return (
    <div className='flex flex-col md:flex-row items-center bg-green-500 rounded-lg px-6 md:px-10 lg:px-20 py-10 md:py-[0.4vw]'>
      {/* Left Section - Heading & Text */}
      <div className="md:w-1/2 flex flex-col items-start gap-4 text-center md:text-left">
        <p className='text-3xl md:text-4xl lg:text-5xl text-white font-semibold leading-tight'>
          Book Appointment <br /> With Trusted Doctors
        </p>
        <div className="flex items-center gap-3 text-white text-sm font-light">
          <img className='w-24' src={assets.group_profiles} alt="Profiles" />
          <p>
            Simply browse through our extensive list of trusted doctors, <br className='hidden sm:block' />
            schedule your appointment hassle-free.
          </p>
        </div>
        <a href="#speciality" className='flex items-center gap-2 bg-white px-6 py-3 rounded-full text-gray-600 text-sm font-medium mt-4 hover:scale-105 transition-all duration-300 shadow-md'>
          Book Appointment <img className='w-3' src={assets.arrow_icon} alt="Arrow" />
        </a>
      </div>

      {/* Right Section - Image */}
      <div className="md:w-1/2 flex justify-center items-center mt-6 mb-0 md:mt-0">
        <img className='w-full max-w-sm md:max-w-md lg:max-w-lg justify-center rounded-lg shadow-lg object-cover' src={assets.header_img} alt="Doctor Consultation" />
      </div>
    </div>
  );
};

export default Header;
