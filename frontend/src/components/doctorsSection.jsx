import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const DoctorsSection = ({ selectedBodyPart, searchQuery, city }) => {
  const navigate = useNavigate();
  const [doctors, setDoctors] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const sliderRef = useRef(null);
  const [filteredDoctors, setFilteredDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        console.log("city from doctors section is", city);
        const cityParam = city && city.trim() !== "" ? city : "all";
        const response = await fetch(`http://localhost:8000/doctors/getDoctorsByCity/${cityParam}`);
        const data = await response.json();
        setDoctors(data);
      } catch (error) {
        console.error("Error fetching doctors:", error);
      }
    };
    fetchDoctors();
  }, [city]);

  useEffect(() => {
    if (!doctors || doctors.length === 0) return;
    let filtered = [...doctors];

    if (searchQuery?.trim() !== "") {
      filtered = filtered.filter((doctor) =>
        doctor.name.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        doctor.specialty?.toLowerCase().includes(searchQuery?.toLowerCase()) ||
        doctor.qualification?.toLowerCase().includes(searchQuery?.toLowerCase())
      );
    }

    setFilteredDoctors(filtered);
  }, [searchQuery, doctors]);

  const handleDoctorClick = (hospitalId, doctorId) => {
    navigate(`/hospital/${hospitalId}/doctors/${doctorId}`);
  };

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 5,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  return (
    <div className="container mx-auto">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        {selectedBodyPart === "all"
          ? "All Doctors"
          : selectedBodyPart
          ? `Doctors for ${selectedBodyPart}`
          : "Featured Doctors"}
      </h2>

      {!seeMore ? (
        <div className="relative">
          <button
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white-300 text-white p-3 rounded-full shadow-lg hover:bg-green-400 z-10 hidden md:block"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft className="text-gray-700" />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {filteredDoctors.length > 0 ? (
              filteredDoctors?.map((doctor) => (
                <div key={doctor.id} className="px-2">
                  <div
                    onClick={() => handleDoctorClick(doctor.hospital._id, doctor._id)}
                    className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200 cursor-pointer"
                  >
                    <div className="p-5 text-center">
                      <img
                        src={doctor.doctor_image || "/placeholder.svg"}
                        alt={doctor.name}
                        className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
                      />
                      <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                      <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No doctors found for {selectedBodyPart}.</p>
            )}
          </Slider>

          <button
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white-300 text-white p-3 rounded-full shadow-lg hover:bg-green-400 z-10 hidden md:block"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight className="text-gray-700" />
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
          {filteredDoctors.length > 0 ? (
            filteredDoctors.map((doctor) => (
              <div key={doctor.id} className="px-2">
                <div
                  onClick={() => handleDoctorClick(doctor.hospital._id, doctor._id)}
                  className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200 cursor-pointer"
                >
                  <div className="p-4 text-center">
                    <img
                      src={doctor.doctor_image || "/placeholder.svg"}
                      alt={doctor.name}
                      className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
                    />
                    <h3 className="text-lg font-semibold text-gray-800">{doctor.name}</h3>
                    <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No doctors found for {selectedBodyPart}.
            </p>
          )}
        </div>
      )}

      <div className="text-center mt-6 mb-4">
        <button
          className="cursor-pointer bg-green-600 text-white px-4 py-2 rounded-lg shadow-md hover:bg-green-700 transition"
          onClick={() => setSeeMore(!seeMore)}
        >
          {seeMore ? "See Less" : "See More"}
        </button>
      </div>
    </div>
  );
};

export default DoctorsSection;

