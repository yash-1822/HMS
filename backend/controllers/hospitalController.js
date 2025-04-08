const express = require("express");
const Hospital = require("../model/HospitalSchema");
const router = express.Router();

// API to add multiple hospitals
const addHospitals = async(req, res) => {
  try {
    const hospitals = req.body; // Expecting an array of hospital objects
    if (!Array.isArray(hospitals) || hospitals.length === 0) {
      return res.status(400).json({ message: "Invalid input. Provide an array of hospital objects." });
    }

    const newHospitals = await Hospital.insertMany(hospitals);
    res.status(201).json({ message: "Hospitals added successfully", data: newHospitals });
  } catch (error) {
    console.error("Error adding hospitals:", error);
    res.status(500).json({ message: "Server error", error: error.message });
  }
};

const getEluruData = async(req,res) => {
  try {
    const hospitals = await Hospital.find({ District: "Eluru" });
    console.log(hospitals)
    res.status(200).json(hospitals);
  } catch (error) {
    res.status(500).json({ message: "Error fetching hospitals", error });
  }
}

const getImage = async(req,res) => {
  const { url } = req.query;
  try {
    const response = await axios.get(url, { responseType: "arraybuffer" });
    res.set("Content-Type", "image/jpeg");
    res.send(response.data);
  } catch (error) {
    res.status(500).json({ message: "Error fetching image" });
  }
}

module.exports = {addHospitals,getEluruData,getImage};
