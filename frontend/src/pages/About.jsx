import React from 'react';
import { assets } from '../assets/assets';

const About = () => {
  return (
    <div className="px-4 md:px-12 lg:px-20">
      {/* About Us Section */}
      <div className="text-center text-3xl pt-10 text-gray-600 font-semibold">
        <p>ABOUT <span className="text-gray-800">US</span></p>
      </div>

      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img 
          className="w-full md:max-w-[400px] rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          src={assets.about_image} 
          alt="About Us"
        />
        <div className="flex flex-col justify-center gap-6 md:w-2/4 text-md text-gray-700 leading-relaxed">
          <p className="border-l-4 border-green-400 pl-4">
            Welcome to <b>Prescripto</b>, your trusted partner in managing your healthcare needs conveniently and efficiently. At Prescripto, we understand the challenges individuals face when it comes to scheduling doctor appointments and managing their health records.
          </p>
          <p className="border-l-4 border-green-400 pl-4">
            Prescripto is committed to excellence in healthcare technology. We continuously strive to enhance our platform, integrating the latest advancements to improve user experience and deliver superior service.
          </p>
          <div>
            <b className="text-gray-900 text-lg border-b-2 border-green-400 pb-1">Our Vision</b>
            <p className="mt-2">Our vision at Prescripto is to create a seamless healthcare experience for every user. We aim to bridge the gap between patients and healthcare providers, making it easier for you to access the care you need, when you need it.</p>
          </div>
        </div>
      </div>

      {/* Why Choose Us Section */}
      <div className="text-center text-2xl my-6 text-gray-700 font-semibold">
        <p>WHY <span className="text-green-500">CHOOSE US</span></p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 mb-20">
        {/* Feature Cards */}
        {[
          { title: "Efficiency", text: "Streamlined appointment scheduling that fits into your busy lifestyle." },
          { title: "Convenience", text: "Access to a network of trusted healthcare professionals in your area." },
          { title: "Personalization", text: "Tailored recommendations and reminders to help you stay on top of your health." }
        ].map((feature, index) => (
          <div 
            key={index}
            className="border border-gray-300 px-10 md:px-16 py-8 sm:py-16 flex flex-col gap-5 text-[16px] text-gray-700 cursor-pointer 
                      hover:bg-green-400 hover:text-white hover:scale-105 transition-all duration-300 rounded-lg shadow-lg"
          >
            <b className="text-lg border-b-2 border-gray-400 pb-1">{feature.title}:</b>
            <p>{feature.text}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default About;
