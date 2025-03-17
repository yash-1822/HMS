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

const Navbar = () => {
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

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

  return (
    <nav className="bg-green-600 text-white shadow-md">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <a href="/" className="text-2xl font-bold text-white flex items-center space-x-2">
          <FaHospital size={24} />
          <span>MediCare</span>
        </a>
        {isMobile ? (
          <button onClick={toggleMobileMenu} className="text-white">
            <FaBars size={24} />
          </button>
        ) : (
          <div className="flex items-center space-x-6 flex-grow justify-center">
            <div className="relative flex-grow max-w-xl md:max-w-lg sm:max-w-sm">
              <input
                type="text"
                placeholder="Search hospitals, doctors, or diseases"
                className="w-full px-4 py-2 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-white placeholder-white placeholder:font-semibold"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white hover:text-gray-600">
                <FaMicrophone />
              </button>
            </div>
            <button className="text-white hover:text-green-200">
              <FaMapMarkerAlt size={20} />
            </button>
            <div className="relative profile-menu">
              <button
                onClick={() => setIsProfileOpen(!isProfileOpen)}
                className="flex items-center space-x-1 text-white hover:text-green-200"
              >
                <FaUser size={20} />
                <span>My Profile</span>
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
                  <a href="/logout" className="flex items-center px-4 py-2 text-sm hover:bg-gray-200">
                    <FaSignOutAlt className="mr-2" /> Logout
                  </a>
                </div>
              )}
            </div>
            <a href="/about" className="text-white hover:text-green-200">
              About Us
            </a>
          </div>
        )}
      </div>
      {isMobile && isMobileMenuOpen && (
        <div className="fixed inset-y-0 left-0 w-64 bg-white text-green-600 shadow-lg z-50 transition-transform duration-300 ease-in-out transform">
          <div className="p-4 space-y-4">
            <button onClick={toggleMobileMenu} className="absolute top-4 right-4 text-green-600 hover:text-green-400">
              <FaTimes size={24} />
            </button>
            <div className="flex items-center space-x-2 pb-4">
              <FaHospital size={24} className="text-green-600" />
              <span className="text-2xl font-bold">MediCare</span>
            </div>
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search"
                className="w-full px-4 py-2 rounded-full border border-green-300 focus:outline-none focus:ring-2 focus:ring-green-400 text-black"
              />
              <button className="absolute right-3 top-1/2 transform -translate-y-1/2 text-green-600 hover:text-green-400">
                <FaMicrophone />
              </button>
            </div>
            <button className="flex items-center space-x-2 text-green-600 border border-green-300 rounded-full p-2 w-full hover:text-green-400">
              <FaMapMarkerAlt size={20} />
              <span>Location</span>
            </button>
            <button
              onClick={() => setIsProfileOpen((prev) => !prev)}
              className="flex items-center space-x-2 text-green-600 border border-green-300 rounded-full p-2 w-full hover:text-green-400"
            >
              <FaUser size={20} />
              <span>My Profile</span>
              <FaChevronDown />
            </button>
            {isProfileOpen && (
              <div className="pl-4 space-y-2">
                <a href="/profile" className="flex items-center text-green-600 border border-green-300 rounded-full p-2 w-full hover:text-green-400">
                  <FaUser className="mr-2" /> My Profile
                </a>
                <a href="/appointments" className="flex items-center text-green-600 border border-green-300 rounded-full p-2 w-full hover:text-green-400">
                  <FaCalendarAlt className="mr-2" /> My Appointments
                </a>
                <a href="/logout" className="flex items-center text-green-600 border border-green-300 rounded-full p-2 w-full hover:text-green-400">
                  <FaSignOutAlt className="mr-2" /> Logout
                </a>
              </div>
            )}
            <a href="/about" className="flex items-center text-green-600 border border-green-300 rounded-full p-2 w-full hover:text-green-400">
              <FaInfoCircle className="mr-2" /> About Us
            </a>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
