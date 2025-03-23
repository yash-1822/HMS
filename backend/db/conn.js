require("dotenv").config();
const fs = require("fs");
const path = require("path");
const Hospital = require("../model/HospitalSchema");

const mongoose = require("mongoose");

mongoose.connect(process.env.MONGODB_URI)
  .then(() => {
    console.log("mongodb connected successfully");
  })
  .catch((err) => {
    console.log("Mongodb not connected...",err);
  });



//   const specialities = ["nose", "lungs", "brain", "kidney", "liver", "eye", "heart", "ear"];

// const getRandomSpecialities = () => {
//   if (Math.random() > 0.5) { // 50% chance of getting specialities
//     const shuffled = specialities.sort(() => 0.5 - Math.random());
//     return shuffled.slice(0, Math.floor(Math.random() * 3) + 1); // Select 1 to 3 specialities
//   }
//   return undefined;
// };


// const filePath = path.join(__dirname, "../jsonConvertor/filtered_hospitals.json");
// console.log(filePath)
// const rawData = fs.readFileSync(filePath);
// const hospitals = JSON.parse(rawData);

// const updatedHospitals = hospitals.map(hospital => ({
//   ...hospital,
//   Speciality: getRandomSpecialities(), // Assign random specialities
// }));


// async function insertHospitals() {
//   try {
//     await Hospital.insertMany(updatedHospitals);
//     console.log(`${updatedHospitals.length} hospitals added successfully!`);
//     mongoose.disconnect();
//   } catch (error) {
//     console.error("Error inserting hospitals:", error);
//   }
// }

// insertHospitals();




  const specialities = ["nose", "lungs", "brain", "kidney", "liver", "eye", "heart", "ear"];

  const getRandomSpecialities = () => {
    const shuffled = specialities.sort(() => 0.5 - Math.random());
    return shuffled.slice(0, Math.floor(Math.random() * 3) + 1); // Select 1 to 3 specialities
  };
  


const filePath = path.join(__dirname, "../jsonConvertor/filtered_hospitals.json");
console.log(filePath)
const rawData = fs.readFileSync(filePath);
const hospitals = JSON.parse(rawData);

const updatedHospitals = hospitals.map(hospital => ({
  ...hospital,
  Speciality: getRandomSpecialities(), // Assign random specialities
}));


async function insertHospitals() {
  try {
    await Hospital.insertMany(updatedHospitals);
    console.log(`${updatedHospitals.length} hospitals added successfully!`);
    mongoose.disconnect();
  } catch (error) {
    console.error("Error inserting hospitals:", error);
  }
}

insertHospitals();





