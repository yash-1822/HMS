import React, { useContext, useEffect,useState } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import { AppContext } from '../../context/AppContext'
import { assets } from '../../assets/assets'
import axios from "axios";
import {toast} from 'react-toastify'

const DoctorAppointment = () => {

    const {dToken,doctorData,backendUrl} = useContext(DoctorContext)

    

    const [appointments, setAppointments] = useState([]);

    console.log("data from appointments is:",doctorData);

    // const {calculateAge} = useContext(AppContext)


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
  

  console.log("appointments are",appointments);

    // const appointments = [
    //     {
    //       _id: "1",
    //       userId: "user123",
    //       docId: "doc001",
    //       slotDate: "2025-04-12",
    //       slotTime: "10:00 AM",
    //       userData: {
    //         name: "Alice Johnson",
    //         image: "https://randomuser.me/api/portraits/women/44.jpg",
    //         age: 29,
    //         gender: "Female",
    //       },
    //       docData: {
    //         name: "Dr. James Smith",
    //         specialization: "Cardiologist"
    //       },
    //       amount: 300,
    //       date: 1712812800000,
    //       cancelled: false,
    //       payment: true,
    //       isCompleted: false,
    //     },
    //     {
    //       _id: "2",
    //       userId: "user456",
    //       docId: "doc001",
    //       slotDate: "2025-04-11",
    //       slotTime: "2:00 PM",
    //       userData: {
    //         name: "Bob Thompson",
    //         image: "https://randomuser.me/api/portraits/men/34.jpg",
    //         age: 41,
    //         gender: "Male",
    //       },
    //       docData: {
    //         name: "Dr. James Smith",
    //         specialization: "Cardiologist"
    //       },
    //       amount: 300,
    //       date: 1712726400000,
    //       cancelled: true,
    //       payment: false,
    //       isCompleted: false,
    //     },
    //     {
    //       _id: "3",
    //       userId: "user789",
    //       docId: "doc001",
    //       slotDate: "2025-04-10",
    //       slotTime: "11:30 AM",
    //       userData: {
    //         name: "Carol Lee",
    //         image: "https://randomuser.me/api/portraits/women/65.jpg",
    //         age: 35,
    //         gender: "Female",
    //       },
    //       docData: {
    //         name: "Dr. James Smith",
    //         specialization: "Cardiologist"
    //       },
    //       amount: 300,
    //       date: 1712640000000,
    //       cancelled: false,
    //       payment: true,
    //       isCompleted: true,
    //     }
    //   ];


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


      useEffect(() => {
        if (dToken && doctorData?.email) {
          getAppointments();
        }
      }, [dToken, doctorData]);
      
     
    


    return (
        <div className='w-full max-w-6xl m-5 '>
            <p className='mb-3 text-lg font-medium '>All Appointments</p>
            <div className='bg-white border rounded text-sm max-h-[80vh] min-h-[50vh] overflow-y-scroll border-gray-300'>
                {/* Table Header */}
                <div className='max-sm:hidden grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_2fr_1fr_1fr] gap-1 py-3 px-6 border border-b border-gray-300'> 
                    <p>#</p>
                    <p>Patient</p>
                    <p>Payment</p>
                    <p>Age</p>
                    <p>Date & Time</p>
                    <p>Phone Number</p>
                    <p>Fees</p>
                    <p>Action</p>
                </div>

                {/* Table Rows */}
                {
                    appointments.reverse().map((item, index) => (
                        <div 
                            key={index} 
                            className='flex flex-wrap justify-between max-sm:gap-5 max-sm:text-base sm:grid grid-cols-[0.5fr_2fr_1fr_1fr_2fr_2fr_1fr_1fr] gap-1 items-center text-gray-500 py-3 px-6 border-b hover:bg-gray-50 border-gray-200'
                        >
                            <p className='max-sm:hidden'>{index+1}</p>
                            <div className='flex items-center gap-2'>
                                {/* <img className='w-8 rounded-full' src={item.userData.image} alt="" />  */}
                                <p>{item.name}</p>
                            </div>
                            <div>
                                <p className='text-xs inline border border-gray-400 px-2 rounded-full'>{item.payment ? 'Online' : 'CASH'}</p>
                            </div>
                            {/* <p>{calculateAge(item.userData.dob)}</p> */}
                            <p className='max-sm:hidden'>{item.age}</p>
                            <p>{item.slotDate}, {item.slotTime}</p>
                            <p>{item.phone}</p> {/* New Phone Number Section */}
                            <p>{'$'}{item.amount}</p>
                            
                            {
                                item.cancelled
                                ? <p className='text-red-400 text-xs font-medium'>Cancelled</p>
                                : item.isCompleted 
                                    ? <p className='text-green-500 text-xs font-medium'>Completed</p>
                                    : 
                                    <div className='flex'>
                                        <img onClick={()=>cancelAppointment(item._id)} className='w-10 cursor-pointer' src={assets.cancel_icon} alt="" />
                                        <img onClick={()=>completeAppointment(item._id)} className='w-10 cursor-pointer' src={assets.tick_icon} alt="" />
                                    </div>
                            }
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default DoctorAppointment
