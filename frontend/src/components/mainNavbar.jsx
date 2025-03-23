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
  FaHospital
} from "react-icons/fa";

const Navbar = ({ setSearchQuery,searchQuery }) => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  // const [searchQuery, setSearchQuery] = useState("");
  const [isListening, setIsListening] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isMobile) {
      const handleClickOutside = (event) => {
        if (!event.target.closest(".profile-menu")) {
          setIsProfileOpen(false);
        }
      };
      document.addEventListener("mousedown", handleClickOutside);
      return () => document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isMobile]);

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };


  // console.log(searchQuery)

  // Google Voice Assistant (Speech-to-Text)
  const handleVoiceSearch = () => {
    if (!("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      alert("Your browser does not support Speech Recognition. Please use Google Chrome.");
      return;
    }

    const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
    recognition.lang = "en-US";
    recognition.interimResults = false;
    recognition.continuous = false;

    recognition.onstart = () => {
      setIsListening(true);
    };

    recognition.onresult = (event) => {
      const transcript = event.results[0][0].transcript;
      setSearchQuery(transcript);
      setIsListening(false);
    };

    recognition.onerror = (event) => {
      console.error("Speech Recognition Error:", event.error);
      setIsListening(false);
    };

    recognition.onend = () => {
      setIsListening(false);
    };

    recognition.start();
  };

  return (
    <nav className="bg-green-600 text-white shadow-md relative z-50">  
      <div className="container px-4 py-5 flex items-center justify-center">
        <a href="/" className="text-2xl font-bold text-white flex items-center space-x-2">
          <FaHospital size={30} />
          <span>MediCare</span>
        </a>
        {isMobile ? (
          <button onClick={toggleMobileMenu} className="text-white">
            <FaBars size={24} />
          </button>
        ) : (
          <div className="flex items-center space-x-10 flex-grow justify-end">
            {/* Search Bar with Voice Assistant */}
            <div className="relative flex-grow max-w-xl md:max-w-lg sm:max-w-sm">
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search hospitals, doctors, or diseases"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white font-semibold placeholder-white"
              />
              <button
                className={`absolute right-3 top-1/2 transform -translate-y-1/2 ${
                  isListening ? "text-red-500 animate-pulse" : "text-white hover:text-gray-600"
                }`}
                onClick={handleVoiceSearch}
              >
                <FaMicrophone />
              </button>
            </div>

            <button className="text-white hover:text-green-200">
              <FaMapMarkerAlt size={20} />
            </button>

            {/* Profile Section - Fixed Dropdown */}
            <div className="relative profile-menu z-50">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 text-white hover:text-green-200"
              >
                <FaUser size={17} />
                <span className="font-bold">My Profile</span>
                <FaChevronDown />
              </button>
              {isProfileOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 text-gray-900 z-50">
                  <a href="/profile" className="flex items-center font-semibold px-4 py-2 text-sm hover:bg-gray-200">
                    <FaUser className="mr-2" /> My Profile
                  </a>
                  <a href="/appointments" className="flex items-center font-semibold px-4 py-2 text-sm hover:bg-gray-200">
                    <FaCalendarAlt className="mr-2" /> My Appointments
                  </a>
                  <a href="/login" className="flex font-semibold items-center px-4 py-2 text-sm hover:bg-gray-200">
                    <FaSignOutAlt className="mr-2" /> Login
                  </a>
                </div>
              )}
            </div>

            <a href="/about" className="text-white font-bold hover:text-green-200">
              About Us
            </a>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;

