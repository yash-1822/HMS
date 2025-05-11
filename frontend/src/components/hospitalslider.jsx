import { useState, useEffect, useRef } from "react";
import Slider from "react-slick";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import { useNavigate } from "react-router-dom";
import { useOutletContext } from "react-router-dom";


const HospitalSlider = ({ selectedBodyPart }) => {
  const { searchQuery, city } = useOutletContext();
  const navigate = useNavigate();
  const [hospitals, setHospitals] = useState([]);
  const [filteredHospitals, setFilteredHospitals] = useState([]);
  const [seeMore, setSeeMore] = useState(false);
  const [loading, setLoading] = useState(true); // 👈 Add loading state
  const sliderRef = useRef(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL

  const locationOptions = [
    "Anantapur",
    "Chittoor",
    "East Godavari",
    "Guntur",
    "Kadapa",
    "Krishna",
    "Kurnool",
    "Nellore",
    "Prakasam",
    "Srikakulam",
    "Visakhapatnam",
    "Vizianagaram",
    "West Godavari",
  ];

  console.log("city is from slider is:",city)

  useEffect(() => {
    const fetchHospitals = async () => {
      setLoading(true); // Start loading
      try {
        let cityParam = city && city.trim() !== "" ? city : "all";
        if(locationOptions.includes(cityParam)){
          cityParam = city
        }
        else{
          cityParam = 'vijayawada'
        }
      
        const response = await fetch(`${backendUrl}/hospital/hospitals/${cityParam}`);
        const data = await response.json();
        setHospitals(data);
      } catch (error) {
        console.error("Error fetching hospitals:", error);
      } finally {
        setLoading(false); // Stop loading
      }
    };
    fetchHospitals();
  }, [city]);

  const getFirstTiming = (hours) => {
    if (!hours) return "Timing info not available";
    const matches = hours.match(/\[(.*?)\]/);
    return matches ? matches[1] : "Timing info not available";
  };

  useEffect(() => {
    let filtered = hospitals;
    if (selectedBodyPart && selectedBodyPart !== "all") {
      filtered = filtered.filter((hospital) =>
        hospital.Speciality.some((speciality) =>
          speciality.toLowerCase() === selectedBodyPart.toLowerCase()
        )
      );
    }
    if (searchQuery.trim() !== "") {
      filtered = filtered.filter((hospital) =>
        hospital.Place_name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        hospital.Speciality.some((speciality) =>
          speciality.toLowerCase().includes(searchQuery.toLowerCase())
        ) ||
        hospital.Address1.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    setFilteredHospitals(filtered);
  }, [selectedBodyPart, searchQuery, hospitals]);

  const settings = {
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    arrows: false,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } },
    ],
  };

  const renderStars = (score) => {
    const fullStars = Math.floor(score);
    const hasHalfStar = score % 1 !== 0;
    return (
      <>
        {[...Array(fullStars)].map((_, i) => (
          <AiFillStar key={i} className="text-green-500 text-xl" />
        ))}
        {hasHalfStar && <AiOutlineStar className="text-green-400 text-xl" />}
      </>
    );
  };

  return (
    <div className="container mx-auto py-10">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-6">
        {selectedBodyPart === "all"
          ? "All Hospitals"
          : selectedBodyPart
          ? `Hospitals for ${selectedBodyPart}`
          : "Featured Hospitals"}
      </h2>

      {loading ? (
        // Loader shown while fetching
        <div className="flex justify-center items-center h-40">
          <div className="w-10 h-10 border-4 border-green-500 border-t-transparent rounded-full animate-spin"></div>
        </div>
      ) : !seeMore ? (
        // Slider view
        <div className="relative">
          <button
            className="hidden md:block absolute left-0 top-1/2 transform -translate-y-1/2 bg-white-300 text-white p-3 rounded-full shadow-lg hover:bg-green-400 z-10"
            onClick={() => sliderRef.current.slickPrev()}
          >
            <FaChevronLeft className="text-gray-800" />
          </button>

          <Slider ref={sliderRef} {...settings}>
            {filteredHospitals.length > 0 ? (
              filteredHospitals.map((hospital) => (
                <div key={hospital._id} className="px-4 py-5">
                  <div
                    className="bg-white rounded-lg shadow-lg border border-gray-200 transition-transform transform hover:scale-105 hover:shadow-2xl cursor-pointer h-[345px] flex flex-col justify-between"
                    onClick={() => navigate(`/hospital/${hospital._id}`)}
                  >
                    <img
                      src={hospital.Featured_Image || "/images/hospital1.png"}
                      alt={hospital.Place_name}
                      className="w-full object-cover h-40 rounded-t-lg"
                      onError={(e) => (e.target.src = "/images/hospital1.png")}
                    />
                    <div className="px-4 py-2 flex flex-col justify-between flex-grow">
                      <h3 className="text-md mt-1 font-semibold text-gray-800 line-clamp-1">{hospital.Place_name}</h3>
                      <p className="text-sm text-gray-600 line-clamp-2">{hospital.Address1}</p>
                      <div className="mt-1">
                        <span className="text-md font-semibold text-gray-800">Specialized in : </span>
                        <span className="text-sm text-gray-600">
                          {hospital.Speciality.length > 0 ? hospital.Speciality.join(", ") : "Not Available"}
                        </span>
                      </div>
                      <div className="flex mt-1">
                        <span className="text-md font-semibold text-gray-800 -mt-[3px]">Ratings:</span>
                        {renderStars(hospital.Total_score)}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        ⏰ {getFirstTiming(hospital.Hours)}
                      </p>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-center text-gray-600">No hospitals found for {selectedBodyPart}.</p>
            )}
          </Slider>

          <button
            className="hidden md:block absolute right-0 top-1/2 transform -translate-y-1/2 bg-white-300 text-white p-3 rounded-full shadow-lg hover:bg-green-400 z-10"
            onClick={() => sliderRef.current.slickNext()}
          >
            <FaChevronRight className="text-gray-800" />
          </button>
        </div>
      ) : (
        // Grid View
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {filteredHospitals.length > 0 ? (
            filteredHospitals.map((hospital) => (
              <div key={hospital._id} onClick={() => navigate(`/hospital/${hospital._id}`)} className="cursor-pointer bg-white rounded-lg shadow-lg border border-gray-200 p-4 flex flex-col justify-between">
                <img
                  src={hospital.Featured_Image || "/images/hospital1.png"}
                  alt={hospital.Place_name}
                  className="w-full object-cover h-40 rounded-t-lg"
                  onError={(e) => (e.target.src = "/images/hospital1.png")}
                />
                <div className="">
                  <h3 className="text-md font-semibold text-gray-800 line-clamp-1 mt-1">{hospital.Place_name}</h3>
                  <p className="text-sm text-gray-600 line-clamp-2">{hospital.Address1}</p>
                  <div className="mt-1">
                    <span className="text-md font-semibold text-gray-800">Specialized in : </span>
                    <span className="text-sm text-gray-600">
                      {hospital.Speciality.length > 0 ? hospital.Speciality.join(", ") : "Not Available"}
                    </span>
                  </div>
                  <div className="flex mt-2">
                    <span className="text-md font-semibold text-gray-800 -mt-[3px]">Ratings:</span>
                    {renderStars(hospital.Total_score)}
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    ⏰ {getFirstTiming(hospital.Hours)}
                  </p>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-600 col-span-full">
              No hospitals found for {selectedBodyPart}.
            </p>
          )}
        </div>
      )}

      <div className="text-center mt-4">
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

export default HospitalSlider;
