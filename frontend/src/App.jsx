// import React from "react";
// import AppRouter from "./routers/router";


// const App = () => {
//   return <AppRouter/>; // Use the router component
// };

// export default App;

// import { Outlet, useLocation } from "react-router-dom";
// import './App.css';
// import { ToastContainer } from 'react-toastify';
// import 'react-toastify/dist/ReactToastify.css';
// import Navbar from "./components/mainNavbar";
// import Footer from "./components/footer";
// import HospitalNavbar from "./components/hospitalNavbar";

// function App() {
//   const location = useLocation();

//   // Check if the user is on a hospital details page
//   const isHospitalPage = location.pathname.startsWith("/hospital/");
//   console.log("ishospiatl",isHospitalPage)

//   return (
//     <>
//       <ToastContainer position='top-center' />
      
//       {/* Dynamic Navbar */}
//       {isHospitalPage ? <HospitalNavbar/> : <Navbar />}

//       {/* Main Content */}
//       <main className="pt-[10px] pb-[55px]">
//         <Outlet />
//       </main>

//       <Footer/>
//     </>
//   );
// }

// export default App;



import { Outlet, useLocation } from "react-router-dom";
import "./App.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Navbar from "./components/mainNavbar";
import Footer from "./components/footer";
import HospitalNavbar from "./components/hospitalNavbar";

function App() {
  const location = useLocation();

  // Check if the user is on a hospital details page
  const isHospitalPage = location.pathname.startsWith("/hospital/");
  
  // Check if the user is on the login page
  const isLoginPage = location.pathname === "/login"; 

  return (
    <>
      <ToastContainer position="top-center" />

      {/* Show Navbar only if not on the login page */}
      {!isLoginPage && (isHospitalPage ? <HospitalNavbar /> : <Navbar />)}

      {/* Main Content */}
      <main className="pt-[10px] pb-[55px]">
        <Outlet />
      </main>

      {/* Show Footer only if not on the login page */}
      {!isLoginPage && <Footer />}
    </>
  );
}

export default App;

