import { useState } from "react";
import { FaHospital, FaLock, FaEnvelope, FaUser, FaPhone, FaHome } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";



export default function Registration() {
  const navigate = useNavigate();
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});

  // Handle input change and clear errors dynamically
  const handleChange = (e) => {
    const { name, value } = e.target;

    // Ensure phone only accepts numbers and is max 10 digits
    if (name === "phone" && !/^\d{0,10}$/.test(value)) return;

    setFormData({ ...formData, [name]: value });

    // Clear error when user enters correct data
    setErrors((prevErrors) => {
      const newErrors = { ...prevErrors };
      if (name === "phone" && value.length === 10) delete newErrors.phone;
      if (name === "password" && value.length >= 6) delete newErrors.password;
      if (name === "confirmPassword" && value === formData.password) delete newErrors.confirmPassword;
      return newErrors;
    });
  };

  const validateForm = () => {
    let newErrors = {};

    if (formData.phone.length !== 10) {
      newErrors.phone = "Phone number must be exactly 10 digits.";
    }

    if (formData.password.length < 6) {
      newErrors.password = "Password must be at least 6 characters.";
    }

    if (formData.password !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Returns true if no errors
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    if (!validateForm()) return;
      setLoading(true); // Show spinner

      console.log("Form Submitted Successfully", formData);
      try {
        const response = await fetch(`${backendUrl}/patient/register`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });
  
        const data = await response.json();
  
        if (response.ok) {
          toast.success("Registration successful!", {
            onClose: () => navigate("/login") // Navigate only after toast disappears
          });
        } else {
          setErrors(data.message || "Registration failed. Please try again.");
        }
      } catch (err) {
        toast.error("Registartion Failure!")
        setErrors("Something went wrong. Please check your connection.");
      }
      finally {
        setLoading(false); // Hide spinner
      }
    
  };

  return (
    <div className="min-h-screen  flex items-center justify-center bg-slate-100 relative">
      <img
        src="/hospital-modern.jpg"
        alt="Modern Hospital"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
      />
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-none md:rounded-lg shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2  bg-green-600 p-md-8 p-[50px]  text-white flex flex-col justify-center items-center">
            <FaHospital className="text-6xl mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2">Welcome to MediCare</h2>
            <p className="text-center mb-6">Your trusted healthcare management system</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
            >
              Sign In
            </button>
          </div>
          <div className="md:w-1/2 p-8 h-[590px]">
            <h3 className="text-2xl text-center font-bold text-gray-800 mb-6">Create a New Account</h3>
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* Name */}
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="name"
                  placeholder="Full Name"
                  value={formData.name}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              {/* Phone Number */}
              <div className="relative">
                <FaPhone className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="phone"
                  placeholder="Phone Number"
                  value={formData.phone}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
                {errors.phone && <p className="text-red-500 text-xs mt-1">{errors.phone}</p>}
              </div>

              {/* Address */}
              <div className="relative">
                <FaHome className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  name="address"
                  placeholder="Address"
                  value={formData.address}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              {/* Email */}
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  value={formData.email}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              {/* Password */}
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
                {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
                {errors.confirmPassword && <p className="text-red-500 text-xs mt-1">{errors.confirmPassword}</p>}
              </div>

              {/* Submit Button */}
              {/* <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Create Account
              </button> */}

<button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition flex items-center justify-center"
                disabled={loading}
              >
                {loading ? <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div> : "Create Account"}
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?
                <button onClick={() => navigate("/login")} className="ml-1 text-green-600 hover:underline">
                  Sign in
                </button>



              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}





