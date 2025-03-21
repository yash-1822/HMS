import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { doctors } from "../assets/assets";

const Doctors = () => {
  const { hospitalId, speciality } = useParams();
  const [filterDoc, setFilterDoc] = useState([]);
  const [showFilter, setShowFilter] = useState(false);
  const navigate = useNavigate();


  console.log("doctors data is:",doctors);

  useEffect(() => {
    if (speciality) {
      setFilterDoc(doctors.filter((doc) => doc.speciality === speciality));
    } else {
      setFilterDoc(doctors);
    }
  }, [speciality]);

  return (
    <div className="flex flex-col h-screen p-2">
      {/* Header Section */}
      {/* <div className="bg-white shadow-md p-3 rounded-md sticky top-0 z-10">
        <p className="text-gray-600 text-lg font-semibold">
          Browse through the doctor's specialties.
        </p>
      </div> */}

      <div className="flex flex-col sm:flex-row items-start gap-5 mt-5">
        {/* Filter Button for Small Screens */}
        <button
          className={`py-1 px-3 border rounded text-sm transition-all sm:hidden ${
            showFilter ? "bg-green-400 text-white" : ""
          }`}
          onClick={() => setShowFilter((prev) => !prev)}
        >
          Filters
        </button>

        {/* Filters Section */}
        <div
          className={`flex-col gap-4 text-sm text-gray-600 ${
            showFilter ? "flex" : "hidden sm:flex"
          }`}
        >
          {[
            "General physician",
            "Gynecologist",
            "Dermatologist",
            "Pediatricians",
            "Neurologist",
            "Gastroenterologist",
          ].map((spec) => (
            <p
              key={spec}
              onClick={() =>
                speciality === spec
                  ? navigate(`/hospital/${hospitalId}/doctors`)
                  : navigate(`/hospital/${hospitalId}/doctors/${spec}`)
              }
              className={`w-[94vw] sm:w-auto pl-3 py-1.5 pr-16 border border-gray-300 rounded transition-all cursor-pointer ${
                speciality === spec ? "bg-indigo-50 text-black" : ""
              }`}
            >
              {spec}
            </p>
          ))}
        </div>

        {/* Doctors List Section with Scrollable Container */}
        <div className="w-full overflow-y-auto max-h-[calc(100vh-120px)] p-2">
          <div className="grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 gap-y-6">
            {filterDoc.map((item) => (
              <div
                key={item._id}
                onClick={() =>
                  navigate(`/hospital/${hospitalId}/doctors/${item._id}`)
                }
                className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
              >
                <img
                  className="bg-blue-50 w-full h-40 object-cover"
                  src={item.image}
                  alt={item.name}
                />
                <div className="p-4">
                  <div className="flex items-center gap-2 text-sm text-center text-green-500">
                    <p className="w-2 h-2 bg-green-500 rounded-full"></p>
                    <p>Available</p>
                  </div>
                  <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                  <p className="text-gray-600 text-sm">{item.speciality}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Doctors;
