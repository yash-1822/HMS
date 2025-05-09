// import React, { useContext, useState } from 'react'
// import {assets} from '../assets/assets'
// import { AdminContext } from '../context/AdminContext'
// import axios from 'axios'
// import { toast } from 'react-toastify'
// import { data } from 'react-router-dom'
// import { DoctorContext } from '../context/DoctorContext'
// import { HospitalProvider } from '../context/HospitalContext'
// const Login = () => {
//     const [state, setState] = useState('Admin')

//     const [email,setEmail] = useState('')

//     const [password,setPassword] = useState('')

//     const {setAToken,backendUrl} = useContext(AdminContext)

//     const {setDToken} = useContext(DoctorContext)

//     // const {setHToken} = useContext(HospitalProvider)



//     const onSubmitHandler = async (event) => {
//         event.preventDefault();
    
//         try {
//             if (state === "Admin") {
//                 const { data } = await axios.post(`${backendUrl}/adminDoctor/login`, { email, password });
    
//                 if (data.success) {
//                     localStorage.setItem("aToken", data.token);
//                     setAToken(data.token);
//                 } else {
//                     toast.error(data.message);
//                 }
//             } else {
//                 const { data } = await axios.post(`${backendUrl}/api/doctor/login`, { email, password });
//                 console.log("data is:",data)
    
//                 if (data.success) {
//                     localStorage.setItem("dToken", data.token);
//                     console.log("yahsahs")
//                     setDToken(data.token);
//                 } else {
//                     toast.error(data.message);
//                 }
//             }
//         } catch (error) {
//             toast.error("Login failed. Please try again.");
//         }
//     };
    


//   return (
//    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
//     <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
//         <p className='text-2xl font-semibold m-auto'><span className='text-green-400'>{state}</span>Login</p>
//         <div className='w-full'>
//             <p>Email</p>
//             <input onChange={(e) => setEmail(e.target.value)} value={email} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="email" required />
//         </div>

//         <div className='w-full'>
//             <p>Password</p>
//             <input onChange={(e) => setPassword(e.target.value)} value={password} className='border border-[#DADADA] rounded w-full p-2 mt-1' type="password" required />
//         </div>
//         <button className='bg-green-400 text-white w-full py-2 rounded-md text-base cursor-pointer'>Login</button>
//         {
//             state === 'Admin'
//             ? <p>Doctor Login? <span className='text-green-400 underline cursor-pointer' onClick={() => setState('Doctor')}>Click here</span></p> 
//             : <p>Admin Login? <span className='text-green-400 underline cursor-pointer' onClick={() => setState('Admin')}>Click here</span></p> 
//         }
//     </div>
//    </form>
//   )
// }

// export default Login






import React, { useContext, useState } from 'react'
import {assets} from '../assets/assets'
import { AdminContext } from '../context/AdminContext'
import axios from 'axios'
import { toast } from 'react-toastify'
import { data } from 'react-router-dom'
import { DoctorContext } from '../context/DoctorContext'
import { HospitalProvider } from '../context/HospitalContext'
import { SuperAdminContext } from '../context/SuperAdminContext'
import { useNavigate } from 'react-router-dom';



const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { setAToken, backendUrl } = useContext(AdminContext);
  const { setDToken } = useContext(DoctorContext);
  const { setSToken } = useContext(SuperAdminContext)
  const navigate = useNavigate();


  const onSubmitHandler = async (event) => {
    event.preventDefault();

    try {
      const { data } = await axios.post(`${backendUrl}/adminDoctor/login`, { email, password });

      if (data.success) {
        const { token, role,user } = data;

        console.log("data is:",token,role,user)

        if (role === 'doctor') {
          localStorage.setItem('dToken', token);
          setDToken(token);
          localStroage.setItem('email',user.email)
          navigate('/doctor-dashboard');
        } else if (role === 'hospital_admin') {
          localStorage.setItem('aToken', token);
          setAToken(token);
          navigate('/admin/dashboard');
        } else if (role === 'super_admin') {
          localStorage.setItem('sToken', token);
          setSToken(token);
          // navigate('/admin/dashboard');
        }
        else{
          toast.error("Unsupported role");
        }

      } else {
        toast.error(data.message || "Invalid credentials");
      }
    } catch (error) {
      console.error(error);
      toast.error("Login failed. Please try again.");
    }
  };

  return (
    <form onSubmit={onSubmitHandler} className='min-h-[80vh] flex items-center'>
      <div className='flex flex-col gap-3 m-auto items-start p-8 min-w-[340px] sm:min-w-96 border rounded-xl text-[#5E5E5E] text-sm shadow-lg'>
        <p className='text-2xl font-semibold m-auto'>Login</p>

        <div className='w-full'>
          <p>Email</p>
          <input
            onChange={(e) => setEmail(e.target.value)}
            value={email}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="email"
            required
          />
        </div>

        <div className='w-full'>
          <p>Password</p>
          <input
            onChange={(e) => setPassword(e.target.value)}
            value={password}
            className='border border-[#DADADA] rounded w-full p-2 mt-1'
            type="password"
            required
          />
        </div>

        <button className='bg-green-400 text-white w-full py-2 rounded-md text-base cursor-pointer'>
          Login
        </button>
      </div>
    </form>
  );
};

export default Login;
