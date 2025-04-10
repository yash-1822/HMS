// import { FaHospital, FaLock, FaEnvelope } from "react-icons/fa";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   const navigate = useNavigate();

//   // State to store user input and errors
//   const [formData, setFormData] = useState({ email: "", password: "" });
//   const [error, setError] = useState("");

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setError(""); // Clear error when user starts typing
//   };

//   // Handle form submission
//   const handleSubmit = async (e) => {
//     e.preventDefault(); // Prevent default form submission

//     try {
//       const response = await fetch("http://localhost:8000/patient/login", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // Store JWT token (if applicable)
//       localStorage.setItem("token", data.token);

//       // Navigate to dashboard or home page after login
//       navigate("/");
//     } catch (err) {
//       setError(err.message);
//     }
//   };



//   return (
//     <div className="min-h-screen flex justify-center items-center  md:bg-slate-100 bg-white relative">
//       <div className="max-w-4xl  bg-white bg-opacity-90 rounded-lg shadow-2xl overflow-hidden relative z-10">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2  bg-green-600 p-8 text-white flex flex-col justify-center items-center">
//             <FaHospital className="text-6xl mb-4" />
//             <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">Welcome to MediCare</h2>
//             <p className="text-center mb-6">Your trusted healthcare management system</p>
//             <button
//               onClick={() => navigate("/registration")}
//               className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
//             >
//               Create an Account
//             </button>
//           </div>

//           <div className="md:w-1/2 p-8">
//             <h3 className="text-2xl text-center font-bold text-gray-800 mb-6">Sign In to Your Account</h3>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div className="relative">
//                 <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="relative">
//                 <FaLock className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                   required
//                 />
//               </div>

//               {/* Error Message */}
//               {error && <p className="text-red-600 text-sm">{error}</p>}

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
//               >
//                 Sign In
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?
//                 <button onClick={() => navigate("/registration")} className="ml-1 text-green-600 hover:underline">
//                   Sign up
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }






// import { FaHospital, FaLock, FaEnvelope } from "react-icons/fa";
// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
// import { toast } from "react-toastify";

// export default function LoginPage() {
//   const navigate = useNavigate();
//   const [formData, setFormData] = useState({ email: "", password: "" });

//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     try {
//       const response = await fetch("http://localhost:8000/patient/login", {
//         credentials:'include',
//         method: "POST",
//         headers: { "content-Type": "application/json" },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (!response.ok) {
//         throw new Error(data.message || "Login failed");
//       }

//       // localStorage.setItem("token", data.data);

//       // ✅ Show success toast, then navigate
//       toast.success("Login successful!", {
//         onClose: () => navigate("/"),  // Navigate only after toast closes
//       });
//     } catch (err) {
//       // ❌ Show error toast without navigating
//       toast.error(err.message || "Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex justify-center items-center md:bg-slate-100 bg-white relative">
//       <div className="max-w-4xl bg-white bg-opacity-90 rounded-lg shadow-2xl overflow-hidden relative z-10">
//         <div className="flex flex-col md:flex-row">
//           <div className="md:w-1/2 bg-green-600 p-8 text-white flex flex-col justify-center items-center">
//             <FaHospital className="text-6xl mb-4" />
//             <h2 className="text-2xl md:text-3xl font-bold mb-2 text-center">
//               Welcome to MediCare
//             </h2>
//             <p className="text-center mb-6">
//               Your trusted healthcare management system
//             </p>
//             <button
//               onClick={() => navigate("/registration")}
//               className="bg-white text-green-600 px-6 py-2 rounded-full font-semibold hover:bg-green-100 transition duration-300"
//             >
//               Create an Account
//             </button>
//           </div>

//           <div className="md:w-1/2 p-8">
//             <h3 className="text-2xl text-center font-bold text-gray-800 mb-6">
//               Sign In to Your Account
//             </h3>

//             <form className="space-y-4" onSubmit={handleSubmit}>
//               {/* Email Field */}
//               <div className="relative">
//                 <FaEnvelope className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="email"
//                   name="email"
//                   value={formData.email}
//                   onChange={handleChange}
//                   placeholder="Email Address"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                   required
//                 />
//               </div>

//               {/* Password Field */}
//               <div className="relative">
//                 <FaLock className="absolute top-3 left-3 text-gray-400" />
//                 <input
//                   type="password"
//                   name="password"
//                   value={formData.password}
//                   onChange={handleChange}
//                   placeholder="Password"
//                   className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:border-green-500"
//                   required
//                 />
//               </div>

//               {/* Submit Button */}
//               <button
//                 type="submit"
//                 className="w-full bg-green-600 text-white py-2 rounded-lg hover:bg-green-700 transition duration-300"
//               >
//                 Sign In
//               </button>
//             </form>

//             <div className="mt-6 text-center">
//               <p className="text-sm text-gray-600">
//                 Don't have an account?
//                 <button
//                   onClick={() => navigate("/registration")}
//                   className="ml-1 text-green-600 hover:underline"
//                 >
//                   Sign up
//                 </button>
//               </p>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// }





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
  const redirectPath = queryParams.get("redirect") || "/"; // Default to home if no redirect is set

  const [formData, setFormData] = useState({ email: "", password: "" });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://localhost:8000/patient/login", {
        credentials: "include",
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }

      dispatch(loginSuccess({ user: data.user, token: data.data }));
      
      toast.success("Login successful!", {
        onClose: () => navigate(redirectPath), // Navigate to intended page after toast
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
              {/* Email Field */}
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

              {/* Password Field */}
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

              {/* Submit Button */}
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



