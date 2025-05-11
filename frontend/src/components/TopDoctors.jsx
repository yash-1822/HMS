import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const TopDoctors = ({ hospitalId }) => {
    const navigate = useNavigate();
    const [doctors, setDoctors] = useState([]);
    const [loading, setLoading] = useState(true); // Loader state

    useEffect(() => {
        const fetchDoctors = async () => {
            try {
                setLoading(true);
                const response = await fetch(`https://hms-backend-d7jp.onrender.com/doctors/getDoctorsByHospitalId/${hospitalId}`);
                if (!response.ok) throw new Error("Failed to fetch doctors");

                const data = await response.json();
                setDoctors(data);
            } catch (error) {
                console.error("Error fetching doctors:", error);
            } finally {
                setLoading(false);
            }
        };

        fetchDoctors();
    }, [hospitalId]);

    return (
        <div className="flex flex-col items-center py-12 text-green-800 font-[Ubuntu] px-4">
            <h1 className="text-3xl font-medium text-center">Top Doctors to Book</h1>
            <p className="text-center text-sm sm:w-1/2 w-full">Simply browse through our extensive list of trusted doctors</p>

            {loading ? (
                <div className="mt-10 flex justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-t-4 border-green-600 border-opacity-30"></div>
                </div>
            ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6 w-full max-w-6xl cursor-pointer">
                    {doctors.slice(0, 8).map((item, index) => (
                        <div 
                            onClick={() => navigate(`/hospital/${hospitalId}/doctors/${item._id}`)}
                            key={index} 
                            className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center transition-transform transform hover:scale-105 hover:shadow-xl w-full max-w-xs"
                        >
                            <img 
                                src={item.doctor_image} 
                                alt={item.name} 
                                className="w-24 h-24 object-cover rounded-full mb-3"
                            />
                            <div className="text-center w-full">
                                <div className="flex flex-col items-center text-green-600 font-medium">
                                    <span className="flex items-center gap-1 text-green-600 text-sm">
                                        <span className="w-2 h-2 bg-green-600 rounded-full"></span>
                                        Available
                                    </span>
                                    <p className="mt-1 text-base text-gray-800">{item.name}</p>
                                </div>
                                <p className="text-gray-600 text-sm mt-1">{item.speciality}</p>
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {!loading && (
                <button 
                    onClick={() => { navigate(`/hospital/${hospitalId}/doctors`); scrollTo(0, 0); }} 
                    className="mt-6 px-6 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
                >
                    More
                </button>
            )}
        </div>
    );
};

export default TopDoctors;
