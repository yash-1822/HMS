// const mongoose = require("mongoose");

// const DoctorSchema = new mongoose.Schema({
//   name: { type: String, required: true },
//   specialization: { type: String, required: true },
//   hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital" },

//   availability: [
//     {
//       day: { type: String, required: true }, // e.g., "Monday", "Tuesday"
//       slots: [
//         {
//           from: { type: String, required: true }, // e.g., "10:00 AM"
//           to: { type: String, required: true },   // e.g., "1:00 PM"
//         },
//       ],
//     },
//   ],
// });

// module.exports = mongoose.model("Doctor", DoctorSchema);






const mongoose = require("mongoose");

const DoctorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  specialization: { type: String, required: true },
  hospital: { type: mongoose.Schema.Types.ObjectId, ref: "Hospital", default: null }, // Nullable for now
  availability: [
    {
      day: { type: String, required: true },
      slots: [
        {
          from: { type: String, required: true },
          to: { type: String, required: true },
        },
      ],
    },
  ],
});

module.exports = mongoose.model("Doctor", DoctorSchema);

