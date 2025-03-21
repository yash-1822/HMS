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



import { createBrowserRouter } from "react-router-dom";
import App from "../App";
import HomePage from "../pages/mainHomePage";
import Appointment from "../components/Appointment";
import HospitalBody from "../pages/hospitalBody";
import Registration from "../pages/RegistrationPage";
import LoginPage from "../pages/LoginPage"; // Import Login Page

export const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    children: [
      { path: "/", element: <HomePage /> },
      // { path: "/hospital/:id", element: <HomePage /> },
      // { path: "/hospital/:id", element: <HospitalBody /> },
      { path: "/login", element:<LoginPage/> }, // Add the login page
      { path: "/registration", element:<Registration/>  },
    ],
  },
]);
