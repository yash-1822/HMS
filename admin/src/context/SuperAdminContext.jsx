import axios from "axios";
import { createContext, useState } from "react";
import {toast} from 'react-toastify'

export const SuperAdminContext = createContext();

const SuperAdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;

    // ✅ Fix destructuring
    const [sToken, setSToken] = useState(localStorage.getItem('sToken') || '');
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)

    console.log("stoken is:",sToken);

    
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
        sToken, setSToken,
        backendUrl,  // ✅ Ensure backendUrl is included
        dashData, setDashData,
        getDashData,
        profileData,setProfileData,
        getProfileData,
    };

    return (
        <SuperAdminContext.Provider value={value}>
            {props.children}
        </SuperAdminContext.Provider>
    );
};

export default SuperAdminContextProvider;
