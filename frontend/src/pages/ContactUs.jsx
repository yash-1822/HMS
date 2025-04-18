import React, { useState } from 'react';

const ContactUs = () => {
  // State variables to store the hospital details
  const [hospitalName, setHospitalName] = useState('');
  const [email, setEmail] = useState('');
  const [address, setAddress] = useState('');
  const [numDoctors, setNumDoctors] = useState('');
  const [documents, setDocuments] = useState([]);

  // Handle file selection for documents
  const handleFileChange = (e) => {
    setDocuments(e.target.files);
  };

  // Handle form submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // You can add form submission logic here, like sending data to an API
    console.log({
      hospitalName,
      email,
      address,
      numDoctors,
      documents,
    });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-center text-green-600 mb-6">Contact Us</h1>
      <form
        onSubmit={handleSubmit}
        className="space-y-6 p-6 bg-white rounded-lg shadow-xl"
        style={{ maxWidth: '500px', margin: '0 auto' }}
      >
        {/* Hospital Name */}
        <div>
          <label className="block text-lg font-semibold text-green-700" htmlFor="hospitalName">
            Hospital Name
          </label>
          <input
            type="text"
            id="hospitalName"
            value={hospitalName}
            onChange={(e) => setHospitalName(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Email */}
        <div>
          <label className="block text-lg font-semibold text-green-700" htmlFor="email">
            Email
          </label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Address */}
        <div>
          <label className="block text-lg font-semibold text-green-700" htmlFor="address">
            Address
          </label>
          <textarea
            id="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            rows="4"
            required
          />
        </div>

        {/* Number of Doctors */}
        <div>
          <label className="block text-lg font-semibold text-green-700" htmlFor="numDoctors">
            Number of Doctors
          </label>
          <input
            type="number"
            id="numDoctors"
            value={numDoctors}
            onChange={(e) => setNumDoctors(e.target.value)}
            className="w-full p-3 border border-gray-300 rounded-md"
            required
          />
        </div>

        {/* Documents */}
        <div>
          <label className="block text-lg font-semibold text-green-700" htmlFor="documents">
            Upload Documents
          </label>
          <input
            type="file"
            id="documents"
            multiple
            onChange={handleFileChange}
            className="w-full p-3 border border-gray-300 rounded-md"
          />
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="bg-green-600 text-white px-6 py-3 rounded-xl hover:bg-green-700 transition"
          >
            Submit
          </button>
        </div>
      </form>

      {/* Display Hospital Details */}
      {hospitalName && email && address && numDoctors && documents.length > 0 && (
        <div className="mt-6">
          <h2 className="text-2xl font-semibold text-green-600">Hospital Details</h2>
          <ul className="space-y-2">
            <li><strong>Hospital Name:</strong> {hospitalName}</li>
            <li><strong>Email:</strong> {email}</li>
            <li><strong>Address:</strong> {address}</li>
            <li><strong>Number of Doctors:</strong> {numDoctors}</li>
            <li>
              <strong>Documents:</strong>
              <ul className="list-disc ml-6">
                {Array.from(documents).map((doc, index) => (
                  <li key={index}>{doc.name}</li>
                ))}
              </ul>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default ContactUs;
