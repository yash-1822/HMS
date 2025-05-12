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
  const [city, setCity] = useState(localStorage.getItem("userCity") || "");

  // Determine page type
  const isHospitalPage = location.pathname.startsWith("/hospital/");
  const isLoginOrRegister = ["/login", "/registration"].includes(location.pathname);

  useEffect(() => {
    // Update city from localStorage whenever it changes
    const storedCity = localStorage.getItem("userAddress");
    console.log("stored city is",storedCity)
    if (storedCity) {
      setCity(storedCity);
    }
  }, []);


  // return (
  //   <>
  //     <ToastContainer position="top-center" />

  //     {/* Show Navbar if not on login/register pages */}
  //     {!isLoginOrRegister && (isHospitalPage ? <HospitalNavbar /> : <Navbar setSearchQuery={setSearchQuery} searchQuery={searchQuery} city={city} setCity={setCity}/>)}

  //     {/* Main content */}
  //     <main className="">
  //       <Outlet context={{ searchQuery,city }}/>
  //     </main>

  //     {/* Show Footer if not on login/register pages */}
  //     {!isLoginOrRegister && <Footer />}
  //   </>
  // );


  return (
    <div className="min-h-screen flex flex-col">
      <ToastContainer position="top-center" />
  
      {/* Conditional Navbar */}
      {!isLoginOrRegister &&
        (isHospitalPage ? (
          <HospitalNavbar />
        ) : (
          <Navbar
            setSearchQuery={setSearchQuery}
            searchQuery={searchQuery}
            city={city}
            setCity={setCity}
          />
        ))}
  
      {/* Main content grows to fill space */}
      <main className="flex-grow">
        <Outlet context={{ searchQuery, city }} />
      </main>
  
      {/* Conditional Footer */}
      {!isLoginOrRegister && <Footer />}
    </div>
  );
  
}

export default App;
