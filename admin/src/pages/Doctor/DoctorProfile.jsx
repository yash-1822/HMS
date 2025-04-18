// import React, { useContext, useEffect, useState } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import { AppContext } from '../../context/AppContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const DoctorProfile = () => {

//   const {dToken, profileData, setProfileData, getProfileData,doctorData} = useContext(DoctorContext)
//   const backendUrl = import.meta.env.VITE_BACKEND_URL;
//   const [isEdit, setIsEdit] = useState(false)

//   console.log("doctorData from appointment is:",doctorData);

//   const updateProfile = async () => {

//     try {

//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available
//       }

//       const {data} = await axios.post(backendUrl + '/api/doctor/update-profile',updateData, {headers:{Authorization: `Bearer ${dToken}`}})
//       if (data.success) {
//         toast.success(data.message)
//         setIsEdit(false)
//         getProfileData()
//       } 
//       else {
//         toast.error(data.message)
//       }
      
//     } catch (error) {
//       toast.error(error.message)
//       console.log(error);
      
//     }

//   }
//   useEffect(()=> {
//     // getProfileData()
//   },[dToken])

//   return(
//     <div className='flex'>
//       <div className='flex flex-col gap-4 m-5'>
//         <img className='bg-green-400/80 w-full  sm:max-w-64 rounded-lg' src={doctorData.doctor_image} alt="" />
//       </div>

//       <div className='flex-1 border border-stone-100 rounded-lg p-8 py-7 bg-white'>
//         {/* -----Doc Info : name, degree, experience ----- */}
//         <p className='flex items-center gap-2 text-3xl font-medium text-gray-700'>{doctorData.name}</p>
//         <div className='flex items-center gap-2 mt-1 text-gray-600'>
//           <p>{doctorData.qualification} - {doctorData.speciality}</p>
//           <button className='py-0.5 px-2 border text-xs rounded-full'>{doctorData.experience}</button>
//         </div>

//         {/* ----Doc About ---- */}
//         <div>
//           <p className='flex items-center gap-1 text-sm font-medium text-neutral-800 mt-3'>About:</p>
//           <p className='text-sm text-gray-600 max-w-[700px] mt-1'>
//             {doctorData.about}
//           </p>
//         </div>

//         <p className='text-gray-600 font-medium mt-4'>
//           Appointment fee: <span className='text-gray-800'>{'$'} {isEdit ? <input type="number" onChange={(e)=>setProfileData(prev => ({...prev, fees: e.target.value}))} value={doctorData.consultancyFees} /> : doctorData.consultancyFees}</span>
//         </p>
//         <div className='flex gap-2 py-2'>
//           <p>Address: </p>
//           <p className='text-sm'>
//            {doctorData.location}
//             </p>
          
//         </div>

//         <div className='flex gap-1 pt-2'>
//           <input onChange={()=> isEdit && setProfileData(prev => ({...prev, available: !prev.available}))} checked={profileData.available} type="checkbox" />
//           <label htmlFor="">Available</label>
//         </div>

//         {
//           isEdit
//           ? <button onClick={updateProfile} className='px-4 py-1 border border-green-400 text-sm  rounded-full mt-5 hover:bg-green-400 cursor-pointer'>save</button>
//           : <button onClick={()=>setIsEdit(true)} className='px-4 py-1 border border-green-400 text-sm  rounded-full mt-5 hover:bg-green-400 cursor-pointer'>Edit</button>
//         }
//       </div>
      
//     </div>
//   )
// }

// export default DoctorProfile






// import React, { useContext, useState } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const DoctorProfile = () => {
//   const { dToken, profileData, setProfileData, getProfileData, doctorData } = useContext(DoctorContext)
//   const backendUrl = import.meta.env.VITE_BACKEND_URL
//   const [isEdit, setIsEdit] = useState(false)
//   const [selectedDay, setSelectedDay] = useState('')
//   const [showDayOptions, setShowDayOptions] = useState('')
// const [tapTimeout, setTapTimeout] = useState(null)
// const [dayAvailability, setDayAvailability] = useState(() => {
//   const availabilityMap = {}
//   doctorData.availability.forEach(d => availabilityMap[d.day] = d.available)
//   return availabilityMap
// })


//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available
//       }

//       const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
//         headers: { Authorization: `Bearer ${dToken}` }
//       })

//       if (data.success) {
//         toast.success(data.message)
//         setIsEdit(false)
//         getProfileData()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//       console.log(error)
//     }
//   }

//   return (
//     <div className="w-full h-full bg-white p-8 flex flex-col lg:flex-row gap-10">
      
//       {/* Doctor Image - Wider and spaced */}
//       <div className="w-full lg:w-[400px] flex justify-center items-start">
//         <img
//           className="rounded-xl w-full h-[480px] object-cover"
//           src={doctorData.doctor_image}
//           alt={doctorData.name}
//         />
//       </div>

//       {/* Doctor Details */}
//       <div className="flex-1 space-y-1">
//         <p className="text-3xl font-semibold text-gray-800">{doctorData.name}</p>
//         <p className="text-gray-600">{doctorData.qualification} - {doctorData.specialty}</p>
//         <p className="text-sm text-gray-500">Experience: {doctorData.experience} years</p>

//         {/* Contact and Other Info */}
//         <div className="text-sm text-gray-700 space-y-2 pt-2">
//           {/* Contact + Email */}
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Contact:</strong> {doctorData.contact}</p>
//             <p><strong>Email:</strong> {doctorData.email}</p>
//           </div>

//           {/* Number of Operations + Consultancy Fee */}
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Number of Operations:</strong> {doctorData.noOfOps}</p>
//             <p><strong>Consultancy Fee:</strong> ₹{doctorData.consultancyFees}</p>
//           </div>

//           {/* Gender + Location */}
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Gender:</strong> {doctorData.gender}</p>
//             <p><strong>Location:</strong> {doctorData.location}</p>
//           </div>
//         </div>

       

//         {/* About Section */}
//         <div className="pt-2">
//           <p className="text-sm font-medium text-gray-800">About:</p>
//           <p className="text-sm text-gray-600">{doctorData.about}</p>
//         </div>

//         {/* Availability Days */}
//         <div className="pt-3">
//           <p className="text-lg font-semibold text-gray-800 mb-2">Availability</p>
//           <div className="flex flex-wrap gap-3">
//             {/* {doctorData.availability.map(day => (
//               <button
//                 key={day.day}
//                 onClick={() => setSelectedDay(prev => prev === day.day ? '' : day.day)}
//                 disabled={!day.available}
//                 className={`px-4 py-1 rounded-full text-sm border transition-all duration-200 ${
//                   day.available
//                     ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                     : 'bg-red-100 text-red-700 cursor-not-allowed'
//                 }`}
//               >
//                 {day.day}
//               </button>
//             ))} */}
//             {doctorData.availability.map(day => (
//   <button
//     key={day.day}
//     onClick={(e) => {
//       e.preventDefault()
//       // Delay to detect single vs double click
//       if (e.detail === 1) {
//         setTimeout(() => {
//           if (e.detail === 1) {
//             setSelectedDay(prev => prev === day.day ? '' : day.day)
//           }
//         }, 200)
//       }
//     }}
//     onDoubleClick={(e) => {
//       e.preventDefault()
//       const updatedAvailability = doctorData.availability.map(d =>
//         d.day === day.day ? { ...d, available: !d.available } : d
//       )
//       setProfileData(prev => ({ ...prev, available: updatedAvailability }))
//     }}
//     className={`px-4 py-1 rounded-full text-sm border transition-all duration-200 ${
//       day.available
//         ? 'bg-green-100 text-green-800 hover:bg-green-200'
//         : 'bg-red-100 text-red-700 cursor-not-allowed'
//     }`}
//     disabled={false} // Let all days be clickable for double tap toggle
//   >
//     {day.day}
//   </button>
// ))}

//           </div>

//           {/* Show Slots if Selected */}
//           {selectedDay && (
//             <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-w-md">
//               <p className="font-medium text-gray-700 mb-2">{selectedDay} Slots:</p>
//               <div className="flex flex-wrap gap-2">
//                 {doctorData.availability.find(day => day.day === selectedDay)?.slots.length > 0 ? (
//                   doctorData.availability
//                     .find(day => day.day === selectedDay)
//                     .slots.map((slot, index) => (
//                       <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
//                         {slot}
//                       </span>
//                     ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No slots available.</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>

        
//       </div>
//     </div>
//   )
// }

// export default DoctorProfile



// import React, { useContext, useState } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const DoctorProfile = () => {
//   const { dToken, profileData, setProfileData, getProfileData, doctorData } = useContext(DoctorContext)
//   const backendUrl = import.meta.env.VITE_BACKEND_URL
//   const [isEdit, setIsEdit] = useState(false)
//   const [selectedDay, setSelectedDay] = useState('')
//   const [showDayOptions, setShowDayOptions] = useState('')
//   const [tapTimeout, setTapTimeout] = useState(null)

//   // local availability state to reflect visual change
//   const [dayAvailability, setDayAvailability] = useState(() => {
//     const map = {}
//     doctorData?.availability.forEach(d => {
//       map[d.day] = d.available
//     })
//     return map
//   })


//   // New helper function
// const updateDayAvailability = async (day, available,doctorId) => {
//   try {
//     const { data } = await axios.post(
//       backendUrl + '/adminDoctor/update-day-availability',
//       {doctorId: doctorId,
//         day: day,
//         available: available},
//     )
//     if (data.success) {
//       toast.success(data.message)
//       getProfileData() // refresh profile data from DB
//     } else {
//       toast.error(data.message)
//     }
//   } catch (error) {
//     console.error(error)
//     toast.error('Failed to update availability')
//   }
// }


//   const updateProfile = async () => {
//     try {
//       const updateData = {
//         address: profileData.address,
//         fees: profileData.fees,
//         available: profileData.available
//       }

//       const { data } = await axios.post(backendUrl + '/api/doctor/update-profile', updateData, {
//         headers: { Authorization: `Bearer ${dToken}` }
//       })

//       if (data.success) {
//         toast.success(data.message)
//         setIsEdit(false)
//         getProfileData()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       toast.error(error.message)
//       console.log(error)
//     }
//   }

//   return (
//     <div className="w-full h-full bg-white p-8 flex flex-col lg:flex-row gap-10">
//       {/* Doctor Image */}
//       <div className="w-full lg:w-[400px] flex justify-center items-start">
//         <img
//           className="rounded-xl w-full h-[480px] object-cover"
//           src={doctorData.doctor_image}
//           alt={doctorData.name}
//         />
//       </div>

//       {/* Doctor Details */}
//       <div className="flex-1 space-y-1">
//         <p className="text-3xl font-semibold text-gray-800">{doctorData.name}</p>
//         <p className="text-gray-600">{doctorData.qualification} - {doctorData.specialty}</p>
//         <p className="text-sm text-gray-500">Experience: {doctorData.experience} years</p>

//         {/* Contact Info */}
//         <div className="text-sm text-gray-700 space-y-2 pt-2">
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Contact:</strong> {doctorData.contact}</p>
//             <p><strong>Email:</strong> {doctorData.email}</p>
//           </div>
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Number of Operations:</strong> {doctorData.noOfOps}</p>
//             <p><strong>Consultancy Fee:</strong> ₹{doctorData.consultancyFees}</p>
//           </div>
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Gender:</strong> {doctorData.gender}</p>
//             <p><strong>Location:</strong> {doctorData.location}</p>
//           </div>
//         </div>

//         {/* About Section */}
//         <div className="pt-2">
//           <p className="text-sm font-medium text-gray-800">About:</p>
//           <p className="text-sm text-gray-600">{doctorData.about}</p>
//         </div>

//         {/* Availability Days */}
//         <div className="pt-3">
//           <p className="text-lg font-semibold text-gray-800 mb-2">Availability</p>
//           <div className="flex flex-wrap gap-3">
//             {doctorData.availability.map(day => (
//               <button
//                 key={day.day}
//                 onClick={() => {
//                   if (tapTimeout) {
//                     clearTimeout(tapTimeout)
//                     setTapTimeout(null)
//                     setShowDayOptions(day.day) // show Available/Unavailable
//                   } else {
//                     const timeout = setTimeout(() => {
//                       if (dayAvailability[day.day]) {
//                         setSelectedDay(prev => prev === day.day ? '' : day.day)
//                       }
//                       setTapTimeout(null)
//                     }, 250)
//                     setTapTimeout(timeout)
//                   }
//                 }}
//                 // disabled={!dayAvailability[day.day]}
//                 className={`relative px-4 py-1 rounded-full text-sm border transition-all duration-200 ${
//                   dayAvailability[day.day]
//                     ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                     : 'bg-red-100 text-red-700 cursor-not-allowed'
//                 }`}
//               >
//                 {day.day}
//                 {showDayOptions === day.day && (
//                   <div className="absolute top-10 left-0 bg-white border shadow-lg z-10 rounded-md text-xs">
//                     <button
//                       className="block px-4 py-1 hover:bg-green-100 w-full text-left"
//                       onClick={() => {
//                         setDayAvailability(prev => ({ ...prev, [day.day]: true }))
//                         setShowDayOptions('')
//                         updateDayAvailability(day.day,!day.available,doctorData._id)
//                       }}
//                     >
//                       Available
//                     </button>
//                     <button
//                       className="block px-4 py-1 hover:bg-red-100 w-full text-left"
//                       onClick={() => {
//                         setDayAvailability(prev => ({ ...prev, [day.day]: false }))
//                         if (selectedDay === day.day) setSelectedDay('') // hide slot view
//                         setShowDayOptions('')
//                         updateDayAvailability(day.day,doctorData._id)
//                       }}
//                     >
//                       Unavailable
//                     </button>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>

//           {/* Show Slots if Selected */}
//           {selectedDay && dayAvailability[selectedDay] && (
//             <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-w-md">
//               <p className="font-medium text-gray-700 mb-2">{selectedDay} Slots:</p>
//               <div className="flex flex-wrap gap-2">
//                 {doctorData.availability.find(day => day.day === selectedDay)?.slots.length > 0 ? (
//                   doctorData.availability
//                     .find(day => day.day === selectedDay)
//                     .slots.map((slot, index) => (
//                       <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
//                         {slot}
//                       </span>
//                     ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No slots available.</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DoctorProfile





// import React, { useContext, useState, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const DoctorProfile = () => {
//   const { dToken, profileData, setProfileData, getProfileData, doctorData } = useContext(DoctorContext)
//   const backendUrl = import.meta.env.VITE_BACKEND_URL
//   const [isEdit, setIsEdit] = useState(false)
//   const [selectedDay, setSelectedDay] = useState('')
//   const [showDayOptions, setShowDayOptions] = useState('')
//   const [tapTimeout, setTapTimeout] = useState(null)

//   // Local state to manage availability display
//   const [dayAvailability, setDayAvailability] = useState(() => {
//     const map = {}
//     doctorData?.availability.forEach(d => {
//       map[d.day] = d.available
//     })
//     return map
//   })

//   // Close popup on outside click
//   useEffect(() => {
//     const handleClickOutside = () => setShowDayOptions('')
//     if (showDayOptions) {
//       document.addEventListener('click', handleClickOutside)
//       return () => document.removeEventListener('click', handleClickOutside)
//     }
//   }, [showDayOptions])

//   // Update availability in DB
//   const updateDayAvailability = async (day, available, doctorId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + '/adminDoctor/update-day-availability',
//         { doctorId, day, available }
//       )
//       if (data.success) {
//         toast.success(data.message)
//         getProfileData()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.error(error)
//       toast.error('Failed to update availability')
//     }
//   }

//   return (
//     <div className="w-full h-full bg-white p-8 flex flex-col lg:flex-row gap-10">
//       <div className="w-full lg:w-[400px] flex justify-center items-start">
//         <img
//           className="rounded-xl w-full h-[480px] object-cover"
//           src={doctorData.doctor_image}
//           alt={doctorData.name}
//         />
//       </div>

//       <div className="flex-1 space-y-1">
//         <p className="text-3xl font-semibold text-gray-800">{doctorData.name}</p>
//         <p className="text-gray-600">{doctorData.qualification} - {doctorData.specialty}</p>
//         <p className="text-sm text-gray-500">Experience: {doctorData.experience} years</p>

//         <div className="text-sm text-gray-700 space-y-2 pt-2">
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Contact:</strong> {doctorData.contact}</p>
//             <p><strong>Email:</strong> {doctorData.email}</p>
//           </div>
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Number of Operations:</strong> {doctorData.noOfOps}</p>
//             <p><strong>Consultancy Fee:</strong> ₹{doctorData.consultancyFees}</p>
//           </div>
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Gender:</strong> {doctorData.gender}</p>
//             <p><strong>Location:</strong> {doctorData.location}</p>
//           </div>
//         </div>

//         <div className="pt-3">
//           <p className="text-lg font-semibold text-gray-800 mb-2">Availability</p>
//           <div className="flex flex-wrap gap-3">
//             {doctorData.availability.map(day => (
//               <button
//                 key={day.day}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   if (tapTimeout) {
//                     clearTimeout(tapTimeout)
//                     setTapTimeout(null)
//                     setShowDayOptions(day.day)
//                   } else {
//                     const timeout = setTimeout(() => {
//                       setSelectedDay(prev => prev === day.day ? '' : day.day)
//                       setTapTimeout(null)
//                     }, 250)
//                     setTapTimeout(timeout)
//                   }
//                 }}
//                 className={`relative px-4 py-1 rounded-full text-sm border transition-all duration-200 ${
//                   dayAvailability[day.day]
//                     ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                     : 'bg-red-100 text-red-700'
//                 }`}
//               >
//                 {day.day}
//                 {showDayOptions === day.day && (
//                   <div className="absolute top-10 left-0 bg-white border shadow-lg z-10 rounded-md text-xs">
//                     <button
//                       className="block px-4 py-1 hover:bg-green-100 w-full text-left"
//                       onClick={() => {
//                         setDayAvailability(prev => ({ ...prev, [day.day]: true }))
//                         setShowDayOptions('')
//                         updateDayAvailability(day.day, true, doctorData._id)
//                       }}
//                     >
//                       Available
//                     </button>
//                     <button
//                       className="block px-4 py-1 hover:bg-red-100 w-full text-left"
//                       onClick={() => {
//                         setDayAvailability(prev => ({ ...prev, [day.day]: false }))
//                         setShowDayOptions('')
//                         setSelectedDay('')
//                         updateDayAvailability(day.day, false, doctorData._id)
//                       }}
//                     >
//                       Unavailable
//                     </button>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>

//           {selectedDay && dayAvailability[selectedDay] && (
//             <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-w-md">
//               <p className="font-medium text-gray-700 mb-2">{selectedDay} Slots:</p>
//               <div className="flex flex-wrap gap-2">
//                 {doctorData.availability.find(day => day.day === selectedDay)?.slots.length > 0 ? (
//                   doctorData.availability
//                     .find(day => day.day === selectedDay)
//                     .slots.map((slot, index) => (
//                       <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
//                         {slot}
//                       </span>
//                     ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No slots available.</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DoctorProfile





// import React, { useContext, useState, useEffect } from 'react'
// import { DoctorContext } from '../../context/DoctorContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'

// const DoctorProfile = () => {
//   const { dToken, profileData, setProfileData, getProfileData, doctorData } = useContext(DoctorContext)
//   const backendUrl = import.meta.env.VITE_BACKEND_URL
//   const [isEdit, setIsEdit] = useState(false)
//   const [selectedDay, setSelectedDay] = useState('')
//   const [showDayOptions, setShowDayOptions] = useState('')
//   const [tapTimeout, setTapTimeout] = useState(null)

//   // Generate next 7 days (including today)
//   const getNext7Days = () => {
//     const days = []
//     const options = { weekday: 'long', month: 'short', day: 'numeric' }
//     for (let i = 0; i < 7; i++) {
//       const date = new Date()
//       date.setDate(date.getDate() + i)
//       const dayName = date.toLocaleDateString('en-US', { weekday: 'long' })
//       const displayDate = date.toLocaleDateString('en-US', options)
//       days.push({ dayName, displayDate })
//     }
//     return days
//   }

//   const next7Days = getNext7Days()

//   // Local state to manage availability display
//   const [dayAvailability, setDayAvailability] = useState(() => {
//     const map = {}
//     doctorData?.availability?.forEach(d => {
//       map[d.day] = d.available
//     })
//     return map
//   })

//   // Close popup on outside click
//   useEffect(() => {
//     const handleClickOutside = () => setShowDayOptions('')
//     if (showDayOptions) {
//       document.addEventListener('click', handleClickOutside)
//       return () => document.removeEventListener('click', handleClickOutside)
//     }
//   }, [showDayOptions])

//   // Update availability in DB
//   const updateDayAvailability = async (day, available, doctorId) => {
//     try {
//       const { data } = await axios.post(
//         backendUrl + '/adminDoctor/update-day-availability',
//         { doctorId, day, available }
//       )
//       if (data.success) {
//         toast.success(data.message)
//         getProfileData()
//       } else {
//         toast.error(data.message)
//       }
//     } catch (error) {
//       console.error(error)
//       toast.error('Failed to update availability')
//     }
//   }

//   return (
//     <div className="w-full h-full bg-white p-8 flex flex-col lg:flex-row gap-10">
//       <div className="w-full lg:w-[400px] flex justify-center items-start">
//         <img
//           className="rounded-xl w-full h-[480px] object-cover"
//           src={doctorData.doctor_image}
//           alt={doctorData.name}
//         />
//       </div>

//       <div className="flex-1 space-y-1">
//         <p className="text-3xl font-semibold text-gray-800">{doctorData.name}</p>
//         <p className="text-gray-600">{doctorData.qualification} - {doctorData.specialty}</p>
//         <p className="text-sm text-gray-500">Experience: {doctorData.experience} years</p>

//         <div className="text-sm text-gray-700 space-y-2 pt-2">
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Contact:</strong> {doctorData.contact}</p>
//             <p><strong>Email:</strong> {doctorData.email}</p>
//           </div>
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Number of Operations:</strong> {doctorData.noOfOps}</p>
//             <p><strong>Consultancy Fee:</strong> ₹{doctorData.consultancyFees}</p>
//           </div>
//           <div className="flex flex-col md:flex-row gap-x-10">
//             <p><strong>Gender:</strong> {doctorData.gender}</p>
//             <p><strong>Location:</strong> {doctorData.location}</p>
//           </div>
//         </div>

//         <div className="pt-3">
//           <p className="text-lg font-semibold text-gray-800 mb-2">Availability</p>
//           <div className="flex flex-wrap gap-3">
//             {next7Days.map(({ dayName, displayDate }) => (
//               <button
//                 key={dayName}
//                 onClick={(e) => {
//                   e.stopPropagation()
//                   if (tapTimeout) {
//                     clearTimeout(tapTimeout)
//                     setTapTimeout(null)
//                     setShowDayOptions(dayName)
//                   } else {
//                     const timeout = setTimeout(() => {
//                       setSelectedDay(prev => prev === dayName ? '' : dayName)
//                       setTapTimeout(null)
//                     }, 250)
//                     setTapTimeout(timeout)
//                   }
//                 }}
//                 className={`relative px-4 py-2 rounded-lg text-sm border text-center transition-all duration-200 ${
//                   dayAvailability[dayName]
//                     ? 'bg-green-100 text-green-800 hover:bg-green-200'
//                     : 'bg-red-100 text-red-700'
//                 }`}
//               >
//                 <div className="font-medium">{dayName}</div>
//                 <div className="text-xs">{displayDate}</div>

//                 {showDayOptions === dayName && (
//                   <div className="absolute top-12 left-0 bg-white border shadow-lg z-10 rounded-md text-xs">
//                     <button
//                       className="block px-4 py-1 hover:bg-green-100 w-full text-left"
//                       onClick={() => {
//                         setDayAvailability(prev => ({ ...prev, [dayName]: true }))
//                         setShowDayOptions('')
//                         updateDayAvailability(dayName, true, doctorData._id)
//                       }}
//                     >
//                       Available
//                     </button>
//                     <button
//                       className="block px-4 py-1 hover:bg-red-100 w-full text-left"
//                       onClick={() => {
//                         setDayAvailability(prev => ({ ...prev, [dayName]: false }))
//                         setShowDayOptions('')
//                         setSelectedDay('')
//                         updateDayAvailability(dayName, false, doctorData._id)
//                       }}
//                     >
//                       Unavailable
//                     </button>
//                   </div>
//                 )}
//               </button>
//             ))}
//           </div>

//           {selectedDay && dayAvailability[selectedDay] && (
//             <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-w-md">
//               <p className="font-medium text-gray-700 mb-2">{selectedDay} Slots:</p>
//               <div className="flex flex-wrap gap-2">
//                 {doctorData.availability.find(day => day.day === selectedDay)?.slots.length > 0 ? (
//                   doctorData.availability
//                     .find(day => day.day === selectedDay)
//                     .slots.map((slot, index) => (
//                       <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
//                         {slot}
//                       </span>
//                     ))
//                 ) : (
//                   <p className="text-sm text-gray-500">No slots available.</p>
//                 )}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// export default DoctorProfile



import React, { useContext, useState, useEffect } from 'react'
import { DoctorContext } from '../../context/DoctorContext'
import axios from 'axios'
import { toast } from 'react-toastify'

const DoctorProfile = () => {
  const { dToken, profileData, setProfileData, getProfileData,doctorData} = useContext(DoctorContext)
  const backendUrl = import.meta.env.VITE_BACKEND_URL
  // const [doctorData,setDoctorData] = useState({})
  const [isEdit, setIsEdit] = useState(false)
  const [selectedDay, setSelectedDay] = useState('')
  const [showDayOptions, setShowDayOptions] = useState('')
  const [tapTimeout, setTapTimeout] = useState(null)

  const [dayAvailability, setDayAvailability] = useState(() => {
    const map = {}
    doctorData?.availability.forEach(d => {
      map[d.day] = d.available
    })
    return map
  })

  // Close popup on outside click
  useEffect(() => {
    const handleClickOutside = () => setShowDayOptions('')
    if (showDayOptions) {
      document.addEventListener('click', handleClickOutside)
      return () => document.removeEventListener('click', handleClickOutside)
    }
  }, [showDayOptions])

  // useEffect(() => {
  //   verifyUser()
  // },[])

  console.log("sdsds",doctorData)


  const verifyUser = async () => {
    try {
      const { data } = await axios.get(`${backendUrl}/adminDoctor/verifyUser`, {
        headers,
      });
  
      if (data.success) {
          setDoctorData(data.user);
      }
    } catch (error) {
      console.error("User verification failed:", error.message);
      toast.error("Failed to fetch user data");
    }
  };

  // API call to update availability
  const updateDayAvailability = async (day, available, doctorId) => {
    try {
      const { data } = await axios.post(
        backendUrl + '/adminDoctor/update-day-availability',
        { doctorId, day, available }
      )
      if (data.success) {
        toast.success(data.message)
        getProfileData()
      } else {
        toast.error(data.message)
      }
    } catch (error) {
      console.error(error)
      toast.error('Failed to update availability')
    }
  }

  // Get next 7 working days (exclude Sundays)
  const getNext7WorkingDays = () => {
    const days = []
    const today = new Date()

    while (days.length < 7) {
      const dayOfWeek = today.getDay()
      if (dayOfWeek !== 0) {
        const formattedDay = today.toLocaleDateString('en-US', { weekday: 'long' })
        const formattedDate = today.toLocaleDateString('en-GB', { day: '2-digit', month: 'short' })
        days.push({ day: formattedDay, date: formattedDate })
      }
      today.setDate(today.getDate() + 1)
    }

    return days
  }

  const workingDays = getNext7WorkingDays()

  return (
    <div className="w-full h-full bg-white p-8 flex flex-col lg:flex-row gap-10">
      <div className="w-full lg:w-[400px] flex justify-center items-start">
        <img
          className="rounded-xl w-full h-[480px] object-cover"
          src={doctorData.doctor_image}
          alt={doctorData.name}
        />
      </div>

      <div className="flex-1 space-y-1">
        <p className="text-3xl font-semibold text-gray-800">{doctorData.name}</p>
        <p className="text-gray-600">{doctorData.qualification} - {doctorData.specialty}</p>
        <p className="text-sm text-gray-500">Experience: {doctorData.experience} years</p>

        <div className="text-sm text-gray-700 space-y-2 pt-2">
          <div className="flex flex-col md:flex-row gap-x-10">
            <p><strong>Contact:</strong> {doctorData.contact}</p>
            <p><strong>Email:</strong> {doctorData.email}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-x-10">
            <p><strong>Number of Operations:</strong> {doctorData.noOfOps}</p>
            <p><strong>Consultancy Fee:</strong> ₹{doctorData.consultancyFees}</p>
          </div>
          <div className="flex flex-col md:flex-row gap-x-10">
            <p><strong>Gender:</strong> {doctorData.gender}</p>
            <p><strong>Location:</strong> {doctorData.location}</p>
          </div>
        </div>

        <div className="pt-3">
          <p className="text-lg font-semibold text-gray-800 mb-2">Availability</p>
          <div className="flex flex-wrap gap-3">
            {workingDays.map(({ day, date }) => {
              const dayData = doctorData.availability.find(d => d.day === day)
              if (!dayData) return null

              return (
                <button
                  key={day}
                  onClick={(e) => {
                    e.stopPropagation()
                    if (tapTimeout) {
                      clearTimeout(tapTimeout)
                      setTapTimeout(null)
                      setShowDayOptions(day)
                    } else {
                      const timeout = setTimeout(() => {
                        setSelectedDay(prev => prev === day ? '' : day)
                        setTapTimeout(null)
                      }, 250)
                      setTapTimeout(timeout)
                    }
                  }}
                  className={`relative px-4 py-1 rounded-full text-sm border transition-all duration-200 ${
                    dayAvailability[day]
                      ? 'bg-green-100 text-green-800 hover:bg-green-200'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {day} - {date}
                  {showDayOptions === day && (
                    <div className="absolute top-10 left-0 bg-white border shadow-lg z-10 rounded-md text-xs">
                      <button
                        className="block px-4 py-1 hover:bg-green-100 w-full text-left"
                        onClick={() => {
                          setDayAvailability(prev => ({ ...prev, [day]: true }))
                          setShowDayOptions('')
                          updateDayAvailability(day, true, doctorData._id)
                        }}
                      >
                        Available
                      </button>
                      <button
                        className="block px-4 py-1 hover:bg-red-100 w-full text-left"
                        onClick={() => {
                          setDayAvailability(prev => ({ ...prev, [day]: false }))
                          setShowDayOptions('')
                          setSelectedDay('')
                          updateDayAvailability(day, false, doctorData._id)
                        }}
                      >
                        Unavailable
                      </button>
                    </div>
                  )}
                </button>
              )
            })}
          </div>

          {selectedDay && dayAvailability[selectedDay] && (
            <div className="mt-4 p-4 border rounded-lg bg-gray-50 max-w-md">
              <p className="font-medium text-gray-700 mb-2">{selectedDay} Slots:</p>
              <div className="flex flex-wrap gap-2">
                {doctorData.availability.find(day => day.day === selectedDay)?.slots.length > 0 ? (
                  doctorData.availability
                    .find(day => day.day === selectedDay)
                    .slots.map((slot, index) => (
                      <span key={index} className="px-3 py-1 text-xs rounded-full bg-blue-100 text-blue-700">
                        {slot}
                      </span>
                    ))
                ) : (
                  <p className="text-sm text-gray-500">No slots available.</p>
                )}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default DoctorProfile
