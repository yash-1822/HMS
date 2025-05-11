import Carousel from "../components/carousel";
import { useOutletContext } from "react-router-dom";
import HospitalSlider from "../components/hospitalslider";
import DoctorsSection from "../components/doctorsSection";
import Footer from "../components/footer";
import BodyPartsSection from "../components/BodyPartsSection";
import Navbar from "../components/mainNavbar";
import { useState,useEffect } from "react";

const HomePage = () => {
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const { searchQuery} = useOutletContext();
    console.log("body part is:",selectedBodyPart);


    const [city, setCity] = useState("");

    // 📌 1️⃣ Function to Get User Location
    const getUserLocation = () => {
        return new Promise((resolve, reject) => {
            if (!navigator.geolocation) {
                reject("Geolocation is not supported by your browser.");
                return;
            }

            navigator.geolocation.getCurrentPosition(
                (position) => {
                    const { latitude, longitude } = position.coords;
                    resolve({ latitude, longitude });
                },
                (error) => {
                    reject(`Error getting location: ${error.message}`);
                },
                { enableHighAccuracy: true, timeout: 15000, maximumAge: 0 }
            );
        });
    };

    // 📌 2️⃣ Function to Get City Name from Coordinates
    const getAddressFromCoords = async (latitude, longitude) => {
        try {
            const API_KEY = "pk.1840589dbbdaf1c3dc5f9e8578b16fa1"; // Replace with your LocationIQ API key
            const response = await fetch(
                `https://us1.locationiq.com/v1/reverse.php?key=${API_KEY}&lat=${latitude}&lon=${longitude}&format=json`
            );
            const data = await response.json();

            if (data.address) {
                const { city, town, village } = data.address;
                return city || town || village || "Unknown Location";
            } else {
                return "Location not found";
            }
        } catch (error) {
            console.error("Error fetching location data:", error);
            return "Error fetching location";
        }
    };

    // 📌 3️⃣ useEffect to Fetch Location on Page Load
    useEffect(() => {
        const fetchLocation = async () => {
            try {
                const { latitude, longitude } = await getUserLocation();
                localStorage.setItem("userLocation", JSON.stringify({ latitude, longitude }));

                const cityName = await getAddressFromCoords(latitude, longitude);
                localStorage.setItem("userCity", cityName);
                setCity(cityName);

                toast.success(`Location detected: ${cityName}`);
            } catch (error) {
                console.error(error);
                toast.warn("Unable to detect location. Please enable location access.");
            }
        };

        fetchLocation();
    }, []);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="mt-[2px]">
            <BodyPartsSection onBodyPartSelect={setSelectedBodyPart} />
                {(selectedBodyPart === null || selectedBodyPart === "all") && <Carousel/>}
                <section className="container mx-auto px-1 py-1">
                <HospitalSlider selectedBodyPart={selectedBodyPart} searchQuery={searchQuery} city = {city}/>
                </section>
                <section className="container mx-auto px-2 py-1">
                    <DoctorsSection searchQuery={searchQuery} city={city} />
                </section>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;