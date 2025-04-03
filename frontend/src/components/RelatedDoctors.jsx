import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { doctors } from "../assets/assets";

const RelatedDoctors = ({ specialty, doctorId, hospitalId }) => {

  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);

  useEffect(() => {
  //   if (doctors.length > 0 && speciality) {
  //     const doctorsData = doctors.filter((doc) => doc.speciality === speciality && doc._id !== doctorId);
  //     setRelDocs(doctorsData);
  //   }
  // }, [speciality, doctorId]);

  const fetchRelatedDoctors = async () => {
      try {
        const response = await fetch("http://localhost:8000/doctors/getDoctors/related", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            specialty: specialty,
            exclude: doctorId,
          }),
        });
        if (!response.ok) throw new Error("Failed to fetch related doctors");
        const data = await response.json();
        setRelDocs(data);
      } catch (error) {
        console.error("Error fetching related doctors:", error);
      }
    };

    if (specialty && doctorId) fetchRelatedDoctors();
  }, [specialty, doctorId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">Simply browse through our extensive list of trusted doctors.</p>

      <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
        {relDoc.slice(0, 5).map((item, index) => (
          <div
            onClick={() => {
              navigate(`/hospital/${hospitalId}/doctors/${item._id}`);
              window.scrollTo(0, 0);
            }}
            className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
            key={index}
          >
            <img className="bg-blue-50 w-full h-40 object-center" src={item.doctor_image} alt={item.name} />
            <div className="p-4">
              <p className="text-gray-900 text-lg font-medium">{item.name}</p>
              <p className="text-gray-600 text-sm">{item.speciality}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RelatedDoctors;
