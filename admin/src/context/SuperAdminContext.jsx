import axios from "axios";
import { createContext, useState,useEffect } from "react";
import {toast} from 'react-toastify'

export const SuperAdminContext = createContext();

const SuperAdminContextProvider = (props) => {
    const backendUrl = import.meta.env.VITE_BACKEND_URL;
    const [hospitals, setHospitals] = useState([]);

    // ✅ Fix destructuring
    const [sToken, setSToken] = useState(localStorage.getItem('sToken') || '');
    const [appointments, setAppointments] = useState([])
    const [dashData, setDashData] = useState(false)
    const [profileData, setProfileData] = useState(false)


    const fetchHospitals = async () => {
        try {
          const { data } = await axios.get(`${backendUrl}/superadmin/getAllHospitals`);
          if (data.success) {
            setHospitals(data.hospitals || []);
          } else {
            toast.error(data.message);
          }
        } catch (error) {
          console.error(error);
          toast.error('Failed to fetch hospital data');
        }
    };


    useEffect(() => {
        fetchHospitals();
      }, []);

    
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
        sToken, 
        setSToken,
        backendUrl,
        dashData, setDashData,hospitals,setHospitals,
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
