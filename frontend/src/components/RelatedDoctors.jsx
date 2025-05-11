import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RelatedDoctors = ({ specialty, doctorId, hospitalId }) => {
  const navigate = useNavigate();
  const [relDoc, setRelDocs] = useState([]);
  const [loading, setLoading] = useState(false);
  const [empty, setEmpty] = useState(false);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  useEffect(() => {
    const controller = new AbortController();

    const fetchRelatedDoctors = async () => {
      const token = localStorage.getItem("authToken");
      if (!token) return;

      setLoading(true);
      setEmpty(false);

      try {
        const response = await fetch(`${backendUrl}/doctors/getDoctors/related`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          signal: controller.signal,
          body: JSON.stringify({
            specialty: specialty,
            exclude: doctorId,
          }),
        });

        if (!response.ok) throw new Error("Failed to fetch related doctors");

        const data = await response.json();
        setRelDocs(data);
        if (data.length === 0) setEmpty(true);
      } catch (error) {
        if (error.name !== "AbortError") {
          console.error("Error fetching related doctors:", error);
        }
      } finally {
        setLoading(false);
      }
    };

    if (specialty && doctorId) {
      fetchRelatedDoctors();
    }

    return () => controller.abort();
  }, [specialty, doctorId]);

  return (
    <div className="flex flex-col items-center gap-4 my-16 text-gray-900 md:mx-10">
      <h1 className="text-3xl font-medium">Related Doctors</h1>
      <p className="sm:w-1/3 text-center text-sm">
        Simply browse through our extensive list of trusted doctors.
      </p>

      {loading ? (
        <p className="mt-4 text-blue-500">Loading related doctors...</p>
      ) : empty ? (
        <p className="mt-4 text-gray-500">No related doctors found.</p>
      ) : (
        <div className="w-full grid grid-cols-[repeat(auto-fill,minmax(200px,1fr))] gap-4 pt-5 gap-y-6 px-3 sm:px-0">
          {relDoc.slice(0, 5).map((item) => (
            <div
              key={item._id}
              onClick={() => {
                navigate(`/hospital/${hospitalId}/doctors/${item._id}`);
                window.scrollTo(0, 0);
              }}
              className="border border-blue-200 rounded-xl overflow-hidden cursor-pointer hover:translate-y-[10px] transition-all duration-500"
            >
              <img
                className="bg-blue-50 w-full h-40 object-center object-cover"
                src={item.doctor_image}
                alt={item.name}
              />
              <div className="p-4">
                <p className="text-gray-900 text-lg font-medium">{item.name}</p>
                <p className="text-gray-600 text-sm">{item.specialty}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default RelatedDoctors;


