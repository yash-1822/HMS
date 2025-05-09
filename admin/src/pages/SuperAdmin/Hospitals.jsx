import React from 'react';
import { useNavigate } from 'react-router-dom';
import { MapPin, Building2, Phone, Stethoscope, Check, X, FileCheck2 } from 'lucide-react';
import { useContext, useEffect, useState } from 'react';
import axios from "axios"
import { SuperAdminContext } from '../../context/SuperAdminContext';
import {toast} from 'react-toastify'

const Hospitals = () => {
  const navigate = useNavigate();
  const { backendUrl } = useContext(SuperAdminContext);
  const [hospitals, setHospitals] = useState([])
  const [loading, setLoading] = useState(true);

  console.log("hospitals data is:", hospitals)

  const unapprovedHospitals = hospitals?.filter(hospital => hospital.isPending === true);
  console.log("unapproved hospitals data is:", unapprovedHospitals)

  const fetchHospitals = async () => {
    setLoading(true);
    try {
      const { data } = await axios.get(`${backendUrl}/superadmin/getAllHospitals`);
      // setHospitalData(data);
      if (data.success) {
        setHospitals(data.data || []);
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.error(error);
      toast.error('Failed to fetch hospital data');
    }
    finally {
      setLoading(false); // <-- step 2
    }
  };


  useEffect(() => {
    fetchHospitals();
  }, []);


  const availableHospitals = [
    {
      id: '101',
      name: 'Riverbend Hospital',
      location: 'Oregon',
      image: 'https://via.placeholder.com/40x40.png?text=RB',
      contact: '541-123-4567',
      specialty: 'Cardiology',
      certificates: ['ISO 9001', 'JCI'],
    },
    {
      id: '102',
      name: 'Bay Area Clinic',
      location: 'San Francisco',
      image: 'https://via.placeholder.com/40x40.png?text=BA',
      contact: '415-987-6543',
      specialty: 'Pediatrics',
      certificates: ['CAP', 'HIPAA'],
    },
    {
      id: '103',
      name: 'Skyline Health Center',
      location: 'Chicago',
      image: 'https://via.placeholder.com/40x40.png?text=SH',
      contact: '312-765-4321',
      specialty: 'Orthopedics',
      certificates: ['NABH'],
    },
    {
      id: '104',
      name: 'Meadowbrook Medical',
      location: 'Dallas',
      image: 'https://via.placeholder.com/40x40.png?text=MM',
      contact: '214-888-9090',
      specialty: 'Neurology',
      certificates: ['JCI', 'HIPAA'],
    },
    {
      id: '105',
      name: 'Harborview Health',
      location: 'Seattle',
      image: 'https://via.placeholder.com/40x40.png?text=HH',
      contact: '206-555-1212',
      specialty: 'Emergency Medicine',
      certificates: ['ISO 9001'],
    },
    {
      id: '106',
      name: 'Golden Gate Hospital',
      location: 'San Francisco',
      image: 'https://via.placeholder.com/40x40.png?text=GG',
      contact: '415-222-3344',
      specialty: 'General Surgery',
      certificates: ['NABH', 'ISO 14001'],
    },
    {
      id: '107',
      name: 'Highland Regional',
      location: 'Denver',
      image: 'https://via.placeholder.com/40x40.png?text=HR',
      contact: '720-999-1111',
      specialty: 'Oncology',
      certificates: ['HIPAA'],
    },
  ];


  const handleApprovalChange = async (hospital, isApproved) => {
    try {
      const { data } = await axios.post(`${backendUrl}/superadmin/updateHospitalApproval`, {
        hospitalId: hospital._id,
        isApproved,
      });
  
      if (data.success) {
        console.log("yash")
        toast.success(`Hospital ${isApproved ? 'approved' : 'rejected'} successfully`);
        fetchHospitals();
      } else {
        toast.error(data.message);
      }
    } catch (err) {
      console.error(err);
      toast.error(`Error ${isApproved ? 'approving' : 'rejecting'} hospital`);
    }
  };
  

  return (
    <div className="bg-white shadow-xl rounded-2xl py-6 px-4 mt-2 ms-3  animate-fadeIn overflow-x-scroll ">
      <h2 className="text-2xl font-bold text-gray-800 flex items-center gap-2 mb-6">
        <Building2 className="text-blue-600" />
        Available Hospitals
      </h2>

      <div className="rounded-lg h-[505px] overflow-y-auto">
        <table className="min-w-full overflow-x-scroll text-sm text-gray-800">
          <thead className="bg-blue-50 text-blue-700 uppercase text-xs">
            <tr>
              <th className="px-6 py-3 text-left">#</th>
              <th className="px-6 py-3 text-left">Hospital</th>
              <th className="px-6 py-3 text-left">Location</th>
              <th className="px-6 py-3 text-left">Contact</th>
              <th className="px-6 py-3 text-left">Certificates</th>
              <th className="px-6 py-3 text-left">Specialty</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>

          {
            loading ? 
            (
              <div className="flex text-center justify-center items-center h-full text-blue-600 font-semibold animate-pulse">
              <p className="text-center">Loading hospitals...</p>
              </div>
            ):
            (
              <tbody>
              {unapprovedHospitals.map((hospital, index) => (
                <tr
                  key={hospital.id}
                  className="border-b transition-all duration-200 ease-in-out hover:bg-blue-50"
                >
                  <td className="px-6 py-4">{index + 1}</td>
  
  
                  <td className="px-6 py-4 flex items-center gap-3 cursor-pointer"
                    onClick={() => navigate(`/superadmin/hospital/${hospital._id}`, { state: { hospital } })}
                  >
                    <img
                      src={hospital.Featured_Image}
                      alt={hospital.Place_name}
                      className="w-10 h-10 rounded-full object-cover border-2 border-blue-200"
                    />
                    <span className="font-medium">{hospital.Place_name}</span>
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={16} />
                      {hospital.District}, {hospital.State}
                    </div>
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Phone size={16} />
                      {hospital.Phone}
                    </div>
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {hospital.Speciality.map((cert, idx) => (
                        <span
                          key={idx}
                          className="inline-flex items-center gap-1 bg-blue-100 text-blue-700 text-xs px-2 py-1 rounded-full"
                        >
                          <FileCheck2 size={12} />
                          {cert}
                        </span>
                      ))}
                    </div>
                  </td>
  
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-2 text-gray-600">
                      <Stethoscope size={16} />
                      {hospital.specializations[0] || 'N/A'}
                    </div>
                  </td>
  
  
  
  
  
  
                  <td className="px-6 py-4">
                    <div className="flex gap-2">
                      {/* <button
                        onClick={() => handleAccept(hospital)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition"
                      >
                        <Check size={14} />
                        Accept
                      </button>
                      <button
                        onClick={() => handleReject(hospital)}
                        className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition"
                      >
                        <X size={14} />
                        Reject
                      </button> */}
  
  
  <button
    onClick={() => handleApprovalChange(hospital, true)}
    className="flex items-center gap-1 px-3 py-1.5 bg-green-100 text-green-700 text-xs rounded hover:bg-green-200 transition"
  >
    <Check size={14} />
    Accept
  </button>
  <button
    onClick={() => handleApprovalChange(hospital, false)}
    className="flex items-center gap-1 px-3 py-1.5 bg-red-100 text-red-700 text-xs rounded hover:bg-red-200 transition"
  >
    <X size={14} />
    Reject
  </button>
  
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
            )
          }
         
        </table>
      </div>
    </div>
  );
};

export default Hospitals;

