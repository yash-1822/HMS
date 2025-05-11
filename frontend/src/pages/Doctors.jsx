import React, { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const Doctors = () => {
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const [doctors, setDoctors] = useState([]);
  const [specialities, setSpecialities] = useState([]);
  const [selectedSpeciality, setSelectedSpeciality] = useState(null);
  const navigate = useNavigate();
  const { hospitalId } = useParams();

  console.log("hospital id is", hospitalId)

  const location = useLocation();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const token = localStorage.getItem("authToken");

  useEffect(() => {
    const verifyToken = async () => {
      try {
        

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch("https://hms-backend-d7jp.onrender.com/patient/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`, // ✅ Send token via Authorization header
          },
        });

        const data = await response.json();

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
        const response = await fetch(`https://hms-backend-d7jp.onrender.com/doctors/getDoctorsByHospitalId/${hospitalId}`);
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
        console.log("function is called")
        const response = await fetch(`https://hms-backend-d7jp.onrender.com/hospital/getUniqueSpecialities/${hospitalId}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`,
          },
        });

        if (!response.ok) {
          throw new Error("Failed to fetch specialities");
        }

        const data = await response.json();
        console.log("data is:",data)
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
    console.log("doctor is:", doctor._id);
    if (doctor._id) {
      navigate(`/hospital/${hospitalId}/doctors/${doctor._id}`);
    } else {
      console.error("Missing hospitalId or doctorId");
    }
  };

  console.log("selectedSpeciality,FilterDocs", selectedSpeciality, filterDoc);

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
            <div className="w-64 bg-green-100 h-full p-4 overflow-y-auto">
              {/* Sidebar Header */}
              <div className="flex justify-between items-center pb-2 border-b border-green-400">
                <h2 className="text-green-900 font-bold text-lg">Specialties</h2>
                <button
                  className="text-green-900 text-2xl font-bold"
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
                    className={`cursor-pointer p-2 rounded-md ${selectedSpeciality === spec
                        ? "bg-green-600 text-white font-semibold" // ✅ Selected style
                        : "text-green-900 hover:bg-green-200"      // ✅ Hover effect
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
              className={`pl-3 py-1.5 pr-16 border border-gray-300 rounded cursor-pointer ${selectedSpeciality === spec ? "bg-indigo-50 text-black" : ""
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


