// const mongoose = require("mongoose");

// const DoctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialty: { type: String, required: true }, // Updated from "specialization" to match JSON
//   qualification: { type: String, required: true }, // New field
//   location: { type: String, required: true }, // New field
//   contact: { type: String, required: true }, // New field
//   email: { type: String, required: true, unique: true }, // New field
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true }, // New field
//   hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null },
//   Hours: {
//     type:String,
//     default:"",
//   },
//   doctor_image: { type: String, required: true },
//   ratings: { type: Number, default: 2 },

//   about: { type: String, required: true }, // Brief description of the doctor
//   experience: { type: Number, required: true }, // Years of experience
//   consultancyFees: { type: Number, required: true }, // Fees for consultation
//   noOfOps: { type: Number, default: 0 }, // Number of operations performed
//   bodyPart: { type: String, required: true }, // Specialization in body parts

//   // Availability structure (Day-wise slots)
//   availability: [
//     {
//       day: { type: String, required: true }, // Example: "Monday"
//       slots: [
//         {
//           from: { type: String, required: true }, // Example: "09:00 AM"
//           to: { type: String, required: true }, // Example: "12:00 PM"
//         },
//       ],
//     },
//   ],
// });

// module.exports = mongoose.model("Doctor", DoctorSchema);






// const mongoose = require("mongoose");

// const DoctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialty: { type: String, required: true },
//   qualification: { type: String, required: true },
//   location: { type: String, required: true },
//   contact: { type: String, required: true },
//   email: { type: String, required: true, unique: true },
//   gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
//   hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null },
//   Hours: { type: String, default: "" },
//   doctor_image: { type: String, required: true },
//   ratings: { type: Number, default: 2 },
//   about: { type: String, required: true },
//   experience: { type: Number, required: true },
//   consultancyFees: { type: Number, required: true },
//   noOfOps: { type: Number, default: 0 },
//   bodyPart: { type: String, required: true },

//   // Updated Availability with specific time slots instead of from-to range
//   availability: [
//     {
//       day: { type: String, required: true }, // Example: "Monday"
//       slots: [{ type: String, required: true }], // Example: ["10:00 AM", "10:30 AM", "11:00 AM"]
//     },
//   ],
// });

// module.exports = mongoose.model("Doctor", DoctorSchema);


const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialty: { type: String, required: true },
  qualification: { type: String, required: true },
  location: { type: String, required: true },
  contact: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  gender: { type: String, enum: ["Male", "Female", "Other"], required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null },
  Hours: { type: String, default: "" },
  doctor_image: { type: String, required: true },
  ratings: { type: Number, default: 2 },
  about: { type: String, required: true },
  experience: { type: Number, required: true },
  consultancyFees: { type: Number, required: true },
  noOfOps: { type: Number, default: 0 },
  bodyPart: { type: String, required: true },

  // Updated Availability with specific time slots and availability status
  availability: [
    {
      day: { type: String, required: true }, // Example: "Monday"
      slots: [{ type: String, required: true }], // Example: ["10:00 AM", "10:30 AM", "11:00 AM"]
      available: { type: Boolean, default: true }, // Indicates if the doctor is available that day
    },
  ],
});

module.exports = mongoose.model("Doctor", DoctorSchema);






