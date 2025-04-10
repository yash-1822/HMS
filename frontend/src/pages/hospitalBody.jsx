// import React, { useState, useEffect } from "react";
// import { useParams, useNavigate } from "react-router-dom";
// import Header from "../components/Header";
// import SpecialityMenu from "../components/SpecialityMenu";
// import TopDoctors from "../components/TopDoctors";

// const HospitalBody = () => {
//   const { hospitalId } = useParams();
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/patient/verify-token", {
//           method:"get",
//           credentials: "include", // Ensures cookies are sent
//         });

//         const data = await response.json();
//         console.log("Token verification response:", data);

//         if (response.ok) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//           navigate("/login"); // Redirect to login if token is invalid
//         }
//       } catch (error) {
//         console.error("Token verification failed:", error);
//         setIsAuthenticated(false);
//         navigate("/login");
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   if (isAuthenticated === null) {
//     return <div>Loading...</div>; // Show loading state until verification is complete
//   }


//   return (
//     <div>
//       {isAuthenticated && (
//         <>
//           <Header hospitalId={hospitalId} />
//           <SpecialityMenu hospitalId={hospitalId} />
//           <TopDoctors hospitalId={hospitalId} />
//         </>
//       )}
//     </div>
//   );

// };

// export default HospitalBody;




import React, { useState, useEffect } from "react";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import Header from "../components/Header";
import SpecialityMenu from "../components/SpecialityMenu";
import TopDoctors from "../components/TopDoctors";

const HospitalBody = () => {
  const { hospitalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        // const response = await fetch("http://localhost:8000/patient/verify-token", {
        //   method: "GET",
        //   credentials: "include", // Ensures cookies are sent
        // });


        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch("http://localhost:8000/patient/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token via Authorization header
          },
        });


        const data = await response.json();
        console.log("Token verification response:", data);

        if (response.ok) {
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`); // Redirect with intended path
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      }
    };

    verifyToken();
  }, [navigate, location.pathname]);

  if (isAuthenticated === null) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {isAuthenticated && (
        <>
          <Header hospitalId={hospitalId} />
          <SpecialityMenu hospitalId={hospitalId} />
          <TopDoctors hospitalId={hospitalId} />
        </>
      )}
    </div>
  );
};

export default HospitalBody;
