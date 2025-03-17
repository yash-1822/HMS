

// Register.jsx
import { FaHospital, FaLock, FaEnvelope, FaUser, FaPhone, FaHome } from "react-icons/fa";
import React from "react";
import { useNavigate } from "react-router-dom";

export default function Registration() {
  const navigate = useNavigate();
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-100  relative">
      <img
        src="/hospital-modern.jpg"
        alt="Modern Hospital"
        className="absolute inset-0 w-full h-full object-cover mix-blend-overlay"
      />
      <div className="max-w-4xl w-full bg-white bg-opacity-90 rounded-none md:rounded-lg shadow-2xl overflow-hidden relative z-10">
        <div className="flex flex-col md:flex-row">
          <div className="md:w-1/2 bg-green-600 p-8 text-white flex flex-col justify-center items-center">
            <FaHospital className="text-6xl mb-4" />
            <h2 className="text-2xl md:text-3xl font-bold mb-2 text-nowrap">Welcome to MediCare</h2>
            <p className="text-center mb-6">Your trusted healthcare management system</p>
            <button
              onClick={() => navigate("/login")}
              className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
            >
              Sign In
            </button>
          </div>
          <div className="md:w-1/2 p-8">
            <h3 className="text-2xl text-center text-nowrap font-bold text-gray-800 mb-6">Create a New Account</h3>
            <form className="space-y-4">
              <div className="relative">
                <FaUser className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Full Name"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="relative">
                <FaPhone className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="tel"
                  placeholder="Phone Number"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="relative">
                <FaHome className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="text"
                  placeholder="Address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="relative">
                <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="email"
                  placeholder="Email Address"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <div className="relative">
                <FaLock className="absolute top-3 left-3 text-gray-400" />
                <input
                  type="password"
                  placeholder="Password"
                  className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
              >
                Create Account
              </button>
            </form>
            <div className="mt-6 text-center">
              <p className="text-sm text-gray-600">
                Already have an account?
                <button onClick={() => navigate("/Login")} className="ml-1 text-green-600 hover:underline">
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


