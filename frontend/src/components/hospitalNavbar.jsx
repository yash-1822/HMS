// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import { NavLink, useNavigate } from 'react-router-dom';
// import { FaHospital } from "react-icons/fa";

// const Navbar = () => {
//     const navigate = useNavigate();
//     const { hospitalId } = useParams();
//     const [showMenu, setShowMenu] = useState(false);
//     const [token, setToken] = useState(true);

//     return (
//         <div className='flex items-center justify-between text-sm py-4  border-b border-b-gray-400 px-4'>
//             {/* Logo with Left Padding */}
//             <a href="/" className="text-3xl font-bold text-green-500 flex items-center space-x-2 pl-4">
//                 <FaHospital size={30} />
//                 <span>MediCare</span>
//             </a>

//             <ul className='hidden md:flex items-center gap-12 font-medium'>
//                 <NavLink
//                     to="/hospital/:hospitalId"
//                     className={({ isActive }) =>
//                         `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
//                     }>
//                     <li className="cursor-pointer">Home</li>
//                 </NavLink>
//                 <NavLink
//                     to="/hospital/:id/doctors"
//                     className={({ isActive }) =>
//                         `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
//                     }>
//                     <li className="cursor-pointer">All Doctors</li>
//                 </NavLink>
//                 <NavLink
//                     to="/hospital/:hospitalId/about"
//                     className={({ isActive }) =>
//                         `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
//                     }>
//                     <li className="cursor-pointer">About</li>
//                 </NavLink>
//                 <NavLink
//                     to="/hospital/:hospitalId/contact"
//                     className={({ isActive }) =>
//                         `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
//                     }>
//                     <li className="cursor-pointer">Contact</li>
//                 </NavLink>
//             </ul>

//             {/* User Profile with Right Padding */}
//             <div className="pr-16">
//                 {token ? (
//                     <div className='flex items-center gap-2 cursor-pointer group relative'>
//                         <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
//                         <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
//                         <div className='absolute top-full right-0 mt-2 text-base font-medium text-green-600 z-20 hidden group-hover:block'>
//                             <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg'>
//                                 <p onClick={() => navigate('/my-profile')} className='hover:cursor-pointer text-green-700'>My Profile</p>
//                                 <p onClick={() => navigate('/my-appointments')} className='hover:cursor-pointer text-green-700'>My Appointments</p>
//                                 <p onClick={() => setToken(false)} className='hover:cursor-pointer text-green-700'>Logout</p>
//                             </div>
//                         </div>
//                     </div>
//                 ) : (
//                     <button
//                         onClick={() => navigate('/login')}
//                         className="bg-green-600 text-white px-8 font-bold py-2 rounded-xl hover:bg-green-700 transition hidden md:block"
//                     >
//                         Create Account
//                     </button>
//                 )}
//             </div>
//         </div>
//     );
// };

// export default Navbar;







import React, { useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate,useParams } from 'react-router-dom';
import { FaHospital } from "react-icons/fa";

const Navbar = () => {
    const navigate = useNavigate();
    const { hospitalId } = useParams();
    const [showMenu, setShowMenu] = useState(false);
    const [token, setToken] = useState(true);

    return (
        <div className='flex items-center justify-between text-sm py-4  border-b border-b-gray-400 px-4'>
            {/* Logo with Left Padding */}
            <a href="/" className="text-3xl font-bold text-green-500 flex items-center space-x-2 pl-4">
                <FaHospital size={30} />
                <span>MediCare</span>
            </a>

            <ul className='hidden md:flex items-center gap-12 font-medium'>
                <NavLink
                    to={`/hospital/${hospitalId}`}
                    className={({ isActive }) =>
                        `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
                    }>
                    <li className="cursor-pointer">Home</li>
                </NavLink>
                <NavLink
                    to={`/hospital/${hospitalId}/doctors`}
                    className={({ isActive }) =>
                        `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
                    }>
                    <li className="cursor-pointer">All Doctors</li>
                </NavLink>
                <NavLink
                    to={`/hospital/${hospitalId}/about`}
                    className={({ isActive }) =>
                        `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
                    }>
                    <li className="cursor-pointer">About</li>
                </NavLink>
                <NavLink
                    to={`/hospital/${hospitalId}/contact`}
                    className={({ isActive }) =>
                        `no-underline text-green-700 hover:text-green-600 transition-all ${isActive ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg' : ''}`
                    }>
                    <li className="cursor-pointer">Contact</li>
                </NavLink>
            </ul>

            {/* User Profile with Right Padding */}
            <div className="pr-16">
                {token ? (
                    <div className='flex items-center gap-2 cursor-pointer group relative'>
                        <img className='w-8 rounded-full' src={assets.profile_pic} alt="Profile" />
                        <img className='w-2.5' src={assets.dropdown_icon} alt="Dropdown Icon" />
                        <div className='absolute top-full right-0 mt-2 text-base font-medium text-green-600 z-20 hidden group-hover:block'>
                            <div className='min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg'>
                                <p onClick={() => navigate('/my-profile')} className='hover:cursor-pointer text-green-700'>My Profile</p>
                                <p onClick={() => navigate('/my-appointments')} className='hover:cursor-pointer text-green-700'>My Appointments</p>
                                <p onClick={() => setToken(false)} className='hover:cursor-pointer text-green-700'>Logout</p>
                            </div>
                        </div>
                    </div>
                ) : (
                    <button
                        onClick={() => navigate('/login')}
                        className="bg-green-600 text-white px-8 font-bold py-2 rounded-xl hover:bg-green-700 transition hidden md:block"
                    >
                        Create Account
                    </button>
                )}
            </div>
        </div>
    );
};

export default Navbar;

