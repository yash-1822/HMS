// import { Outlet, useLocation } from "react-router-dom";
// import "./App.css";
// import { ToastContainer } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";
// import Navbar from "./components/mainNavbar";
// import Footer from "./components/footer";
// import HospitalNavbar from "./components/hospitalNavbar";

// function App() {
//   const location = useLocation();

//   // Check if the user is on a hospital details page
//   const isHospitalPage = location.pathname.startsWith("/hospital/");
  
//   // Check if the user is on the login page
//   const isLoginPage = location.pathname === "/login";
//   const isRegisteredPage = location.pathname === "/Registration";



//   return (
//     <>
//       <ToastContainer position="top-center" />

//       {/* Show Navbar only if not on the login page */}
//       {!isLoginPage && (isHospitalPage ? <HospitalNavbar /> : <Navbar />)}
      

//       {/* Main Content */}
//       <main>
//         <Outlet />
//       </main>

//       {/* Show Footer only if not on the login page */}
//       {!isLoginPage && <Footer />}
      

//     </>
//   );
// }

// export default App;

import { Outlet, useLocation } from "react-router-dom";
import { useState,useEffect } from "react";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/mainNavbar";
import Footer from "./components/footer";
import HospitalNavbar from "./components/hospitalNavbar";

function App() {
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");
  const [city, setCity] = useState(localStorage.getItem("userAddress") || "");

  // Determine page type
  const isHospitalPage = location.pathname.startsWith("/hospital/");
  const isLoginOrRegister = ["/login", "/registration"].includes(location.pathname);

  useEffect(() => {
    // Update city from localStorage whenever it changes
    const storedCity = localStorage.getItem("userAddress");
    if (storedCity) {
      setCity(storedCity);
    }
  }, []);

  return (
    <>
      <ToastContainer position="top-center" />

      {/* Show Navbar if not on login/register pages */}
      {!isLoginOrRegister && (isHospitalPage ? <HospitalNavbar /> : <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} />)}

      {/* Main content */}
      <main className="">
        <Outlet context={{ searchQuery,city }}/>
      </main>

      {/* Show Footer if not on login/register pages */}
      {!isLoginOrRegister && <Footer />}
    </>
  );
}

export default App;
