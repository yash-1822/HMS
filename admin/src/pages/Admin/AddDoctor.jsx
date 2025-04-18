// import React, { useContext, useState } from "react";
// import { assets } from "../../assets/assets";
// import { AdminContext } from "../../context/AdminContext";
// import { toast } from "react-toastify";
// import axios from "axios";

// const AddDoctor = () => {

//   const [docImg,setDocImg] = useState(null)
//   const [name,setName] = useState('')
//   const [email,setEmail] = useState('')
//   const [password,setPassword] = useState('')
//   const [experience,setExperience] = useState('1 Year')
//   const [fees,setFees] = useState('')
//   const [about,setAbout] = useState('')
//   const [speciality,setSpeciality] = useState('General physician')
//   const [degree,setDegree] = useState('')
//   const [address1,setAddress1] = useState('')
//   const [address2,setAddress2] = useState('')
//   const [gender, setGender] = useState("Male");
// const [contact, setContact] = useState("");
// const [bodyPart, setBodyPart] = useState("");

//   const {backendUrl,aToken} = useContext(AdminContext)

//   const onSubmitHandler = async (event) => {
//     event.preventDefault()

//     try {
//       if(!docImg){
//         return toast.error("Image not selected")
//       }

//       const formData = new FormData()

//       formData.append('image',docImg)
//       formData.append('name',name)
//       formData.append('email',email)
//       formData.append('password',password)
//       formData.append('experience',experience)
//       formData.append('fees',Number(fees))
//       formData.append('about',about)
//       formData.append('speciality',speciality)
//       formData.append('degree',degree)
//       formData.append("gender", gender);
// formData.append("contact", contact);
// formData.append("bodyPart", bodyPart);
//       formData.append('address',JSON.stringify({line1:address1,line2:address2}))

//       // console lo formData

//       formData.forEach((value,key)=> {
//         console.log(`${key} : ${value}`);
        
//       })

//       const { data } = await axios.post(backendUrl + '/api/admin/add-doctor',formData, { headers:{ aToken }})

//       if(data.success) {
//         toast.success(data.message)
//         setDocImg(false)
//         setName('')
//         setPassword('')
//         setEmail('')
//         setAddress1('')
//         // setAddress2('')
//         setDegree('')
//         setAbout('')
//         setFees('')
//       }

//       else {
//         toast.error(data.message)
//       }

//     }

//     catch(error) {
//       toast.error(data.message)
//       console.log(error);
      
//     }
//   }

//   return (
//     <form onSubmit={onSubmitHandler} className="m-5 w-full">
//       <p className="mb-3 text-lg font-medium">Add Doctor</p>
//       <div className="bg-white px-8 py-8 border border-gray-100 rounded w-full  max-h-[80vh] overflow-y-scroll"> 
//         <div className="flex items-center gap-4 mb-8 text-gray-500">
//           <label htmlFor="doc-img">
//             <img className="w-16 bg-gray-100 rounded-full cursor-pointer" src={docImg ? URL.createObjectURL(docImg) : assets.upload_area} alt="" />
//           </label>
//           <input onChange={(e) => setDocImg(e.target.files[0]) } type="file" id="doc-img" hidden />
//           <p>
//             Upload doctor <br /> picture
//           </p>
//         </div>

//         <div className="flex flex-col lg:flex-row items-start gap-10 text-gray-600">
//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor name</p>
//               <input onChange={(e) => setName(e.target.value)} value={name} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Name" required />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor email</p>
//               <input onChange={(e) => setEmail(e.target.value)} value={email} className="border border-gray-300 rounded px-3 py-2" type="email" placeholder="Email" required />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor password</p>
//               <input onChange={(e) => setPassword(e.target.value)} value={password} className="border border-gray-300 rounded px-3 py-2" type="password" placeholder="password" required />
//             </div>

//             {/* Gender */}
// <div className="flex-1 flex flex-col gap-1">
//   <p>Gender</p>
//   <select onChange={(e) => setGender(e.target.value)} value={gender} className="border border-gray-300 rounded px-3 py-2">
//     <option value="Male">Male</option>
//     <option value="Female">Female</option>
//     <option value="Other">Other</option>
//   </select>
// </div>

// {/* Contact */}
// <div className="flex-1 flex flex-col gap-1">
//   <p>Contact</p>
//   <input onChange={(e) => setContact(e.target.value)} value={contact} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="Phone Number" required />
// </div>

// {/* Body Part */}
// <div className="flex-1 flex flex-col gap-1">
//   <p>Body Part Specialty</p>
//   <input onChange={(e) => setBodyPart(e.target.value)} value={bodyPart} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="e.g. Heart, Skin" required />
// </div>


//             <div className="flex-1 flex flex-col gap-1">
//               <p>Doctor experience</p>
//               <select onChange={(e) => setExperience(e.target.value)} value={experience} className="border border-gray-300 rounded px-3 py-2" name="" id="">
//                 <option value="1 Year">1 Year</option>
//                 <option value="2 Year">2 Year</option>
//                 <option value="3 Year">3 Year</option>
//                 <option value="4 Year">4 Year</option>
//                 <option value="5 Year">5 Year</option>
//                 <option value="6 Year">6 Year</option>
//                 <option value="7 Year">7 Year</option>
//                 <option value="8 Year">8 Year</option>
//                 <option value="9 Year">9 Year</option>
//                 <option value="10 Year">10 Year</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Fees</p>
//               <input onChange={(e) => setFees(e.target.value)} value={fees} className="border  border-gray-300 rounded px-3 py-2" type="number" placeholder="fees" required />
//             </div>
//           </div>

//           <div className="w-full lg:flex-1 flex flex-col gap-4">
//             <div className="flex-1 flex flex-col gap-1">
//               <p>Speciality</p>
//               <select onChange={(e) => setSpeciality(e.target.value)} value={speciality} className="border border-gray-300 rounded px-3 py-2" name="" id="">
//                 <option value="General physician">General physician</option>
//                 <option value="Gynecologist">Gynecologist</option>
//                 <option value="Dermatologist">Dermatologist</option>
//                 <option value="Pediatricians">Pediatricians</option>
//                 <option value="Neurologist">Neurologist</option>
//                 <option value="Gastroenterologist">Gastroenterologist</option>
//               </select>
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Education</p>
//               <input onChange={(e) => setDegree(e.target.value)} value={degree} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="education" required />
//             </div>

//             <div className="flex-1 flex flex-col gap-1">
//               <p>Address</p>
//               <input onChange={(e) => setAddress1(e.target.value)} value={address1} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="address 1" required />
//               {/* <input onChange={(e) => setAddress2(e.target.value)} value={address2} className="border border-gray-300 rounded px-3 py-2" type="text" placeholder="address 2" required /> */}
//             </div>
//           </div>
//         </div>

//         <div>
//           <p className="mt-4 mb-2">About Doctor</p>
//           <textarea onChange={(e) => setAbout(e.target.value)} value={about} className="w-full px-4 pt-2 border border-gray-300 rounded" placeholder="write about doctor" rows={5} required />
//         </div>

//         <button type="submit" className="bg-green-400 px-10 py-3 mt-4 text-white rounded-full cursor-pointer">Add doctor</button>
//       </div>
//     </form>
//   );
// };

// export default AddDoctor;




import React, { useContext, useState } from "react";
import { assets } from "../../assets/assets";
import { AdminContext } from "../../context/AdminContext";
import { toast } from "react-toastify";
import axios from "axios";
import uploadImageToCloudinary from "./uploadImageToCloudinary";

const AddDoctor = () => {
  const [docImg, setDocImg] = useState(null);
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [experience, setExperience] = useState("1 Year");
  const [fees, setFees] = useState("");
  const [about, setAbout] = useState("");
  const [speciality, setSpeciality] = useState("General physician");
  const [degree, setDegree] = useState("");
  const [address1, setAddress1] = useState("");
  const [address2, setAddress2] = useState("");
  const [gender, setGender] = useState("Male");
  const [contact, setContact] = useState("");
  const [bodyPart, setBodyPart] = useState("");
  const [operations, setOperations] = useState("");
  const [availability, setAvailability] = useState([]);
  const [selectedDay, setSelectedDay] = useState("");
  const [slotInput, setSlotInput] = useState("");


  // console.log(docImg,name,email,password,experience,fees,about,speciality,degree,address1,gender,contact,bodyPart,operations,availability,selectedDay,slotInput)


  const { backendUrl, aToken } = useContext(AdminContext);

  const url = `https://api.cloudinary.com/v1_1/dgelue5vg/image/upload`
  // console.log(process.env.REACT_APP_CLOUD_NAME)

  const UploadImage = async (image, filename) => {
    const formData = new FormData()
    formData.append('file', image)
    formData.append("upload_preset", "Bill_Management")
    formData.append("public_id", filename);
    const dataResponse = await fetch(url, {
      method: 'POST',
      body: formData
    })
    return dataResponse.json()
  }


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    if (!docImg) {
      return toast.error("Image not selected");
    }
    try {

      const imageUrl = await uploadImageToCloudinary(docImg);

      console.log("imageurl is", imageUrl)

      const payload = {
        name,
        email,
        password,
        experience: parseInt(experience.match(/\d+/)?.[0]),
        fees: Number(fees),
        about,
        speciality,
        degree,
        address: address1,
        gender,
        contact,
        bodyPart,
        operations,
        availability,
        image: imageUrl
      };


      const response = await fetch(`${backendUrl}/adminDoctor/add-doctor`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          aToken,
        },
        body: JSON.stringify(payload),
      });

      const data = await response.json();

      if (data.success) {
        toast.success(data.message);

        setName("");
        setEmail("");
        setPassword("");
        setExperience("");
        setFees("");
        setAbout("");
        setSpeciality("");
        setDegree("");
        setAddress1("");
        setGender("");
        setContact("");
        setBodyPart("");
        setOperations("");
        setAvailability([]); // or initial value
        setDocImg(null);


      } else {
        toast.error(data.message);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error(error);
    }
  };


  // doctors

  return (
    <form onSubmit={onSubmitHandler} className="m-5 w-full">
      <p className="mb-3 text-lg font-medium">Add Doctor</p>
      <div className="bg-white px-8 py-8 border border-gray-100 rounded w-full max-w-4xl max-h-[80vh] overflow-y-scroll">
        <div className="flex items-center gap-4 mb-8 text-gray-500">
          <label htmlFor="doc-img">
            <img
              className="w-16 bg-gray-100 rounded-full cursor-pointer"
              src={docImg ? URL.createObjectURL(docImg) : assets.upload_area}
              alt="doctor image"
            />
          </label>
          <input onChange={(e) => setDocImg(e.target.files[0])} type="file" id="doc-img" hidden />
          <p>
            Upload doctor <br /> picture
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* First Row */}
          <div className="flex flex-col gap-1">
            <p>Doctor name</p>
            <input
              onChange={(e) => setName(e.target.value)}
              value={name}
              className="border border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="Name"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Doctor email</p>
            <input
              onChange={(e) => setEmail(e.target.value)}
              value={email}
              className="border border-gray-300 rounded px-3 py-2"
              type="email"
              placeholder="Email"
              required
            />
          </div>

          {/* Second Row */}
          <div className="flex flex-col gap-1">
            <p>Doctor password</p>
            <input
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              className="border border-gray-300 rounded px-3 py-2"
              type="password"
              placeholder="Password"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Experience</p>
            <select
              onChange={(e) => setExperience(e.target.value)}
              value={experience}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              {[...Array(10)].map((_, i) => (
                <option key={i} value={`${i + 1} Year`}>{`${i + 1} Year`}</option>
              ))}
            </select>
          </div>

          {/* Third Row */}
          <div className="flex flex-col gap-1">
            <p>Fees</p>
            <input
              onChange={(e) => setFees(e.target.value)}
              value={fees}
              className="border border-gray-300 rounded px-3 py-2"
              type="number"
              placeholder="Fees"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Speciality</p>
            <select
              onChange={(e) => setSpeciality(e.target.value)}
              value={speciality}
              className="border border-gray-300 rounded px-3 py-2"
            >
              <option value="General physician">General physician</option>
              <option value="Gynecologist">Gynecologist</option>
              <option value="Dermatologist">Dermatologist</option>
              <option value="Pediatricians">Pediatricians</option>
              <option value="Neurologist">Neurologist</option>
              <option value="Gastroenterologist">Gastroenterologist</option>
            </select>
          </div>

          {/* Fourth Row */}
          <div className="flex flex-col gap-1">
            <p>Degree</p>
            <input
              onChange={(e) => setDegree(e.target.value)}
              value={degree}
              className="border border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="Degree"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Gender</p>
            <select
              onChange={(e) => setGender(e.target.value)}
              value={gender}
              className="border border-gray-300 rounded px-3 py-2"
              required
            >
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Fifth Row */}
          <div className="flex flex-col gap-1">
            <p>Contact</p>
            <input
              onChange={(e) => setContact(e.target.value)}
              value={contact}
              className="border border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="Phone Number"
              required
            />
          </div>
          <div className="flex flex-col gap-1">
            <p>Body Part Specialty</p>
            <input
              onChange={(e) => setBodyPart(e.target.value)}
              value={bodyPart}
              className="border border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="e.g. Heart, Skin"
              required
            />
          </div>

          {/* Sixth Row */}
          <div className="flex flex-col gap-1">
            <p>Address Line 1</p>
            <input
              onChange={(e) => setAddress1(e.target.value)}
              value={address1}
              className="border border-gray-300 rounded px-3 py-2"
              type="text"
              placeholder="Address Line 1"
              required
            />
          </div>


          {/* Number of Operations */}
          <div className="flex flex-col gap-1">
            <p>Number of Ops</p>
            <input
              onChange={(e) => setOperations(e.target.value)}
              value={operations}
              className="border border-gray-300 rounded px-3 py-2"
              type="number"
              placeholder="Number of Operations"
              required
            />
          </div>
        </div>

        <div className="mt-8">
          <p className="mb-2 font-semibold">Doctor Availability</p>
          <div className="flex flex-wrap items-center gap-3 mb-4">
            <select
              className="border px-3 py-2 rounded"
              value={selectedDay}
              onChange={(e) => setSelectedDay(e.target.value)}
            >
              <option value="">Select Day</option>
              {["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"].map((day) => (
                <option key={day} value={day}>{day}</option>
              ))}
            </select>
            <input
              type="text"
              placeholder="Enter Time Slot (e.g., 10:00 AM)"
              value={slotInput}
              onChange={(e) => setSlotInput(e.target.value)}
              className="border px-3 py-2 rounded"
            />
            <button
              type="button"
              onClick={() => {
                if (!selectedDay || !slotInput) return;

                setAvailability((prev) => {
                  const existingDay = prev.find((a) => a.day === selectedDay);
                  if (existingDay) {
                    return prev.map((a) =>
                      a.day === selectedDay
                        ? { ...a, slots: [...a.slots, slotInput] }
                        : a
                    );
                  } else {
                    return [...prev, { day: selectedDay, slots: [slotInput], available: true }];
                  }
                });

                setSlotInput("");
              }}
              className="bg-blue-600 text-white px-4 py-2 rounded"
            >
              Add
            </button>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {availability.map((dayObj) => (
              <div key={dayObj.day} className="border rounded p-3 bg-gray-100">
                <p className="font-semibold">{dayObj.day}</p>
                <ul className="list-disc flex gap-6 pl-3 mt-1 text-sm">
                  {dayObj.slots.map((slot, idx) => (
                    <li key={idx}>{slot}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>


        <div>
          <p className="mt-4 mb-2">About Doctor</p>
          <textarea
            onChange={(e) => setAbout(e.target.value)}
            value={about}
            className="w-full px-4 pt-2 border border-gray-300 rounded"
            placeholder="Write about the doctor"
            rows={5}
            required
          />
        </div>

        <button type="submit" className="bg-green-400 px-10 py-3 mt-4 text-white rounded-full cursor-pointer">
          Add doctor
        </button>
      </div>
    </form>
  );
};

export default AddDoctor;


