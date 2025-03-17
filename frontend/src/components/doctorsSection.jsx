import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const DoctorsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 3 } },
      { breakpoint: 768, settings: { slidesToShow: 2 } },
      { breakpoint: 480, settings: { slidesToShow: 1 } },
    ],
  };

  const doctors = [
    { id: 1, name: "Dr. John Doe", specialty: "Cardiologist", image: "/images/doc1.png" },
    { id: 2, name: "Dr. Jane Smith", specialty: "Pediatrician", image: "/images/doc2.png" },
    { id: 3, name: "Dr. Mike Johnson", specialty: "Neurologist", image: "/images/doc3.png" },
    { id: 4, name: "Dr. Sarah Brown", specialty: "Dermatologist", image: "/images/doc4.png" },
    { id: 5, name: "Dr. Emily Davis", specialty: "Oncologist", image: "/images/doc5.png" },
  ];

  return (
    <div className="container mx-auto py-10 px-4">
      <h2 className="text-3xl font-bold text-green-600 text-center mb-8">Our Expert Doctors</h2>
      <Slider {...settings}>
        {doctors.map((doctor) => (
          <div key={doctor.id} className="px-2">
            <a
              href={`/appointment/${doctor.id}`}
              className="block bg-white rounded-lg shadow-lg hover:shadow-2xl transform transition-transform hover:scale-105 duration-300 border border-gray-200"
            >
              <div className="p-6 text-center">
                <img
                  src={doctor.image || "/placeholder.svg"}
                  alt={doctor.name}
                  className="rounded-full mx-auto mb-4 border-4 border-green-500 w-[150px] h-[150px] object-cover"
                />
                <h3 className="text-xl font-semibold text-gray-800">{doctor.name}</h3>
                <p className="text-md text-green-600 font-medium">{doctor.specialty}</p>
              </div>
            </a>
          </div>
        ))}
      </Slider>
    </div>
  );
};

export default DoctorsSection;
