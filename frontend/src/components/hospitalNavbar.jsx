// import React, { useState } from 'react';
// import { assets } from '../assets/assets';
// import { NavLink, useNavigate, useParams } from 'react-router-dom';
// import { FaHospital } from 'react-icons/fa';
// import { HiOutlineMenuAlt3 } from 'react-icons/hi';
// import { IoClose } from 'react-icons/io5';

// const Navbar = () => {
//   const navigate = useNavigate();
//   const { hospitalId } = useParams();
//   const [showMenu, setShowMenu] = useState(false);
//   const [token, setToken] = useState(true);

//   const navLinks = (
//     <>
//       {/* <NavLink
//         to={`/hospital/${hospitalId}`}
//         className={({ isActive }) =>
//           `no-underline text-green-700 hover:text-green-600 transition-all ${
//             isActive
//               ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
//               : ''
//           }`
//         }>
//         <li className="cursor-pointer">Home</li>
//       </NavLink> */}

// <NavLink
//   to={`/hospital/${hospitalId}`}
//   end
//   className={({ isActive }) =>
//     `no-underline text-green-700 hover:text-green-600 transition-all ${
//       isActive
//         ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
//         : ''
//     }`
//   }>
//   Home
// </NavLink>

//       <NavLink
//         to={`/hospital/${hospitalId}/doctors`}
//         className={({ isActive }) =>
//           `no-underline text-green-700 hover:text-green-600 transition-all ${
//             isActive
//               ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
//               : ''
//           }`
//         }>
//         <li className="cursor-pointer">All Doctors</li>
//       </NavLink>
//       <NavLink
//         to={`/hospital/${hospitalId}/about`}
//         className={({ isActive }) =>
//           `no-underline text-green-700 hover:text-green-600 transition-all ${
//             isActive
//               ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
//               : ''
//           }`
//         }>
//         <li className="cursor-pointer">About</li>
//       </NavLink>
//       <NavLink
//         to={`/hospital/${hospitalId}/contact`}
//         className={({ isActive }) =>
//           `no-underline text-green-700 hover:text-green-600 transition-all ${
//             isActive
//               ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
//               : ''
//           }`
//         }>
//         <li className="cursor-pointer">Contact</li>
//       </NavLink>
//     </>
//   );

//   return (
//     <div className="relative border-b border-b-gray-400 bg-white z-50">
//       {/* Navbar row */}
//       <div className="flex items-center justify-between py-4 px-4 md:px-8">
//         {/* Left: Hamburger + Logo */}
//         <div className="flex items-center gap-4">
//           {/* Hamburger (mobile only) */}
//           <div className="md:hidden">
//             <button onClick={() => setShowMenu(true)}>
//               <HiOutlineMenuAlt3 size={26} className="text-green-600" />
//             </button>
//           </div>

//           {/* Logo */}
//           <a
//             href="/"
//             className="text-2xl font-bold text-green-500 flex items-center space-x-2">
//             <FaHospital size={24} />
//             <span>MediCare</span>
//           </a>
//         </div>

//         {/* Center: NavLinks (desktop only) */}
//         <ul className="hidden md:flex items-center gap-15 font-medium">
//           {navLinks}
//         </ul>

//         {/* Right: Profile/Login */}
//         <div>
//           {token ? (
//             <div className="flex items-center gap-2 cursor-pointer group relative">
//               <img
//                 className="w-8 rounded-full"
//                 src={assets.profile_pic}
//                 alt="Profile"
//               />
//               <img
//                 className="w-2.5"
//                 src={assets.dropdown_icon}
//                 alt="Dropdown Icon"
//               />
//               <div className="absolute top-full right-0 mt-2 text-base font-medium text-green-600 z-20 hidden group-hover:block">
//                 <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
//                   <p
//                     onClick={() => navigate('/myProfile')}
//                     className="hover:cursor-pointer text-green-700">
//                     My Profile
//                   </p>
//                   <p
//                     onClick={() => navigate('/myAppointments')}
//                     className="hover:cursor-pointer text-green-700">
//                     My Appointments
//                   </p>
//                   <p
//                     onClick={() => setToken(false)}
//                     className="hover:cursor-pointer text-green-700">
//                     Logout
//                   </p>
//                 </div>
//               </div>
//             </div>
//           ) : (
//             <button
//               onClick={() => navigate('/login')}
//               className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition hidden md:block">
//               Create Account
//             </button>
//           )}
//         </div>
//       </div>

//       {/* Mobile Sidebar Menu */}
//       <div
//         className={`fixed top-0 left-0 w-64 h-full bg-white z-40 shadow-lg transform transition-transform duration-300 ${
//           showMenu ? 'translate-x-0' : '-translate-x-full'
//         }`}>
//         <div className="flex justify-between items-center px-4 py-5 border-b">
//           <span className="text-green-600 font-bold text-lg">Menu</span>
//           <button onClick={() => setShowMenu(false)}>
//             <IoClose size={26} />
//           </button>
//         </div>
//         <ul className="flex flex-col gap-6 text-green-800 font-medium px-6 py-4">
//           {navLinks}
//         </ul>
//       </div>

//       {/* Overlay */}
//       {showMenu && (
//         <div
//           className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-30"
//           onClick={() => setShowMenu(false)}
//         />
//       )}
//     </div>
//   );
// };

// export default Navbar;



import React, { useState, useEffect, useRef } from 'react';
import { assets } from '../assets/assets';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { FaHospital } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { IoClose } from 'react-icons/io5';

const Navbar = () => {
  const navigate = useNavigate();
  const { hospitalId } = useParams();
  const [showMenu, setShowMenu] = useState(false);
  const [token, setToken] = useState(true);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target)
      ) {
        setDropdownOpen(false);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const navLinks = (
    <>
      <NavLink
        to={`/hospital/${hospitalId}`}
        end
        className={({ isActive }) =>
          `no-underline text-green-700 hover:text-green-600 transition-all ${
            isActive
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
              : ''
          }`
        }>
        Home
      </NavLink>

      <NavLink
        to={`/hospital/${hospitalId}/doctors`}
        className={({ isActive }) =>
          `no-underline text-green-700 hover:text-green-600 transition-all ${
            isActive
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
              : ''
          }`
        }>
        <li className="cursor-pointer">All Doctors</li>
      </NavLink>
      <NavLink
        to={`/hospital/${hospitalId}/about`}
        className={({ isActive }) =>
          `no-underline text-green-700 hover:text-green-600 transition-all ${
            isActive
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
              : ''
          }`
        }>
        <li className="cursor-pointer">About</li>
      </NavLink>
      <NavLink
        to={`/hospital/${hospitalId}/contact`}
        className={({ isActive }) =>
          `no-underline text-green-700 hover:text-green-600 transition-all ${
            isActive
              ? 'text-transparent bg-clip-text bg-gradient-to-r from-green-500 to-green-700 font-semibold text-lg drop-shadow-lg'
              : ''
          }`
        }>
        <li className="cursor-pointer">Contact</li>
      </NavLink>
    </>
  );

  return (
    <div className="relative border-b border-b-gray-400 bg-white z-50">
      {/* Navbar row */}
      <div className="flex items-center justify-between py-4 px-4 md:px-8">
        {/* Left: Hamburger + Logo */}
        <div className="flex items-center gap-4">
          {/* Hamburger (mobile only) */}
          <div className="md:hidden">
            <button onClick={() => setShowMenu(true)}>
              <HiOutlineMenuAlt3 size={26} className="text-green-600" />
            </button>
          </div>

          {/* Logo */}
          <a
            href="/"
            className="text-2xl font-bold text-green-500 flex items-center space-x-2">
            <FaHospital size={24} />
            <span>MediCare</span>
          </a>
        </div>

        {/* Center: NavLinks (desktop only) */}
        <ul className="hidden md:flex items-center gap-15 font-medium">
          {navLinks}
        </ul>

        {/* Right: Profile/Login */}
        <div ref={dropdownRef}>
          {token ? (
            <div
              className="flex items-center gap-2 cursor-pointer relative"
              onClick={() => setDropdownOpen((prev) => !prev)}
            >
              <img
                className="w-8 rounded-full"
                src={assets.profile_pic}
                alt="Profile"
              />
              <img
                className="w-2.5"
                src={assets.dropdown_icon}
                alt="Dropdown Icon"
              />
              {dropdownOpen && (
                <div className="absolute top-full right-0 mt-2 text-base font-medium text-green-600 z-20">
                  <div className="min-w-48 bg-stone-100 rounded flex flex-col gap-4 p-4 shadow-lg">
                    <p
                      onClick={() => {
                        navigate('/myProfile');
                        setDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer text-green-700"
                    >
                      My Profile
                    </p>
                    <p
                      onClick={() => {
                        navigate('/myAppointments');
                        setDropdownOpen(false);
                      }}
                      className="hover:cursor-pointer text-green-700"
                    >
                      My Appointments
                    </p>
                    <p
                      onClick={() => {
                        navigate('/')
                      }}
                      className="hover:cursor-pointer text-green-700"
                    >
                      Logout
                    </p>
                  </div>
                </div>
              )}
            </div>
          ) : (
            <button
              onClick={() => navigate('/login')}
              className="bg-green-600 text-white px-4 py-2 rounded-xl hover:bg-green-700 transition hidden md:block"
            >
              Create Account
            </button>
          )}
        </div>
      </div>

      {/* Mobile Sidebar Menu */}
      <div
        className={`fixed top-0 left-0 w-64 h-full bg-white z-40 shadow-lg transform transition-transform duration-300 ${
          showMenu ? 'translate-x-0' : '-translate-x-full'
        }`}>
        <div className="flex justify-between items-center px-4 py-5 border-b">
          <span className="text-green-600 font-bold text-lg">Menu</span>
          <button onClick={() => setShowMenu(false)}>
            <IoClose size={26} />
          </button>
        </div>
        <ul className="flex flex-col gap-6 text-green-800 font-medium px-6 py-4">
          {navLinks}
        </ul>
      </div>

      {/* Overlay */}
      {showMenu && (
        <div
          className="fixed top-0 left-0 w-full h-full bg-black opacity-30 z-30"
          onClick={() => setShowMenu(false)}
        />
      )}
    </div>
  );
};

export default Navbar;
