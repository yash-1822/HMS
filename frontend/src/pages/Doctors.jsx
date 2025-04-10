// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// // import { doctors } from "../assets/assets";

// const Doctors = () => {
//   const { hospitalId, speciality } = useParams();
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [doctors,setDoctors] = useState([]);
//   const [specialities, setSpecialities] = useState([]);

//   console.log("doctors data is:",doctors);

//   useEffect(() => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   }, [speciality]);


   
  
//     useEffect(() => {
//       const verifyToken = async () => {
//         try {
//           const response = await fetch("http://localhost:8000/patient/verify-token", {
//             method:"get",
//             credentials: "include", // Ensures cookies are sent
//           });
  
//           const data = await response.json();
//           console.log("Token verification response:", data);
  
//           if (response.ok) {
//             setIsAuthenticated(true);
//           } else {
//             setIsAuthenticated(false);
//             navigate("/login"); // Redirect to login if token is invalid
//           }
//         } catch (error) {
//           console.error("Token verification failed:", error);
//           setIsAuthenticated(false);
//           navigate("/login");
//         }
//       };
  
//       verifyToken();
//     }, [navigate]);


//      useEffect(() => {
//             const fetchDoctors = async () => {
//                 try {
//                     const response = await fetch("http://localhost:8000/doctors/getAllDoctors"); // Adjust if backend URL differs
//                     if (!response.ok) throw new Error("Failed to fetch doctors");
            
//                     const data = await response.json();
//                     console.log("From top doctors is",data);
//                     setDoctors(data);
//                 } catch (error) {
//                     console.error("Error fetching doctors:", error);
//                     return [];
//                 }
//             };

//             const fetchSpecialities = async () => {
//               try {
//                 const response = await fetch("http://localhost:8000/doctors/getUniqueSpecialities", {
//                   method: "GET",
//                   credentials: "include", // Ensures authentication cookies are sent
//                 });
          
//                 if (!response.ok) {
//                   throw new Error("Failed to fetch specialities");
//                 }
          
//                 const data = await response.json();
//                 console.log("Fetched specialities:", data);
//                 setSpecialities(data.specializations);
//               } catch (error) {
//                 console.error("Error fetching specialities:", error);
//               }
//             }

//           fetchDoctors()
          
//           fetchSpecialities();

//         }, []);

//   return (
//     <div className="flex flex-col h-screen p-2">
//       {/* Header Section */}
//       {/* <div className="bg-white shadow-md p-3 rounded-md sticky top-0 z-10">
//         <p className="text-gray-600 text-lg font-semibold">
//           Browse through the doctor's specialties.
//         </p>
//       </div> */}

//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
//         {/* Filter Button for Small Screens */}
//         <button
//           className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
//             showFilter ? "bg-green-400 text-white" : ""
//           }`}
//           onClick={() => setShowFilter((prev) => !prev)}
//         >
//           Filters
//         </button>

//         {/* Filters Section */}
//         <div
//           className={`flex-col gap-4 text-sm text-gray-600 ${
//             showFilter ? "flex" : "hidden sm:flex"
//           }`}
//         >
//           {specialities.map((spec) => (
//             <p
//               key={spec}
//               onClick={() =>
//                 speciality === spec
//                   ? navigate(`/hospital/${hospitalId}/doctors`)
//                   : navigate(`/hospital/${hospitalId}/doctors/${spec}`)
//               }
//               className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
//                 speciality === spec ? "bg-indigo-50 text-black" : ""
//               }`}
//             >
//               {spec}
//             </p>
//           ))}
//         </div>

//         {/* Doctors List Section with Scrollable Container */}
//         <div className="w-full overflow-y-auto max-h-[calc(100vh-120px)] p-2">
//           <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
//             {doctors.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() =>
//                   navigate(`/hospital/${hospitalId}/doctors/${item._id}`)
//                 }
//                 className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
//               >
//                 <img
//                   className="bg-blue-50 w-full h-40 object-center"
//                   src={item.doctor_image}
//                   alt={item.name}
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center gap-2 text-sm text-center text-green-500">
//                     <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                     <p>Available</p>
//                   </div>
//                   <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//                   <p className="text-gray-600 text-sm">{item.specialty}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;






// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";

// const Doctors = () => {
//   const { hospitalId, speciality } = useParams();
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const navigate = useNavigate();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);
//   const [doctors, setDoctors] = useState([]);
//   const [specialities, setSpecialities] = useState([]);

//   useEffect(() => {
//     if (speciality) {
//       setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
//     } else {
//       setFilterDoc(doctors);
//     }
//   }, [speciality, doctors]);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/patient/verify-token", {
//           method: "get",
//           credentials: "include",
//         });

//         const data = await response.json();
//         if (response.ok) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//           navigate("/login");
//         }
//       } catch (error) {
//         setIsAuthenticated(false);
//         navigate("/login");
//       }
//     };

//     verifyToken();
//   }, [navigate]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/doctors/getAllDoctors");
//         if (!response.ok) throw new Error("Failed to fetch doctors");

//         const data = await response.json();
//         setDoctors(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     const fetchSpecialities = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/doctors/getUniqueSpecialities", {
//           method: "GET",
//           credentials: "include",
//         });

//         if (!response.ok) {
//           throw new Error("Failed to fetch specialities");
//         }

//         const data = await response.json();
//         setSpecialities(data.specializations);
//       } catch (error) {
//         console.error("Error fetching specialities:", error);
//       }
//     };

//     fetchDoctors();
//     fetchSpecialities();
//   }, []);

//   return (
//     <div className="flex flex-col h-screen p-2">
//       <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 w-full h-[calc(100vh-80px)]">
        
//         {/* Mobile Filter Button */}
//         <button
//           className="sm:hidden  bg-green-600 text-white px-4 py-2 rounded-md"
//           onClick={() => setShowFilter(true)}
//         >
//           Filter
//         </button>

//         {/* Sidebar for Specialties (Mobile Only) */}
//         {showFilter && (
//           <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-start">
//             <div className="w-64 bg-green-600 h-full p-4 overflow-y-auto">
//               {/* Sidebar Header */}
//               <div className="flex justify-between items-center pb-2 border-b border-green-400">
//                 <h2 className="text-white font-bold text-lg">Specialties</h2>
//                 <button
//                   className="text-white text-xl font-bold"
//                   onClick={() => setShowFilter(false)}
//                 >
//                   ✕
//                 </button>
//               </div>

//               {/* Specialties List */}
//               <div className="mt-3 space-y-2">
//                 {specialities.map((spec, index) => (
//                   <p
//                     key={index}
//                     onClick={() => {
//                       setShowFilter(false);
//                       speciality === spec
//                         ? navigate(`/hospital/${hospitalId}/doctors`)
//                         : navigate(`/hospital/${hospitalId}/doctors/${spec}`);
//                     }}
//                     className={`cursor-pointer p-2 text-white rounded-md ${
//                       speciality === spec ? "bg-white text-green-600 font-bold" : "hover:bg-green-500"
//                     }`}
//                   >
//                     {spec}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Specialties List (Visible on Desktop) */}
//         <div className="hidden sm:flex flex-col gap-4 text-sm text-gray-600 w-60 overflow-y-auto max-h-full specialties-list">
//           {specialities.map((spec) => (
//             <p
//               key={spec}
//               onClick={() =>
//                 speciality === spec
//                   ? navigate(`/hospital/${hospitalId}/doctors`)
//                   : navigate(`/hospital/${hospitalId}/doctors/${spec}`)
//               }
//               className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//                 speciality === spec ? "bg-indigo-50 text-black" : ""
//               }`}
//             >
//               {spec}
//             </p>
//           ))}
//         </div>

//         {/* Doctors List */}
//         <div className="w-full overflow-y-auto max-h-full doctors-list">
//           <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
//             {doctors.map((item) => (
//               <div
//                 key={item._id}
//                 onClick={() => navigate(`/hospital/${hospitalId}/doctors/${item._id}`)}
//                 className="border mx-auto border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[5px] transition-all duration-500 w-full max-w-[220px] sm:max-w-none"
//               >
//                 <img
//                   className="bg-blue-50 w-full h-38 object-center"
//                   src={item.doctor_image}
//                   alt={item.name}
//                 />
//                 <div className="p-4">
//                   <div className="flex items-center gap-2 text-sm text-green-500">
//                     <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                     <p>Available</p>
//                   </div>
//                   <p className="text-gray-900 text-lg font-medium">{item.name}</p>
//                   <p className="text-gray-600 text-sm">{item.specialty}</p>
//                 </div>
//               </div>
//             ))}
//           </div>
//         </div>
        
//       </div>
//     </div>
//   );
// };

// export default Doctors;






import React, { useEffect, useState } from "react";
import { useNavigate,useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const navigate = useNavigate(); 
  const { hospitalId } = useParams();

  console.log("hospital id is",hospitalId)

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

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await fetch(`http://localhost:8000/doctors/getDoctorsByHospitalId/${hospitalId}`);
        if (!response.ok) throw new Error("Failed to fetch doctors");

        const data = await response.json();
        setDoctors(data);
        setFilterDoc(data); // Default: Show all doctors
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };

    const fetchSpecialities = async () => {
      try {
        const response = await fetch(`http://localhost:8000/hospital/findHospital/${hospitalId}`, {
          method: "GET",
          credentials: "include",
        });

        if (!response.ok) {
          throw new Error("Failed to fetch specialities");
        }

        const data = await response.json();
        setSpecialities(data.specializations);
      } catch (error) {
        console.error("Error fetching specialities:", error);
      }
    };

    fetchDoctors();
    fetchSpecialities();
  }, []);

  // Filter doctors when a specialty is selected
  const handleSpecialityClick = (spec) => {
    if (selectedSpeciality === spec) {
      setSelectedSpeciality(null);
      setFilterDoc(doctors); // Reset to show all doctors
    } else {
      setSelectedSpeciality(spec);
      setFilterDoc(doctors.filter((doc) => doc.specialty === spec));
    }
    setShowFilter(false);
  };


  const handleDoctorClick = (doctor) => {
    console.log("doctor is:",doctor._id);
    if (doctor._id) {
      navigate(`/hospital/${hospitalId}/doctors/${doctor._id}`);
    } else {
      console.error("Missing hospitalId or doctorId");
    }
  };

  console.log("selectedSpeciality,FilterDocs",selectedSpeciality,filterDoc);

  return (
    <div className="flex flex-col h-screen p-2">
      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5 w-full h-[calc(100vh-80px)]">
        
        {/* Mobile Filter Button */}
        <button
          className="sm:hidden bg-green-600 text-white px-4 py-2 rounded-md"
          onClick={() => setShowFilter(true)}
        >
          Filter
        </button>

        {/* Sidebar for Specialties (Mobile Only) */}
        {showFilter && (
          <div className="fixed inset-0 bg-opacity-50 z-50 flex justify-start">
            <div className="w-64 bg-green-600 h-full p-4 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="flex justify-between items-center pb-2 border-b border-green-400">
                <h2 className="text-white font-bold text-lg">Specialties</h2>
                <button
                  className="text-white text-2xl font-bold"
                  onClick={() => setShowFilter(false)}
                >
                  ✕
                </button>
              </div>

              {/* Specialties List */}
              <div className="mt-3 space-y-2">
                {specialities.map((spec, index) => (
                  <p
                    key={index}
                    onClick={() => handleSpecialityClick(spec)}
                    className={`cursor-pointer p-2 text-white rounded-md ${
                      selectedSpeciality === spec ? "bg-white text-green-600 font-bold" : "hover:bg-green-500"
                    }`}
                  >
                    {spec}
                  </p>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Specialties List (Visible on Desktop) */}
        <div className="hidden sm:flex flex-col gap-4 text-sm text-gray-600 w-60 overflow-y-auto max-h-full">
          {specialities.map((spec) => (
            <p
              key={spec}
              onClick={() => handleSpecialityClick(spec)}
              className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
                selectedSpeciality === spec ? "bg-indigo-50 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors List */}
        <div className="w-full overflow-y-auto max-h-full">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(160px,1fr))] sm:grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
            {filterDoc.length > 0 ? (
              filterDoc.map((item) => (
                <div
                  key={item._id}
                  onClick={() => handleDoctorClick(item)}
                  className="border mx-auto border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[5px] transition-all duration-500 w-full max-w-[220px] sm:max-w-none"
                >
                  <img
                    className="bg-blue-50 w-full h-38 object-center"
                    src={item.doctor_image}
                    alt={item.name}
                  />
                  <div className="p-4">
                    <div className="flex items-center gap-2 text-sm text-green-500">
                      <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                      <p>Available</p>
                    </div>
                    <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                    <p className="text-gray-600 text-sm">{item.speciality}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center col-span-full">No doctors available for this specialty.</p>
            )}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default Doctors;






// import React, { useEffect, useState } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import { useParams } from "react-router-dom";
// import Appointment from "../components/Appointment";

// const Doctors = () => {
//   const [filterDoc, setFilterDoc] = useState([]);
//   const [showFilter, setShowFilter] = useState(false);
//   const [doctors, setDoctors] = useState([]);
//   const [specialities, setSpecialities] = useState([]);
//   const [selectedSpeciality, setSelectedSpeciality] = useState(null);
//   const navigate = useNavigate(); 
//   const { hospitalId } = useParams();
//   const [selectedDoctorId, setSelectedDoctorId] = useState(null);
//   const location = useLocation();
//   const [isAuthenticated, setIsAuthenticated] = useState(null);

//   useEffect(() => {
//     const verifyToken = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/patient/verify-token", {
//           method: "GET",
//           credentials: "include",
//         });
//         const data = await response.json();
//         if (response.ok) {
//           setIsAuthenticated(true);
//         } else {
//           setIsAuthenticated(false);
//           navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
//         }
//       } catch (error) {
//         console.error("Token verification failed:", error);
//         setIsAuthenticated(false);
//         navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
//       }
//     };
//     verifyToken();
//   }, [navigate, location.pathname]);

//   useEffect(() => {
//     const fetchDoctors = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/doctors/getAllDoctors");
//         if (!response.ok) throw new Error("Failed to fetch doctors");
//         const data = await response.json();
//         setDoctors(data);
//         setFilterDoc(data);
//       } catch (error) {
//         console.error("Error fetching doctors:", error);
//       }
//     };

//     const fetchSpecialities = async () => {
//       try {
//         const response = await fetch("http://localhost:8000/doctors/getUniqueSpecialities", {
//           method: "GET",
//           credentials: "include",
//         });
//         if (!response.ok) {
//           throw new Error("Failed to fetch specialities");
//         }
//         const data = await response.json();
//         setSpecialities(data.specializations);
//       } catch (error) {
//         console.error("Error fetching specialities:", error);
//       }
//     };

//     fetchDoctors();
//     fetchSpecialities();
//   }, []);

//   const handleSpecialityClick = (spec) => {
//     if (selectedSpeciality === spec) {
//       setSelectedSpeciality(null);
//       setFilterDoc(doctors);
//     } else {
//       setSelectedSpeciality(spec);
//       setFilterDoc(doctors.filter((doc) => doc.specialty === spec));
//     }
//     setShowFilter(false);
//   };

//   const handleDoctorClick = (doctor) => {
//     setSelectedDoctorId(doctor._id); 
//   };

//   return (
//     <div className="flex flex-col h-screen p-2">
//       <div className="flex flex-col sm:flex-row items-start gap-3 sm:gap-5 mt-3 sm:mt-5 w-full h-[calc(100vh-80px)]">
//         {/* Mobile Filter Button */}
//         <button
//           className="sm:hidden bg-green-600 text-white px-4 py-2 rounded-md mb-3"
//           onClick={() => setShowFilter(true)}
//         >
//           Filter
//         </button>

//         {/* Sidebar for Specialties (Mobile Only) */}
//         {showFilter && (
//           <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex justify-start">
//             <div className="w-64 bg-green-600 h-full p-4 overflow-y-auto">
//               <div className="flex justify-between items-center pb-2 border-b border-green-400">
//                 <h2 className="text-white font-bold text-lg">Specialties</h2>
//                 <button
//                   className="text-white text-2xl font-bold"
//                   onClick={() => setShowFilter(false)}
//                 >
//                   ✕
//                 </button>
//               </div>
//               <div className="mt-3 space-y-2">
//                 {specialities.map((spec, index) => (
//                   <p
//                     key={index}
//                     onClick={() => handleSpecialityClick(spec)}
//                     className={`cursor-pointer p-2 text-white rounded-md ${
//                       selectedSpeciality === spec ? "bg-white text-green-600 font-bold" : "hover:bg-green-500"
//                     }`}
//                   >
//                     {spec}
//                   </p>
//                 ))}
//               </div>
//             </div>
//           </div>
//         )}

//         {/* Specialties List (Desktop) */}
//         <div className="hidden sm:flex flex-col gap-3 text-sm text-gray-600 w-60 overflow-y-auto max-h-full flex-shrink-0">
//           {specialities.map((spec) => (
//             <p
//               key={spec}
//               onClick={() => handleSpecialityClick(spec)}
//               className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${
//                 selectedSpeciality === spec ? "bg-indigo-50 text-black" : ""
//               }`}
//             >
//               {spec}
//             </p>
//           ))}
//         </div>

//         {/* Main Content Area */}
//         <div className="flex-1 h-full overflow-hidden bg-white rounded-lg">
//           {!selectedDoctorId ? (
//             <div className="w-full h-full overflow-y-auto p-2 sm:p-4">
//               <div className="grid grid-cols-1 xs:grid-cols-2 sm:grid-cols-[repeat(auto-fill,minmax(180px,1fr))] gap-3 sm:gap-4">
//                 {filterDoc.length > 0 ? (
//                   filterDoc.map((item) => (
//                     <div
//                       key={item._id}
//                       onClick={() => handleDoctorClick(item)}
//                       className="border border-blue-200 rounded-lg overflow-hidden cursor-pointer hover:translate-y-[5px] transition-all duration-500 bg-white"
//                     >
//                       <img
//                         className="w-full h-48 object-cover bg-blue-50"
//                         src={item.doctor_image}
//                         alt={item.name}
//                       />
//                       <div className="p-3 sm:p-4">
//                         <div className="flex items-center gap-2 text-sm text-green-500">
//                           <p className="w-2 h-2 bg-green-500 rounded-full"></p>
//                           <p>Available</p>
//                         </div>
//                         <p className="text-gray-900 text-base sm:text-lg font-medium mt-1">{item.name}</p>
//                         <p className="text-gray-600 text-sm">{item.speciality}</p>
//                       </div>
//                     </div>
//                   ))
//                 ) : (
//                   <p className="text-gray-500 text-center col-span-full">No doctors available for this specialty.</p>
//                 )}
//               </div>
//             </div>
//           ) : (
//             <div className="h-full overflow-hidden">
//               <Appointment doctorId={selectedDoctorId} />
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

// export default Doctors;