// import Carousel from "../components/carousel";
// import HospitalSlider from "../components/hospitalslider";
// import DoctorsSection from "../components/doctorsSection";
// import Footer from "../components/footer";
// import BodyPartsSection from "../components/bodyPartsSection";
// import Navbar from "../components/mainNavbar";

// const HomePage = () => {
//     return (
//         <div className="min-h-screen flex flex-col">
//             {/* <Navbar/> */}
//             <main className="mt-2">
//                 <BodyPartsSection /> {/* Added BodyPartsSection here */}
//                 <Carousel />
//                 <section className="container mx-auto px-1 py-1">
//                     <HospitalSlider />
//                 </section>
//                 <section className="container mx-auto px-2 py-1">
//                     <h2 className="text-2xl font-bold mb-4">Our Doctors</h2>
//                     <DoctorsSection />
//                 </section>
//             </main>
//             {/* <Footer /> */}
//         </div>
//     );
// };

// export default HomePage;





import Carousel from "../components/carousel";
import { useOutletContext } from "react-router-dom";
import HospitalSlider from "../components/hospitalslider";
import DoctorsSection from "../components/doctorsSection";
import Footer from "../components/footer";
import BodyPartsSection from "../components/BodyPartsSection";
import Navbar from "../components/mainNavbar";
import { useState } from "react";

const HomePage = () => {
    const [selectedBodyPart, setSelectedBodyPart] = useState(null);
    const { searchQuery } = useOutletContext();
    console.log("body part is:",selectedBodyPart);

    return (
        <div className="min-h-screen flex flex-col">
            <main className="mt-2">
            <BodyPartsSection onBodyPartSelect={setSelectedBodyPart} />
                {/* <Carousel /> */}
                {(selectedBodyPart === null || selectedBodyPart === "all") && <Carousel />}
                <section className="container mx-auto px-1 py-1">
                <HospitalSlider selectedBodyPart={selectedBodyPart} searchQuery={searchQuery}/>
                </section>
                <section className="container mx-auto px-2 py-1">
                    <h2 className="text-2xl font-bold mb-4">Our Doctors</h2>
                    <DoctorsSection />
                </section>
            </main>
            {/* <Footer /> */}
        </div>
    );
};

export default HomePage;

