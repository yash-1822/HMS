import React from 'react';
import { useNavigate } from 'react-router-dom';
import { CheckCircle, XCircle, Building2, MapPin } from 'lucide-react';
import { useContext,useEffect,useState } from 'react';
import { SuperAdminContext } from '../../context/SuperAdminContext';
import StatsCard from '../../components/StatsCard';
import axios from "axios";
import {toast} from 'react-toastify'
// import { useHospitals } from '../../context/HospitalContext';

const Dashboard = () => {
  const { backendUrl} = useContext(SuperAdminContext);

  const [hospitals,setHospitals] = useState([])

  const acceptedCount = hospitals.filter(h => h.isApproved === true).length;
const removedCount = hospitals.filter(h => h.isApproved === false && h.isPending === false).length;
const pendingCount = hospitals.filter(h => h.isPending === true).length;

const [displayedHospitals, setDisplayedHospitals] = useState([]);
const [listTitle, setListTitle] = useState("Accepted Hospitals List");


const showAcceptedHospitals = () => {
  setDisplayedHospitals(hospitals.filter(h => h.isApproved === true));
  setListTitle("Accepted Hospitals List");
};

const showRejectedHospitals = () => {
  setDisplayedHospitals(hospitals.filter(h => h.isApproved === false && h.isPending === false));
  setListTitle("Rejected Hospitals List");
};

const showPendingHospitals = () => {
  console.log("i am in pending")
  setDisplayedHospitals(hospitals.filter(h => h.isPending === true));
  setListTitle("Pending Hospitals List");
};



const acceptedHospitals = hospitals.filter(h => h.isApproved === true);



  const fetchHospitals = async () => {
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
};


useEffect(() => {
    fetchHospitals();
  }, []);

  useEffect(() => {
    if (hospitals.length > 0) {
      showAcceptedHospitals();
    }
  }, [hospitals]);

  console.log("hospitals are",hospitals)
  const navigate = useNavigate();


  return (
    <div className="p-4 sm:p-6 w-full ">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
        <h1 className="text-xl sm:text-2xl font-bold text-gray-900">Dashboard</h1>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-6 mb-8 ">

<StatsCard
  title="Accepted Hospitals"
  value={acceptedCount}
  icon={<CheckCircle className="text-emerald-600" size={28} />}
  onClick={showAcceptedHospitals}
  className={'cursor-pointer'}
/>

<StatsCard
  title="Rejected Hospitals"
  value={removedCount}
  icon={<XCircle className="text-red-600" size={28} />}
  onClick={showRejectedHospitals}
  className={'cursor-pointer'}
/>

<StatsCard
  title="Pending Hospitals"
  value={pendingCount}
  icon={<XCircle className="text-yellow-600" size={28} />}
  onClick={showPendingHospitals}
  className={'cursor-pointer'}
/>

      </div>

      {/* Accepted Hospitals Table */}
      <div className="bg-white shadow-lg rounded-2xl px-6 py-4 h-[390px] overflow-y-auto">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2 mb-6">
          <Building2 className="text-blue-600" size={28} />
          {/* Accepted Hospitals List */}
          {listTitle}
        </h2>

        <div className="overflow-x-auto rounded-lg">
          <table className="min-w-full text-sm text-gray-700 overflow-y-auto">
            <thead className="bg-blue-50 text-blue-700 uppercase text-xs">
              <tr>
                <th className="px-6 py-3 text-left">#</th>
                <th className="px-6 py-3 text-left">Hospital</th>
                <th className="px-6 py-3 text-left">Location</th>
              </tr>
            </thead>
            <tbody>
              {acceptedHospitals.length > 0 ? (
                displayedHospitals.map((hospital, index) => (
                  <tr
                    key={hospital._id}
                    className="border-b hover:bg-blue-50 transition-all cursor-pointer"
                    // onClick={() => navigate(`/admin/hospitals/${hospital._id}`, { state: { hospital } })}
                    onClick={() => navigate(`/superadmin/hospital/${hospital._id}`, { state: { hospital } })}
                  >
                    <td className="px-6 py-4 font-medium">{index + 1}</td>
                    <td className="px-6 py-4 flex items-center gap-3">
                      <img
                        src={hospital.Featured_Image}
                        alt={hospital.Place_name}
                        className="w-10 h-10 rounded-full border-2 border-blue-300 object-cover"
                      />
                      <span>{hospital.Place_name}</span>
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-2">
                        <MapPin className="text-gray-500" size={16} />
                        <span>{hospital.District}, {hospital.State}</span>
                      </div>
                    </td>
                  </tr>
                ))
                
              ) : (
                <tr>
                  <td className="px-6 py-6 text-center text-gray-400" colSpan="3">
                    No accepted hospitals found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
