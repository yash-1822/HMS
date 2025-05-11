import { assets } from "../assets/assets";
import { useEffect, useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";

const About = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  
  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("authToken");

        if (!token) {
          throw new Error("Token not found");
        }

        const response = await fetch(`${backendUrl}/patient/verify-token`, {
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
          navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
        }
      } catch (error) {
        console.error("Token verification failed:", error);
        setIsAuthenticated(false);
        navigate(`/login?redirect=${encodeURIComponent(location.pathname)}`);
      }
    };

    verifyToken();
  }, [navigate, location.pathname]);

  return (
    <div className="px-4 md:px-8 lg:px-12 max-w-full overflow-x-hidden">
      {/* About Us Section */}
      <div className="text-center text-2xl md:text-3xl pt-5 md:pt-10 text-gray-600 font-semibold">
        <p>
          ABOUT <span className="text-gray-800">US</span>
        </p>
      </div>

      <div className="my-6 md:my-10 flex flex-col sm:flex-col md:flex-col lg:flex-row gap-10 items-center lg:items-start">
        

<img
          
          className="w-full max-w-[500px] sm:max-w-[600px] md:max-w-[550px] lg:max-w-[400px] max-h-[350px] object-center rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
        
          src={assets.about_image || "/placeholder.svg"}
          alt="About Us"
        />
        

        <div className="w-full max-w-3xl flex flex-col justify-center gap-4 sm:gap-5 md:gap-6 text-sm sm:text-base text-gray-700 leading-relaxed text-justify px-2">
          <p className="border-l-4 border-green-400 pl-3 sm:pl-4">
            Welcome to <b>Prescripto</b>, your trusted partner in managing your healthcare needs conveniently and
            efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor
            appointments and managing their health records.
          </p>
          <p className="border-l-4 border-green-400 pl-3 sm:pl-4">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our
            platform, integrating the latest advancements to improve user experience and deliver superior service.
          </p>
          <div className="mt-5 md:mt-3 lg:mt-0">
            <span className="text-gray-900 text-lg border-b-2 border-green-400 pb-1 font-bold">Our Vision</span>
            <p className="mt-2">
              Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge
              the gap between patients and healthcare providers, making it easier for you to access the care you need,
              when you need it.
            </p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-2xl my-6 text-gray-700 font-semibold">
        <p>
          WHY <span className="text-green-500">CHOOSE US</span>
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-6 mb-20">
        {[
          { title: "Efficiency", text: "Streamlined appointment scheduling that fits into your busy lifestyle." },
          { title: "Convenience", text: "Access to a network of trusted healthcare professionals in your area." },
          {
            title: "Personalization",
            text: "Tailored recommendations and reminders to help you stay on top of your health.",
          },
        ].map((feature, index) => (
          <div
            key={index}
            className="border border-gray-300 px-4 sm:px-6 md:px-8 py-6 sm:py-8 flex flex-col gap-3 md:gap-5 text-[16px] text-gray-700 cursor-pointer 
            hover:bg-green-400 hover:text-white hover:scale-105 transition-all duration-300 rounded-lg shadow-lg"
          >
            <b className="text-lg border-b-2 border-gray-400 pb-1">{feature.title}:</b>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default About;


