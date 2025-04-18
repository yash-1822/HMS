// import { useState, useEffect } from "react";
// import { toast } from "react-toastify";
// import { useNavigate } from "react-router-dom";
// import Cookies from "js-cookie";

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
//   FaHospital,
// } from "react-icons/fa";

// const locationOptions = [
//   "Anantapur",
//   "Chittoor",
//   "East Godavari",
//   "Guntur",
//   "Kadapa",
//   "Krishna",
//   "Kurnool",
//   "Nellore",
//   "Prakasam",
//   "Srikakulam",
//   "Visakhapatnam",
//   "Vizianagaram",
//   "West Godavari",
// ];

// const Navbar = ({ setSearchQuery, searchQuery }) => {
//   const navigate = useNavigate();

//   const [isProfileOpen, setIsProfileOpen] = useState(false);
//   const [isSidebarOpen, setIsSidebarOpen] = useState(false);
//   const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
//   const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
//   const [isListening, setIsListening] = useState(false);
//   const [isAuthenticated, setIsAuthenticated] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState("");
//   const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

//   const handleLogout = async () => {
//     try {
//       const response = await fetch("http://localhost:8000/patient/logout", {
//         credentials: "include",
//         method: "POST",
//       });

//       if (!response.ok) {
//         throw new Error("Logout failed. Please try again.");
//       }

//       document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
//       toast.success("Logout successful!", {
//         onClose: () => {
//           setIsAuthenticated(false);
//           navigate("/login");
//         },
//       });
//     } catch (err) {
//       toast.error(err.message || "Something went wrong. Please try again.");
//     }
//   };

//   useEffect(() => {
//     const checkAuth = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/patient/verify-token", {
//           credentials: "include",
//         });

//         if (response.ok) {
//           const data = await response.json();
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         console.error("Authentication check failed:", error);
//         setIsAuthenticated(false);
//       }
//     };

//     checkAuth();
//   }, []);

//   useEffect(() => {
//     const handleResize = () => {
//       setIsMobile(window.innerWidth < 768);
//       setIsTablet(window.innerWidth >= 768 && window.innerWidth < 1024);
//     };
//     window.addEventListener("resize", handleResize);
//     return () => window.removeEventListener("resize", handleResize);
//   }, []);

//   const handleVoiceSearch = () => {
//     if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
//       alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
//       return;
//     }

//     const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
//     recognition.lang = "en-US";
//     recognition.interimResults = false;
//     recognition.continuous = false;

//     recognition.onstart = () => setIsListening(true);
//     recognition.onresult = (event) => {
//       setSearchQuery(event.results[0][0].transcript);
//       setIsListening(false);
//     };
//     recognition.onerror = () => setIsListening(false);
//     recognition.onend = () => setIsListening(false);

//     recognition.start();
//   };

//   const handleLocationChange = (location) => {
//     setSelectedLocation(location);
//     setIsLocationDropdownOpen(false);
//   };

//   return (
//     <nav className="bg-green-600 text-white shadow-md relative z-50">
//       <div className="container px-3 py-4 flex items-center justify-between">
//         {(isMobile || isTablet) ? (
//           <div className="flex items-center justify-between w-full">
//             {isMobile && (
//               <button onClick={() => setIsSidebarOpen(true)} className="text-white me-5">
//                 <FaBars size={24} />
//               </button>
//             )}
//             {isTablet && (
//               <a href="/" className="text-2xl font-bold flex items-center space-x-4">
//                 <FaHospital size={30} />
//                 <span>MediCare</span>
//               </a>
//             )}
//             <div className="relative flex-grow max-w-md mx-auto -ms-sm-8">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder={isMobile ? "Search..." : "Search hospitals, doctors, or diseases"}
//                 className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
//               />
//               <button
//                 className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"}`}
//                 onClick={handleVoiceSearch}
//               >
//                 <FaMicrophone />
//               </button>
//             </div>
//             {isTablet && (
//               <button onClick={() => setIsSidebarOpen(true)} className="text-white ml-4">
//                 <FaBars size={24} />
//               </button>
//             )}
//           </div>
//         ) : (
//           <div className="flex items-center justify-between w-full">
//             <a href="/" className="text-2xl font-bold flex items-center space-x-2">
//               <FaHospital size={30} />
//               <span>MediCare</span>
//             </a>

//             <div className="relative flex-grow max-w-lg">
//               <input
//                 type="text"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//                 placeholder="Search hospitals, doctors, or diseases"
//                 className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
//               />
//               <button
//                 className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"}`}
//                 onClick={handleVoiceSearch}
//               >
//                 <FaMicrophone />
//               </button>
//             </div>

//             <div className="flex items-center space-x-6 relative">
//               {/* Location */}
//               <div className="text-white text-center relative">
//                 <div
//                   className="flex items-center justify-center cursor-pointer"
//                   onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
//                 >
//                   <FaMapMarkerAlt size={24} />
//                   <span className="ml-2">{selectedLocation || "Select Location"}</span>
//                   <FaChevronDown className="m-1" />
//                 </div>

//                 {isLocationDropdownOpen && (
//                   <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 bg-white shadow rounded-md text-black">
//                     <ul className="space-y-2 p-2">
//                       {locationOptions.map((loc, idx) => (
//                         <li
//                           key={idx}
//                           onClick={() => handleLocationChange(loc)}
//                           className="cursor-pointer hover:bg-gray-100 px-2 py-1"
//                         >
//                           {loc}
//                         </li>
//                       ))}
//                     </ul>
//                   </div>
//                 )}
//               </div>

//               <a href="/about" className="font-bold hover:text-green-200">
//                 About Us
//               </a>
//               <div className="relative">
//                 <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-1">
//                   <FaUser size={17} />
//                   <span className="font-bold">My Profile</span>
//                   <FaChevronDown />
//                 </button>
//                 {isProfileOpen && (
//                   <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-900">
//                     <a href="/myProfile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
//                       <FaUser className="mr-2" /> My Profile
//                     </a>
//                     <a href="/myAppointments" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
//                       <FaCalendarAlt className="mr-2" /> My Appointments
//                     </a>
//                     {isAuthenticated ? (
//                       <button
//                         onClick={handleLogout}
//                         className="flex w-full items-center px-4 py-2 text-sm hover:bg-gray-200"
//                       >
//                         <FaSignOutAlt className="mr-2" /> Logout
//                       </button>
//                     ) : (
//                       <a href="/login" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
//                         <FaSignOutAlt className="mr-2" /> Login
//                       </a>
//                     )}
//                   </div>
//                 )}
//               </div>
//             </div>
//           </div>
//         )}
//       </div>

//       {isSidebarOpen && (
//         <div className="fixed inset-0">
//           <div className="fixed left-0 top-0 w-3/4 max-w-xs h-full bg-white text-gray-900 shadow-lg transform transition-transform">
//             <div className="p-5 flex justify-between items-center bg-green-600 text-white">
//               <h2 className="text-xl font-bold flex items-center space-x-2">
//                 <FaHospital size={25} />
//                 <span>MediCare</span>
//               </h2>
//               <button onClick={() => setIsSidebarOpen(false)}>
//                 <FaTimes size={24} />
//               </button>
//             </div>

//             <div className="p-5 space-y-4">
//               <a href="/profile" className="flex items-center space-x-2 text-lg hover:text-green-600">
//                 <FaUser />
//                 <span>My Profile</span>
//               </a>
//               <a href="/appointments" className="flex items-center space-x-2 text-lg hover:text-green-600">
//                 <FaCalendarAlt />
//                 <span>My Appointments</span>
//               </a>
//               <a href="/login" className="flex items-center space-x-2 text-lg hover:text-green-600">
//                 <FaSignOutAlt />
//                 <span>Login</span>
//               </a>
//               <a href="/about" className="flex items-center space-x-2 text-lg hover:text-green-600">
//                 <FaInfoCircle />
//                 <span>About Us</span>
//               </a>
//             </div>
//           </div>
//         </div>
//       )}
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

const locationOptions = [
  "Anantapur",
  "Chittoor",
  "East Godavari",
  "Guntur",
  "Kadapa",
  "Krishna",
  "Kurnool",
  "Nellore",
  "Prakasam",
  "Srikakulam",
  "Visakhapatnam",
  "Vizianagaram",
  "West Godavari",
];

const Navbar = ({ setSearchQuery, searchQuery }) => {
  const navigate = useNavigate();

  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);
  const [isTablet, setIsTablet] = useState(window.innerWidth >= 768 && window.innerWidth < 1024);
  const [isListening, setIsListening] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState("");
  const [isLocationDropdownOpen, setIsLocationDropdownOpen] = useState(false);

  const handleLogout = async () => {
    try {
      const response = await fetch("http://localhost:8000/patient/logout", {
        credentials: "include",
        method: "POST",
      });

      if (!response.ok) {
        throw new Error("Logout failed. Please try again.");
      }

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

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const response = await fetch("http://localhost:8000/patient/verify-token", {
          credentials: "include",
        });

        if (response.ok) {
          const data = await response.json();
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

  const handleLocationChange = (location) => {
    setSelectedLocation(location);
    setIsLocationDropdownOpen(false);
  };

  return (
    <nav className="bg-green-600 text-white shadow-md relative z-50">
      <div className="container px-3 py-4 flex items-center justify-between">
        {(isMobile || isTablet) ? (
          <div className="flex items-center justify-between w-full">
            {isMobile && (
              <button onClick={() => setIsSidebarOpen(true)} className="text-white me-5">
                <FaBars size={24} />
              </button>
            )}
            {isTablet && (
              <a href="/" className="text-2xl font-bold flex items-center space-x-4">
                <FaHospital size={30} />
                <span>MediCare</span>
              </a>
            )}
            <div className="relative flex-grow max-w-md mx-auto -ms-sm-8">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder={isMobile ? "Search..." : "Search hospitals, doctors, or diseases"}
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
              />
              <button
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"}`}
                onClick={handleVoiceSearch}
              >
                <FaMicrophone />
              </button>
            </div>
            {isTablet && (
              <button onClick={() => setIsSidebarOpen(true)} className="text-white ml-4">
                <FaBars size={24} />
              </button>
            )}
          </div>
        ) : (
          <div className="flex items-center justify-between w-full">
            <a href="/" className="text-2xl font-bold flex items-center space-x-2">
              <FaHospital size={30} />
              <span>MediCare</span>
            </a>

            <div className="relative flex-grow max-w-lg">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospitals, doctors, or diseases"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
              />
              <button
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"}`}
                onClick={handleVoiceSearch}
              >
                <FaMicrophone />
              </button>
            </div>

            <div className="flex items-center space-x-6 relative">
              <div className="text-white text-center relative">
                <div
                  className="flex items-center justify-center cursor-pointer"
                  onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
                >
                  <FaMapMarkerAlt size={24} />
                  <span className="ml-2">{selectedLocation || "Select Location"}</span>
                  <FaChevronDown className="m-1" />
                </div>

                {isLocationDropdownOpen && (
                  <div className="absolute mt-2 left-1/2 transform -translate-x-1/2 bg-white shadow rounded-md text-black">
                    <ul className="space-y-2 p-2">
                      {locationOptions.map((loc, idx) => (
                        <li
                          key={idx}
                          onClick={() => handleLocationChange(loc)}
                          className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                        >
                          {loc}
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <a href="/about" className="font-bold hover:text-green-200">About Us</a>

              <div className="relative">
                <button onClick={() => setIsProfileOpen(!isProfileOpen)} className="flex items-center space-x-1">
                  <FaUser size={17} />
                  <span className="font-bold">My Profile</span>
                  <FaChevronDown />
                </button>
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-900">
                    <a href="/myProfile" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
                      <FaUser className="mr-2" /> My Profile
                    </a>
                    <a href="/myAppointments" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
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
            </div>
          </div>
        )}
      </div>

      {/* ✅ Location section for mobile & tablet view below navbar */}
      {(isMobile || isTablet) && (
        <div className="bg-green-600 text-white py-2 px-3 border-t border-white mt-1 mb-1">
          <div
            className="flex items-center space-x-3 cursor-pointer"
            onClick={() => setIsLocationDropdownOpen(!isLocationDropdownOpen)}
          >
            <FaMapMarkerAlt size={20} />
            <span>{selectedLocation || "Select Location"}</span>
            <FaChevronDown size={12} />
          </div>
          {isLocationDropdownOpen && (
            <div className="mt-2 bg-white shadow rounded-md text-black">
              <ul className="space-y-1 p-2 max-h-48 overflow-y-auto">
                {locationOptions.map((loc, idx) => (
                  <li
                    key={idx}
                    onClick={() => handleLocationChange(loc)}
                    className="cursor-pointer hover:bg-gray-100 px-2 py-1"
                  >
                    {loc}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

      {isSidebarOpen && (
        <div className="fixed inset-0">
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
              <a href="/myProfile" className="flex items-center space-x-2 text-lg hover:text-green-600">
                <FaUser />
                <span>My Profile</span>
              </a>
              <a href="/myAppointments" className="flex items-center space-x-2 text-lg hover:text-green-600">
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
