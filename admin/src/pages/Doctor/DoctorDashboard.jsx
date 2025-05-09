import React, { useContext, useEffect,useState } from "react";
import { DoctorContext } from "../../context/DoctorContext";
import { assets } from "../../assets/assets";
import { AppContext } from "../../context/AppContext";
import axios from "axios";
import {toast} from 'react-toastify'

const DoctorDashboard = () => {
  const {backendUrl,doctorData} =useContext(DoctorContext);
    const [appointments, setAppointments] = useState([]);
    const [stats, setStats] = useState({
      totalEarnings: 0,
      totalAppointments: 0,
      totalPatients: 0
    });
    
  // const [dashData,setDashData] = useState()
  const getAppointments = async () => {
    try {
      const res = await fetch(`${backendUrl}/adminDoctor/getAppointments`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          email: doctorData?.email
        })
      });
      const data = await res.json();
      if (data.success) {
        setAppointments(data.appointments);
      }
    } catch (error) {
        console.error('Error fetching doctor appointments:', error);
    }
};

  const cancelAppointment = async (appointmentId) => {
        try {
            console.log("cancel appointment is called")
            const {data} = await axios.post(`${backendUrl}/adminDoctor/cancel-appointment`, {appointmentId})
  
            if (data.success) {
                toast.success(data.message)
                getAppointments()
            }
  
            else {
                toast.error(data.message)
            }
  
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }
  
  
     const completeAppointment = async (appointmentId) => {
            try {
    
                const {data} = await axios.post(`${backendUrl}/adminDoctor/complete-appointment`, {appointmentId} )
    
                if (data.success) {
                    toast.success(data.message)
                    getAppointments()
                }
    
                else {
                    toast.error(data.message)
                }
    
                
            } catch (error) {
                console.log(error);
                toast.error(error.message)
                
            }
        }

  const dashData = {
    earnings: 1250,
    appointments: 8,
    patients: 5,
    latestAppointments: [
      {
        _id: "appt1",
        userData: {
          name: "Alice Johnson",
          image: "https://randomuser.me/api/portraits/women/44.jpg"
        },
        slotDate: "2025-04-10",
        isCompleted: false,
        cancelled: false,
      },
      {
        _id: "appt2",
        userData: {
          name: "Bob Smith",
          image: "https://randomuser.me/api/portraits/men/55.jpg"
        },
        slotDate: "2025-04-09",
        isCompleted: true,
        cancelled: false,
      },
      {
        _id: "appt3",
        userData: {
          name: "Carol Lee",
          image: "https://randomuser.me/api/portraits/women/65.jpg"
        },
        slotDate: "2025-04-08",
        isCompleted: false,
        cancelled: true,
      },
      {
        _id: "appt4",
        userData: {
          name: "Daniel Kim",
          image: "https://randomuser.me/api/portraits/men/35.jpg"
        },
        slotDate: "2025-04-07",
        isCompleted: true,
        cancelled: false,
      },
      {
        _id: "appt5",
        userData: {
          name: "Eva Mendes",
          image: "https://randomuser.me/api/portraits/women/25.jpg"
        },
        slotDate: "2025-04-06",
        isCompleted: false,
        cancelled: false,
      }
    ]
  }

  const fetchAppointmentStats = async () => {
    try {

      const token = localStorage.getItem('dToken'); // or wherever you store it

    const res = await axios.get(`${backendUrl}/adminDoctor/appointment-stats`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    });

      // const res = await axios.get(`${backendUrl}/adminDoctor/appointment-stats`);
      console.log("respnse is",res);
      if (res.data.success) {
        setStats({
          totalEarnings: res.data.totalEarnings,
          totalAppointments: res.data.totalAppointments,
          totalPatients: res.data.totalPatients
        });
      } else {
        // setError('Failed to fetch stats');
      }
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      // setLoading(false);
    }
  };

  
  

  const { 
    dToken, 
    setDashData, 
    getDashData,  
  } = useContext(DoctorContext);
  
  

  useEffect(() => {
    setDashData(dashData);
    getAppointments()
    fetchAppointmentStats()
  }, []);
  

  return (
      <div className="m-5">
        {/* Flex container for cards */}
        <div className="flex flex-wrap gap-5">
          {/* Doctors */}
          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.earning_icon}
              alt="Doctors"
              className=" w-12 h-12 "
            />
            <div>
              <p className="text-xl font-semibold">
                {"$"} {stats.totalEarnings ?? "N/A"}
              </p>
              <p className="text-gray-500 text-sm">Earnings</p>
            </div>
          </div>

          {/* Appointments */}
          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.appointment_icon}
              alt="Appointments"
              className="w-12 h-12"
            />
            <div>
              <p className="text-xl font-semibold">
                {stats.totalAppointments?? "N/A"}
              </p>
              <p className="text-gray-500 text-sm">Appointments</p>
            </div>
          </div>

          {/* Patients */}
          <div className="flex items-center gap-4 bg-white p-5 min-w-60 rounded-lg border border-gray-200 shadow-md cursor-pointer hover:scale-105 transition-all">
            <img
              src={assets.patients_icon}
              alt="Patients"
              className="w-12 h-12"
            />
            <div>
              <p className="text-xl font-semibold">
                {stats.totalPatients ?? "N/A"}
              </p>
              <p className="text-gray-500 text-sm">Patients</p>
            </div>
          </div>
        </div>




        <div className="bg-white h-[460px] overflow-y-auto">
          <div className="flex items-center gap-2.5 px-4 py-4 mt-10 rounded-t border border-gray-300">
            <img className="font-semibold" src={assets.list_icon} alt="" />
            <p>Latest Bookings</p>
          </div>

          <div className="pt-4 border border-t-0 border-gray-300">
            {appointments?.map((item, index) => (
              <div
                className="flex items-center px-6 py-3 gap-3 hover:bg-gray-100"
                key={index}
              >
                {/* <img
                  className="rounded-full w-10"
                  src={item.userData.image}
                  alt=""
                /> */}
                <div className="flex-1 text-sm">
                  <p className="text-gray-800 font-medium">
                    {item.name}
                  </p>
                  {/* <p className="text-gray-600">{slotDateFormat(item.slotDate)}</p> */}
                  <p className="text-gray-600">{item.slotDate}</p>
                </div>
                {item.cancelled ? (
                  <p className="text-red-400 text-xs font-medium">cancelled</p>
                ) : item.isCompleted ? (
                  <p className="text-green-500 text-xs font-medium">
                    Completed
                  </p>
                ) : (
                  <div className="flex">
                    <img
                      onClick={() => cancelAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.cancel_icon}
                      alt=""
                    />
                    <img
                      onClick={() => completeAppointment(item._id)}
                      className="w-10 cursor-pointer"
                      src={assets.tick_icon}
                      alt=""
                    />
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    
  );
};

export default DoctorDashboard;
