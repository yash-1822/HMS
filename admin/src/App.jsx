import React, { useContext, useEffect, useState } from 'react';
import Login from './pages/Login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AdminContext } from './context/AdminContext';
import Navbar from './components/Navbar';
import Sidebar from './components/Sidebar';
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Admin/Dashboard';
import AllAppointments from './pages/Admin/AllAppointments';
import AddDoctor from './pages/Admin/AddDoctor';
import DoctorsList from './pages/Admin/DoctorsList';
import { DoctorContext } from './context/DoctorContext';
import DoctorDashboard from './pages/Doctor/DoctorDashboard';
import DoctorAppointment from './pages/Doctor/DoctorAppointment';
import DoctorProfile from './pages/Doctor/DoctorProfile';
import DashboardHospital from './pages/SuperAdmin/DashboardHospital';
import Hospitals from './pages/SuperAdmin/Hospitals';
import { SuperAdminContext } from './context/SuperAdminContext';

const App = () => {
  const { aToken, setAToken } = useContext(AdminContext);
  const { dToken, setDToken } = useContext(DoctorContext);
  const {sToken,setSToken} = useContext(SuperAdminContext)
  const [isAuthenticated, setIsAuthenticated] = useState(aToken || dToken || sToken);

  useEffect(() => {
    // Listen for token changes and update state
    setIsAuthenticated(aToken || dToken || sToken);
  }, [aToken, dToken,sToken]);

  return isAuthenticated ? (
    <div className="bg-[#F8F9FD]">
      <ToastContainer />
      <Navbar />
      <div className="flex items-start">
        <Sidebar />
        <Routes>
          {/* Admin Routes */}
          <Route path="/" element={<></>} />
          <Route path="/admin-dashboard" element={<Dashboard />} />
          <Route path="/all-appointments" element={<AllAppointments />} />
          <Route path="/add-doctor" element={<AddDoctor />} />
          <Route path="/doctor-list" element={<DoctorsList />} />

          {/* Doctor Routes */}
          <Route path="/doctor-dashboard" element={<DoctorDashboard />} />
          <Route path="/doctor-appointments" element={<DoctorAppointment />} />
          <Route path="/doctor-profile" element={<DoctorProfile />} />

          {/* Super Admin Routes */}

          <Route path="/admin/dashboard" element={<DashboardHospital />} />
          <Route path="/admin/hospitals" element={<Hospitals/>} />
          {/* <Route path="/" element={<Dashboard />} /> */}
        </Routes>
      </div>
    </div>
  ) : (
    <>
      <Login />
      <ToastContainer />
    </>
  );
};

export default App;
