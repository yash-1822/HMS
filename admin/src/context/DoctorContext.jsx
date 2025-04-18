import axios from "axios";
import { createContext, useState } from "react";
import {toast} from 'react-toastify'
export const DoctorContext = createContext();

const DoctorContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Fix destructuring
    const [dToken, setDToken] = useState(localStorage.getItem('dToken') ? localStorage.getItem('dToken') : '');
    const [appointments, setAppointments] = useState([])
    const [doctorData, setDoctorData] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    console.log("doctorData is:",doctorData);

    const getAppointments = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/appointments', {headers:{Authorization: `Bearer ${dToken}`}})
            if (data.success) {
                setAppointments(data.appointments)
                console.log(data.appointments);
                
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

            const {data} = await axios.post(backendUrl + '/api/doctor/complete-appointment', {appointmentId}, { headers: { Authorization: `Bearer ${dToken}` } } )

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

    // cancel the appointment
    const cancelAppointment = async (appointmentId) => {
        try {

            const {data} = await axios.post(backendUrl + '/api/doctor/cancel-appointment', {appointmentId}, {headers:{Authorization: `Bearer ${dToken}`}})

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

    const getDashData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/dashboard', {headers:{Authorization: `Bearer ${dToken}`}})

            if (data.success) {
                setDashData(data.dashData)
                console.log(data.dashData);
                
            }
            else {
                toast.error(data.message)
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const getProfileData = async () => {
        try {

            const {data} = await axios.get(backendUrl + '/api/doctor/profile',{headers:{Authorization: `Bearer ${dToken}`}})
            if (data.success) {
                setProfileData(data.profileData)
                console.log(data.profileData);
                
            }
            
        } catch (error) {
            console.log(error);
            toast.error(error.message)
            
        }
    }

    const value = {
        dToken, setDToken,
        backendUrl,  // ✅ Ensure backendUrl is included
        appointments,setAppointments,
        getAppointments,
        completeAppointment,
        cancelAppointment,
        doctorData, setDoctorData,
        getDashData,
        setDashData,
        profileData,setProfileData,
        getProfileData,
    };

    return (
        <DoctorContext.Provider value={value}>
            {props.children}
        </DoctorContext.Provider>
    );
};

export default DoctorContextProvider;


// import axios from "axios";
// import { createContext, useState } from "react";
// import { toast } from "react-toastify";

// export const DoctorContext = createContext();

// const DoctorContextProvider = (props) => {
//     const backendUrl = import.meta.env.VITE_BACKEND_URL;
//     const [dToken, setDToken] = useState(localStorage.getItem("dToken") || "");
//     const [appointments, setAppointments] = useState([]);

//     // ✅ Function to get appointments with correct headers
//     const getAppointments = async () => {
//         try {
//             if (!dToken) {
//                 toast.error("Not authorized. Please log in again.");
//                 return;
//             }

//             const { data } = await axios.get(`${backendUrl}/api/doctor/appointments`, {
//                 headers: { Authorization: `Bearer ${dToken}` },
//             });

//             if (data.success) {
//                 setAppointments(data.appointments.reverse());
//             } else {
//                 toast.error(data.message);
//             }
//         } catch (error) {
//             console.log(error);
//             toast.error("Failed to fetch appointments. Please try again.");
//         }
//     };

//     // ✅ Logout function to clear everything
//     const logout = () => {
//         localStorage.removeItem("dToken");
//         setDToken("");
//         setAppointments([]); // Clear state
//     };

//     const value = {
//         dToken,
//         setDToken,
//         backendUrl,
//         appointments,
//         setAppointments,
//         getAppointments,
//         logout,
//     };

//     return <DoctorContext.Provider value={value}>{props.children}</DoctorContext.Provider>;
// };

// export default DoctorContextProvider;
