// import { useState, useEffect } from "react";
// import {
//   FaMicrophone,
//   FaMapMarkerAlt,
//   FaChevronDown,
//   FaBars,
//   FaTimes,
//   FaUser,
//   FaCalendarAlt,
//   FaSignOutAlt,
//   FaInfoCircle,
//   FaHospital
// } from "react-icons/fa";

// const Navbar = () => {
//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(false);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//     };
//     handleResize();
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   useEffect(() => {
//     if (!isMobile) {
//       const handleClickOutside = (event) => {
//         if (!event.target.closest(".profile-menu")) {
//           setIsProfileOpen(false);
//         }
//       };
//       document.addEventListener("mousedown", handleClickOutside);
//       return () => document.removeEventListener("mousedown", handleClickOutside);
//     }
//   }, [isMobile]);

//   const toggleMobileMenu = () => {
//     setIsMobileMenuOpen(!isMobileMenuOpen);
//   };

//   return (
//     <nav className="bg-green-600 text-white shadow-md relative z-50">  
//       <div className="container px-4 py-5 flex items-center justify-center">
//         <a href="/" className="text-2xl font-bold text-white flex items-center space-x-2">
//           <FaHospital size={30} />
//           <span>MediCare</span>
//         </a>
//         {isMobile ? (
//           <button onClick={toggleMobileMenu} className="text-white">
//             <FaBars size={24} />
//           </button>
//         ) : (
//           <div className="flex items-center space-x-10 flex-grow justify-end">
//             <div className="relative flex-grow max-w-xl md:max-w-lg sm:max-w-sm">
//               <input
//                 type="text"
//                 placeholder="Search hospitals, doctors, or diseases"
//                 className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-white placeholder:font-semibold"
//               />
//               <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-600">
//                 <FaMicrophone />
//               </button>
//             </div>
//             <button className="text-white hover:text-green-200">
//               <FaMapMarkerAlt size={20} />
//             </button>

//             {/* Profile Section - Fixed Dropdown */}
//             <div className="relative profile-menu z-50">
//               <button
//                 onClick={() => setIsProfileOpen(!isProfileOpen)}
//                 className="flex items-center space-x-1 text-white hover:text-green-200"
//               >
//                 <FaUser size={17} />
//                 <span className="font-bold">My Profile</span>
//                 <FaChevronDown />
//               </button>
//               {isProfileOpen && (
//                 <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-900 z-50">
//                   <a href="/profile" className="flex items-center font-semibold px-4 py-2 text-sm hover:bg-gray-200">
//                     <FaUser className="mr-2" /> My Profile
//                   </a>
//                   <a href="/appointments" className="flex items-center font-semibold px-4 py-2 text-sm hover:bg-gray-200">
//                     <FaCalendarAlt className="mr-2" /> My Appointments
//                   </a>
//                   <a href="/login" className="flex font-semibold items-center px-4 py-2 text-sm hover:bg-gray-200">
//                     <FaSignOutAlt className="mr-2" /> Login
//                   </a>
//                 </div>
//               )}
//             </div>

//             <a href="/about" className="text-white font-bold hover:text-green-200">
//               About Us
//             </a>
//           </div>
//         )}
//       </div>
//     </nav>
//   );
// };

// export default Navbar;


import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

import {
  FaMicrophone,
  FaMapMarkerAlt,
  FaChevronDown,
  FaBars,
  FaTimes,
  FaUser,
  FaCalendarAlt,
  FaSignOutAlt,
  FaInfoCircle,
  FaHospital,
} from "react-icons/fa";

const Navbar = ({ setSearchQuery, searchQuery }) => {

  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [isListening, setIsListening] = useState(false);
  const [isAuthenticated,setIsAuthenticated] = useState(false)


  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/patient/logout", {
        credentials: "include",
        method: "POST",
      });
  
      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }
  
      // Clear the token from cookies
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
  
      toast.success("Logout successful!", {
        onClose: () => {
          setIsAuthenticated(false);
          navigate("/login");
        },
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };
  

  // useEffect(() => {
  //   const checkAuth = () => {
  //     // Check if the token exists in cookies
  //     const cookies = document.cookie.split("; ");
  //     const tokenCookie = cookies.find((row) => row.startsWith("token="));
  
  //     console.log("cookies is",cookies);

  //     if (tokenCookie) {
  //       setIsAuthenticated(true);
  //     } else {
  //       setIsAuthenticated(false);
  //     }
  //   };
  
  //   checkAuth();
  // }, []);


  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/patient/verify-token", {
          credentials: "include", // Sends cookies with the request
        });
  
        if (response.ok) {
          const data = await response.json();
          console.log("from mainnavbar is:",data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
        setIsAuthenticated(false);
      }
    };
  
    checkAuth();
  }, []);


  console.log("isAuthenticated",isAuthenticated)
  

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
      setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => setIsListening(true);
    recognition.onresult = (event) => {
      setSearchQuery(event.results[0][0].transcript);
      setIsListening(false);
    };
    recognition.onerror = () => setIsListening(false);
    recognition.onend = () => setIsListening(false);

    recognition.start();
  };

  return (
    <nav className="bg-green-600 text-white shadow-md relative z-50">
      <div className="container px-3 py-4 flex items-center justify-between">
        {/* 📌 Mobile & Tablet View */}
        {(isMobile || isTablet) ? (
          <div className="flex items-center justify-between w-full">
            {/* Mobile: Hamburger (Left) */}
            {isMobile && (
              <button onClick={() => setIsSidebarOpen(true)} className="text-white me-5">
                <FaBars size={24} />
              </button>
            )}

            {/* Tablet: Logo (Left) */}
            {isTablet && (
              <a href="/" className="text-2xl font-bold flex items-center space-x-2">
                <FaHospital size={30} />
                <span>MediCare</span>
              </a>
            )}

            {/* Search Bar (Center) */}
            <div className="relative flex-grow max-w-md mx-auto -ms-sm-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMobile ? "Search..." : "Search hospitals, doctors, or diseases"}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
              />
              <button
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"
                  }`}
                onClick={handleVoiceSearch}
              >
                <FaMicrophone />
              </button>
            </div>

            {/* Tablet: Hamburger (Right) */}
            {isTablet && (
              <button onClick={() => setIsSidebarOpen(true)} className="text-white ml-4">
                <FaBars size={24} />
              </button>
            )}
          </div>
        ) : (
          /* 📌 Desktop View */
          <div className="flex items-center justify-between w-full">
            {/* Logo */}
            <a href="/" className="text-2xl font-bold flex items-center space-x-2">
              <FaHospital size={30} />
              <span>MediCare</span>
            </a>

            {/* Search Bar */}
            <div className="relative flex-grow max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospitals, doctors, or diseases"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
              />
              <button
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"
                  }`}
                onClick={handleVoiceSearch}
              >
                <FaMicrophone />
              </button>
            </div>

            {/* Profile and Links */}
            <div className="flex items-center space-x-6">
              <button className="text-white hover:text-green-200">
                <FaMapMarkerAlt size={20} />
              </button>
              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-1">
                  <FaUser size={17} />
                  <span className="font-bold">My Profile</span>
                  <FaChevronDown />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-900">
                    <a href="/profile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
                      <FaUser className="mr-2" /> My Profile
                    </a>
                    <a href="/appointments" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
                      <FaCalendarAlt className="mr-2" /> My Appointments
                    </a>
                    {isAuthenticated ? (
                      <button
                        onClick={handleLogout}
                        className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-200"
                      >
                        <FaSignOutAlt className="mr-2" /> Logout
                      </button>
                    ) : (
                      <a href="/login" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
                        <FaSignOutAlt className="mr-2" /> Login
                      </a>
                    )}
                  </div>
                )}
              </div>
              <a href="/about" className="font-bold hover:text-green-200">
                About Us
              </a>
            </div>
          </div>
        )}
      </div>

      {/* 📌 Sidebar for Mobile & Tablet */}
      {isSidebarOpen && (
        <div className="fixed inset-0 ">
          <div className="fixed left-0 top-0 w-3/4 max-w-xs h-full bg-white text-gray-900 shadow-lg transform transition-transform">
            <div className="p-5 flex justify-between items-center bg-green-600 text-white">
              <h2 className="text-xl font-bold flex items-center space-x-2">
                <FaHospital size={25} />
                <span>MediCare</span>
              </h2>
              <button onClick={() => setIsSidebarOpen(false)}>
                <FaTimes size={24} />
              </button>
            </div>

            <div className="p-5 space-y-4">
              <a href="/profile" className="flex items-center space-x-2 text-lg hover:text-green-600">
                <FaUser />
                <span>My Profile</span>
              </a>
              <a href="/appointments" className="flex items-center space-x-2 text-lg hover:text-green-600">
                <FaCalendarAlt />
                <span>My Appointments</span>
              </a>
              <a href="/login" className="flex items-center space-x-2 text-lg hover:text-green-600">
                <FaSignOutAlt />
                <span>Login</span>
              </a>
              <a href="/about" className="flex items-center space-x-2 text-lg hover:text-green-600">
                <FaInfoCircle />
                <span>About Us</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;






