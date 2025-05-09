import React, { useContext, useEffect } from "react";
import { AdminContext } from "../context/AdminContext";
import { NavLink } from "react-router-dom";
import { assets } from "../assets/assets";
import { DoctorContext } from "../context/DoctorContext";
import { SuperAdminContext } from "../context/SuperAdminContext";
import axios from "axios";
import { toast } from "react-toastify";
import { Link } from 'react-router-dom';
import { Building2, LayoutDashboard, LogOut, X } from 'lucide-react';

const Sidebar = () => {
  //   const { aToken } = useContext(AdminContext);
  //   const { dToken } = useContext(DoctorContext);



  const {
    aToken,
    setAToken,
    backendUrl,
    // setDashData: setAdminDashData,
    setAdminData
  } = useContext(AdminContext);

  const {
    dToken,
    setDToken,
    // setDashData: setDoctorDashData,
    setDoctorData,
    setProfileData,
  } = useContext(DoctorContext);


  const {
    sToken,
    setSToken,
  } = useContext(SuperAdminContext);


  console.log("s token is",sToken);

  const verifyUser = async () => {
    try {
      const headers = {};
      if (aToken) headers["aToken"] = aToken;
      if (dToken) headers["dToken"] = dToken;

      const { data } = await axios.get(`${backendUrl}/adminDoctor/verifyUser`, {
        headers,
      });

      if (data.success) {
        if (data.role === "hospital_admin") {
          setAdminData(data.user);
        } else if (data.role === "doctor") {
          setDoctorData(data.user);
        }
      }
    } catch (error) {
      console.error("User verification failed:", error.message);
      toast.error("Failed to fetch user data");
    }
  };

  useEffect(() => {
    if (aToken || dToken) verifyUser();
  }, [aToken, dToken]);

  return (
    <div className="min-h-[612px] bg-white border-r border-gray-300 pt-4">
      {aToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/admin-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/all-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/add-doctor"}
          >
            <img src={assets.add_icon} alt="" />
            <p className="hidden md:block">Add Doctor</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/doctor-list"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Doctors List</p>
          </NavLink>
        </ul>
      )}

      {/* for doctor */}

      {dToken && (
        <ul className="text-[#515151] mt-5">
          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/doctor-dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block">Dashboard</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/doctor-appointments"}
          >
            <img src={assets.appointment_icon} alt="" />
            <p className="hidden md:block">Appointments</p>
          </NavLink>

          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/doctor-profile"}
          >
            <img src={assets.people_icon} alt="" />
            <p className="hidden md:block">Profile</p>
          </NavLink>
        </ul>
      )}

      {sToken &&
        <ul className="space-y-2">
          {/* <li>
            <Link
              to="/superadmin/dashboard"
              // onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/dashboard'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <LayoutDashboard size={20} />
              <span className="font-medium">Dashboard</span>
            </Link>
          </li>
          <li>
            <Link
              to="/superadmin/hospitals"
              // onClick={onClose}
              className={`flex items-center gap-3 px-4 py-3 rounded-lg transition-colors ${location.pathname === '/admin/hospitals'
                  ? 'bg-emerald-50 text-emerald-600'
                  : 'text-gray-600 hover:bg-gray-50'
                }`}
            >
              <Building2 size={20} />
              <span className="font-medium">Hospitals</span>
            </Link>
          </li> */}


          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-65 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/superadmin/dashboard"}
          >
            <img src={assets.home_icon} alt="" />
            <p className="hidden md:block font-medium">Dashboard</p>
          </NavLink>


          <NavLink
            className={({ isActive }) =>
              `flex items-center gap-3 py-3.5 px-3 md:px-9 md:min-w-72 cursor-pointer ${isActive ? "bg-[#F2F3FF] border-r-4 border-green-400" : ""
              }`
            }
            to={"/superadmin/hospitals"}
          >
            <Building2 size={20} />
            <p className="hidden md:block font-medium">Hospitals</p>
          </NavLink>

        </ul>

      }
    </div>
  );
};

export default Sidebar;

