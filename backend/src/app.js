const express = require("express");
const app = express();
const PORT = process.env.PORT || 8000;

require("dotenv").config(); 


require("../db/conn")

app.use(express.json());

const cors = require("cors");
app.use(cors({credentials:true}));

const patientRoutes = require('../routes/patientRoutes');
const hospitalRoutes = require('../routes/hospitalRoutes')

// const doctorRoutes = require('../routes/doctorRoutes');

app.use('/patient',patientRoutes);
app.use('/hospital',hospitalRoutes);



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