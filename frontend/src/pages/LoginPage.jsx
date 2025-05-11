import { FaHospital, FaLock, FaEnvelope } from "react-icons/fa";
import React, { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { toast } from "react-toastify";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../store/authSlice";

export default function LoginPage() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const redirectPath = queryParams.get("redirect") || "/";

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("https://hms-backend-d7jp.onrender.com/patient/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      // ✅ Store token manually in Redux or localStorage for later requests
      dispatch(loginSuccess({ user: data.user, token: data.data }));

      // Optionally store token in localStorage for session persistence
      localStorage.setItem("authToken", data.token);

      toast.success("Login successful!", {
        onClose: () => navigate(redirectPath),
      });
    } catch (err) {
      toast.error(err.message || "Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex justify-center items-center md:bg-slate-100 bg-white relative">
      <div className="max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-green-600 p-8 text-white flex flex-col justify-center items-center">
            <FaHospital className="text-6xl mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
              Welcome to MediCare
            </h2>
            <p className="text-center mb-6">
              Your trusted healthcare management system
            </p>
            <button
              onClick={() => navigate("/registration")}
              className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
            >
              Create an Account
            </button>
          </div>

          <div className="md:w-1/2 p-8">
            <h3 className="text-2xl text-center font-bold text-gray-800 mb-6">
              Sign In to Your Account
            </h3>

            <form className="space-y-4" onSubmit={handleSubmit}>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Sign In
              </button>
            </form>

            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Don't have an account?
                <button
                  onClick={() => navigate("/registration")}
                  className="ml-1 text-green-600 hover:underline"
                >
                  Sign up
                </button>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}




