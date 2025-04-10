const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;
const cookieParser = require("cookie-parser");
const cors = require("cors");

require("dotenv").config(); 
require("../db/conn")


// app.use(cors({origin: "*",credentials:true}));
app.use(
    cors({
      origin: "http://localhost:5173", // ✅ Explicitly allow frontend origin
      credentials: true, // ✅ Allow cookies & authentication
    })
  );

  app.use(express.json());

  app.use(cookieParser())

const patientRoutes = require('../routes/patientRoutes');
const hospitalRoutes = require('../routes/hospitalRoutes')
const doctorRoutes = require('../routes/doctorRoutes')

// const doctorRoutes = require('../routes/doctorRoutes');

app.use('/patient',patientRoutes);
app.use('/hospital',hospitalRoutes);
app.use('/doctors',doctorRoutes);



async function startServer(){
    try{
        app.listen(PORT,() => {
            console.log(`Server is running on port ${PORT}`);
        })
    }
    catch(error){
        console.log("Error while strting server is:",error);
    }
}

startServer();