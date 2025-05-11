
// import { useEffect, useState } from "react";
// import { Navigate, Outlet } from "react-router-dom";

// const ProtectedRoute = () => {
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await fetch("https://hms-backend-d7jp.onrender.com/patient/verify-token", {
//           credentials: "include", // Important for cookies
//         });

//         if (response.ok) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//       }
//     };

//     verifyToken();
//   }, []);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Loading state while checking token
//   }

//   return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />;
// };

// export default ProtectedRoute;
