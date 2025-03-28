import React from 'react';
import { assets } from '../assets/assets';

const Contact = () => {
  return (
    <div className="px-4 md:px-12 lg:px-20">
      {/* Contact Us Heading */}
      <div className="text-center text-3xl pt-10 text-gray-600 font-semibold">
        <p>CONTACT <span className="text-gray-800">US</span></p>
      </div>

      {/* Contact Details Section */}
      <div className="my-12 flex flex-col md:flex-row gap-12 items-center">
        <img 
          className="w-full md:max-w-[400px] rounded-lg shadow-lg transform transition duration-300 hover:scale-105"
          src={assets.contact_image} 
          alt="Contact Us"
        />
        <div className="flex flex-col justify-center items-start gap-6 text-md text-gray-700 leading-relaxed">
          {/* Office Location */}
          <div className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-lg text-gray-700">Our OFFICE</p>
            <p className="text-gray-600 mt-1">54709 Willms Station <br /> Suite 350, Washington, USA</p>
          </div>

          {/* Contact Information */}
          <div className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-lg text-gray-700">Get in Touch</p>
            <p className="text-gray-600 mt-1">
              📞 Tel: (415) 555‑0132 <br />
              ✉️ Email: <a href="mailto:greatstackdev@gmail.com" className="text-green-500 hover:underline">greatstackdev@gmail.com</a>
            </p>
          </div>

          {/* Careers Section */}
          <div className="border-l-4 border-green-400 pl-4">
            <p className="font-semibold text-lg text-gray-700">Careers at PRESCRIPTO</p>
            <p className="text-gray-600 mt-1">Learn more about our teams and job openings.</p>
          </div>

          {/* Explore Jobs Button */}
          <button 
            className="border border-green-500 text-green-500 px-8 py-3 rounded-md text-sm font-medium 
                      hover:bg-green-500 hover:text-white transition-all duration-300 shadow-md"
          >
            Explore Jobs
          </button>
        </div>
      </div>
    </div>
  );
}

export default Contact;
