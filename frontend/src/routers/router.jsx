// import React from "react";
// import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import HospitalSlider from "../components/hospitalslider";
// import HomePage from "../pages/mainHomePage";


// const AppRouter = () => {
//   return (
//     <Router>
//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/hospitals" element={<HospitalSlider />} />
//       </Routes>
//     </Router>
//   );
// };

// export default AppRouter;


// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import HomePage from "../pages/mainHomePage";
// import Appointment from "../components/Appointment";
// import HospitalBody from "../pages/hospitalBody";



// export const router = createBrowserRouter([
//   {
//     path: '/',
//     element: <App />,
//     children: [
//       { path: '/', element: <HomePage/> },
//       {path: '/hospital/:id', element:<HomePage/>},
//       {path:'/hospital/:id/hospitalBody',element:<HospitalBody/>}
//     ]
//   }
// ]);



// import { createBrowserRouter } from "react-router-dom";
// import App from "../App";
// import HomePage from "../pages/mainHomePage";
// import Appointment from "../components/Appointment";
// import HospitalBody from "../pages/hospitalBody";
// import Registration from "../pages/RegistrationPage";
// import LoginPage from "../pages/LoginPage"; // Import Login Page
// import Doctors from "../pages/Doctors";
// import { AppContext } from "../context/AppContext";

// export const router = createBrowserRouter([
//   {
//     path: "/",
//     element: <App />,
//     children: [
//       { path: "/login", element:<LoginPage/> }, // Add the login page
//       { path: "/Registration", element:<Registration/>  },
//       { path: "/", element: <HomePage /> },
//       { path: "/hospital/:id", element: <HomePage /> },
//       { path: "/hospital/:id/hospitalBody", element: <HospitalBody /> },
//       {path:"/hospital/:id/doctors",element:<Doctors/>},
//       {path:"/hospital/:id/doctors/:id/appointment",element:<Appointment/>},
//       {path:"/hospital/:id/about",element:<Doctors/>},
//       {path:"/hospital/:id/contact",element:<Doctors/>},
//     ],
//   },
// ]);




import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/mainHomePage";
import Appointment from "../components/Appointment";
import HospitalBody from "../pages/hospitalBody";
import Registration from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage";
import Doctors from "../pages/Doctors";
import About from "../pages/About";
import Contact from "../pages/Contact";

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      { path: "/login", element:<LoginPage/> }, // Add the login page
      { path: "/registration", element:<Registration/>  },
      // { path: "/hospital/:hospitalId", element: <HomePage /> },
      { path: "/hospital/:hospitalId", element: <HospitalBody /> },
      { path: "/hospital/:hospitalId/doctors", element: <Doctors /> },
      { path: "/hospital/:hospitalId/doctors/:doctorId", element: <Appointment/>}, // Fixed `doctorId`
      { path: "/hospital/:hospitalId/about", element: <About /> }, // Use correct component
      { path: "/hospital/:hospitalId/contact", element: <Contact /> }, // Use correct component
    ],
  },
]);
