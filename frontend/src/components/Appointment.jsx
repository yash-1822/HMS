
import React, { useEffect, useState } from 'react';
// import jwt_decode from "jwt-decode";
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { assets } from "../assets/assets";
import RelatedDoctors from '../components/RelatedDoctors';
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
import Swal from "sweetalert2";
import {toast} from 'react-toastify'


const Appointment = () => {
  const { doctorId,hospitalId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();

  const [payment,setPayment] = useState(false);
  const daysOfWeek = ['SUN', 'MON', 'TUE', 'WED', 'THU', 'FRI', 'SAT'];
  const [docInfo, setDocInfo] = useState(null);
  const [availableDays, setAvailableDays] = useState([]);
  const [selectedDayIndex, setSelectedDayIndex] = useState(0);
  const [availableTimeSlots, setAvailableTimeSlots] = useState([]);
  const [selectedSlotTime, setSelectedSlotTime] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDay, setSelectedDay] = useState(null);
const [selectedSlot, setSelectedSlot] = useState(null);
const [bookedSlots, setBookedSlots] = useState([]);
const [selectedDate,setSelectedDate] = useState();

console.log("selected date",selectedDate)


const handleDayClick = (day) => {
  setSelectedDay(day);
};

const handleSlotClick = (slot) => {
  setSelectedSlot(slot);
};



  console.log("docinfo is:",docInfo);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const token = localStorage.getItem("authToken");
        if (!token) throw new Error("Token not found");

        const response = await fetch("https://hms-backend-d7jp.onrender.com/patient/verify-token", {
          method: "GET",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await response.json();
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


  const fetchBookedAppointments = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch(`https://hms-backend-d7jp.onrender.com/doctors/${doctorId}/appointments?date=${selectedDate}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
      });
      if (!response.ok) throw new Error("Failed to fetch appointments");
      const data = await response.json();
      setBookedSlots(data); // Store booked appointments
    } catch (error) {
      console.error("Error fetching appointments:", error);
    }
  };

  useEffect(() => {
    if (docInfo) {
      fetchBookedAppointments();
    }
  }, [docInfo,selectedDate]);

  console.log("bookedSlots are:",bookedSlots)
  

  useEffect(() => {
    const fetchDoctor = async () => {
      try {
        const token = localStorage.getItem("authToken");
        const response = await fetch(`https://hms-backend-d7jp.onrender.com/doctors/${doctorId}`, {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${token}`,
          },
        });
        if (!response.ok) throw new Error("Failed to fetch doctor details");
        const data = await response.json();
        setDocInfo(data);
      } catch (error) {
        console.error("Error fetching doctor:", error);
      }
    };

    fetchDoctor();
  }, [doctorId]);

  useEffect(() => {
    if (docInfo && bookedSlots.length >= 0) {
      generateNext7Days(docInfo, bookedSlots);
    }
  }, [docInfo, bookedSlots]);

  const generateNext7Days = (doctor, bookedAppointments) => {
    console.log("bookedappointments slots are:",bookedAppointments)

    const today = new Date();
    const daysArray = [];
  
    for (let i = 0; i < 7; i++) {
      const currentDate = new Date(today);
      currentDate.setDate(today.getDate() + i);
  
      const dayName = currentDate.toLocaleDateString("en-US", { weekday: "long" });
      const formattedDate = currentDate.toISOString().split("T")[0];
  
      const availability = doctor.availability.find(
        (avail) => avail.day === dayName && avail.available
      );
  
      if (availability) {
        // Get all booked slots for this date
        const bookedForDate = bookedAppointments
          // .filter((appointment) => appointment.date === formattedDate)
          // .map((appointment) => appointment.slot);
  
        // Filter slots that are not booked
        const freeSlots = availability.slots.filter((slot) => !bookedForDate.includes(slot));
  
        
        if (freeSlots.length > 0) {
          daysArray.push({
            date: formattedDate,
            day: dayName,
            slots: freeSlots,
          });
        }
      }
    }
  
    setAvailableDays(daysArray);
    if (daysArray.length > 0) {
      // setSelectedDayIndex(0);
      setAvailableTimeSlots(daysArray[0].slots);
    } else {
      // setSelectedDayIndex(0);
      setAvailableTimeSlots([]);
    }
  };
  
  
  

  const handleDaySelection = (index,date) => {
    setSelectedDayIndex(index);
    setAvailableTimeSlots(availableDays[index].slots);
    setSelectedDate(date)
    setSelectedSlotTime("");
  };


 

  const handleTimeSlotSelection = (time) => {
    setSelectedSlotTime(time);
  };

  const renderStars = (rating) => {
    const filledStars = Math.floor(rating);
    const emptyStars = 5 - filledStars;
    return (
      <div className="flex text-yellow-400">
        {Array(filledStars).fill().map((_, i) => (
          <AiFillStar key={i} size={20} />
        ))}
        {Array(emptyStars).fill().map((_, i) => (
          <AiOutlineStar key={i} size={20} />
        ))}
      </div>
    );
  };

  const handleBookAppointmentClick = () => {
    setIsModalOpen(true);
  };


  const handlePaymentSelection = async (selectedPayment) => {
    try {
      setPayment(selectedPayment);
      setIsModalOpen(false);

      const token1 = localStorage.getItem("authToken");

const userResponse = await fetch("https://hms-backend-d7jp.onrender.com/patient/get-user-details", {
  method: "GET",
  headers: {
    Authorization: token1,
  },
});

const userData = await userResponse.json();


const selectedDateObject = new Date(availableDays[selectedDayIndex].date);
const formattedDate = `${selectedDateObject.getFullYear()}/${String(selectedDateObject.getMonth() + 1).padStart(2, '0')}/${String(selectedDateObject.getDate()).padStart(2, '0')}`;

console.log("userdata is:",userData)

      const doctorData = {
        doctorName: docInfo.name,
        specialization: docInfo.specialty,
        email: docInfo.email,
      };
      

      const appointmentData = {
        patientName: userData?.name,
        docData:doctorData,
        amount:docInfo?.consultancyFees,
        doctorId: docInfo?._id,
        patientId: userData?._id,
        hospitalId: docInfo?.hospital,
        slot: selectedSlotTime,
        date: formattedDate,
        phone:userData?.phone,
        payment: selectedPayment,
        email: userData?.email,
      };

      console.log("appointmentData is",appointmentData);
  
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://hms-backend-d7jp.onrender.com/doctors/bookAppointment", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify(appointmentData),
      });
  
      if (response.ok) {
        const token = localStorage.getItem("authToken")
        const result = await response.json();
        toast.success("Appointment Booked!");

        setBookedSlots(prev => [...prev, {
          date: formattedDate,
          slot: selectedSlotTime,
        }]);
      
        // Regenerate available days and slots
        fetchBookedAppointments()
        generateNext7Days();
        // generateNext7Days(docInfo, [...bookedSlots, { date: formattedDate, slot: selectedSlotTime }]);

  
        await fetch("https://hms-backend-d7jp.onrender.com/patient/send-confirmation-mail", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // <-- FIXED LINE
          },
          body: JSON.stringify({
            to: appointmentData.email,
            subject: "Appointment Confirmation",
            body: `Dear ${appointmentData.patientName},\n\nYour appointment with Dr. ${appointmentData.docData.doctorName} on ${appointmentData.date} at ${appointmentData.slot} has been confirmed.\n\nThank you!`,
          }),
        });
                
      } else {
        toast.error("Appointment booking failed.");
      }
    } catch (error) {
      console.error("Booking Error:", error);
      // toast.error("An error occurred. Please try again.");
    }
  };
  
  


  const handlePayment = async (method) => {
    setIsModalOpen(false);
  
    try {
      const token = localStorage.getItem("authToken");
      const response = await fetch("https://hms-backend-d7jp.onrender.com/patient/send-confirmation-mail", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`,
        },
        body: JSON.stringify({
          doctorName: docInfo.name,
          specialty: docInfo.specialty,
          date: availableDays[selectedDayIndex].date,
          slot: selectedSlotTime,
          paymentMethod: method,
        }),
      });
  
      if (!response.ok) {
        const errorDetails = await response.json();
        throw new Error(errorDetails.message || "Failed to send email");
      }
  
      const result = await response.json();
  
      Swal.fire({
        icon: "success",
        title: "Appointment Booked!",
        text: `Confirmation email sent. You chose to pay ${method}.`,
        confirmButtonColor: "#3085d6",
      });
    } catch (error) {
      console.error("Email sending error:", error);
      Swal.fire({
        icon: "error",
        title: "Error",
        text: error.message || "Booking succeeded but email failed to send.",
      });
    }
  };
  

  return docInfo && (
    <div className="w-full max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {isModalOpen && (
  <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur bg-opacity-60">
    <div className="bg-white p-6 rounded-lg shadow-xl w-80">
      <h2 className="text-lg font-semibold mb-4 text-center">Choose Payment Method</h2>
      <div className="flex justify-between">
        <button
          className="bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 w-full mr-2"
          onClick={() => handlePaymentSelection(true)}
        >
          Online
        </button>
        <button
          className="bg-gray-600 text-white py-2 px-4 rounded hover:bg-gray-700 w-full ml-2"
          onClick={() => handlePaymentSelection(false)}
        >
          Offline
        </button>
      </div>
    </div>
  </div>
)}


      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        <div className="bg-gradient-to-r from-green-50 to-blue-50 p-6 sm:p-8 flex flex-col md:flex-row gap-8 lg:gap-40 md:items-center">
          <div className="w-full md:w-80 flex-shrink-0">
            <img src={docInfo.doctor_image} alt={docInfo.name} className="w-full h-auto rounded-lg shadow-lg" />
          </div>

          <div className="flex-1 space-y-4">
            <h1 className="md:text-3xl text-lg font-bold text-gray-900 flex items-center gap-2">
              {docInfo.name}
              <img className="w-6 h-6" src={assets.verified_icon} alt="Verified" />
            </h1>
            <p className="text-md md:text-xl font-semibold text-gray-800">
              {docInfo.specialty} <span className="text-blue-600">({docInfo.bodyPart} Specialist)</span>  
            </p>
            <p className="text-md md:text-lg text-gray-700">
              <span className="font-medium text-gray-900">Qualification:</span> {docInfo.qualification}
            </p>
            <p className="text-md md:text-lg text-gray-700">
              <span className="font-medium text-gray-900">Experience:</span> {docInfo.experience} years
            </p>
            <div className="flex items-center gap-2 text-lg font-medium text-gray-900">
              Rating: {renderStars(docInfo.ratings)}
            </div>
            <p className="text-lg md:text-xl font-semibold text-green-600">
              Consultation Fee: ₹{docInfo.consultancyFees}
            </p>
          </div>
        </div>

        <div className="p-[11px] md:p-6">
          <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Date</h2>

          <div className="flex lg:justify-center gap-4 overflow-x-auto mb-6 pb-4 scrollbar-hide">
            {availableDays.map((item, index) => {
              const availabilityInfo = docInfo.availability.find(avail => avail.day === item.day);
              const isUnavailable = availabilityInfo ? !availabilityInfo.available : false;

              return (
                <button
                  key={index}
                  onClick={() => handleDaySelection(index,item.date)}
                  className={`scrollbar-hide flex flex-col items-center min-w-[80px] sm:min-w-[100px] p-3 sm:p-4 rounded-md transition-all duration-300 
                    ${selectedDayIndex === index ? 'bg-green-500 text-white' : isUnavailable ? 'bg-red-500 text-white' : 'bg-gray-200'}`}
                  title={isUnavailable ? "Doctor is not available" : ""}
                >
                  <span className="text-xs sm:text-sm font-medium">{item.day}</span>
                  <span className="text-xl sm:text-2xl font-bold mt-1">{item.date.split("-")[2]}</span>
                </button>
              );
            })}

          </div>

          <h2 className="lg:text-2xl md:text-xl text-md text-center font-semibold text-gray-900 mb-4 ">Select Appointment Slot</h2>

          {docInfo.availability.find(avail => avail.day === availableDays[selectedDayIndex]?.day)?.available ? (
            <div className="flex lg:justify-center gap-3 overflow-x-auto pb-4 mb-6 scrollbar-hide">
              {availableTimeSlots.map((time, index) => (
                <button
                  key={index}
                  onClick={() => handleTimeSlotSelection(time)}
                  className={`p-2 sm:p-3 rounded-lg transition-all duration-300 ${selectedSlotTime === time ? 'bg-green-500 text-white' : 'bg-gray-200'}`}
                >
                  {time}
                </button>
              ))}
            </div>
          ) : (
            <p className="text-center text-red-500 font-medium mb-2">Doctor is not available on this day.</p>
          )}

          <div className="flex justify-center">
            <button 
              className="w-full mb-5 sm:w-auto px-6 sm:px-3 py-3 sm:py-4 bg-blue-600 text-white font-medium rounded-xl shadow-lg hover:bg-blue-700 transition-all duration-300 cursor-pointer"
              onClick={() => setIsModalOpen(true)}
            >
              Book Appointment
            </button>
          </div>
        </div>
      </div>

      <div className="mt-12">
        <RelatedDoctors doctorId={doctorId} specialty={docInfo.specialty} hospitalId={hospitalId} />
      </div>
    </div>
  );
};

export default Appointment;















