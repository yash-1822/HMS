const bcrypt = require("bcryptjs");
const crypto = require("crypto");
const axios = require("axios");
const OTP = require("../model/OtpSchema");
const jwt = require("jsonwebtoken");
const User = require("../model/UserSchema");

const register = async (req, res) => {
    console.log("body is:",req.body);
    try {
        const { name, phone, address, email, password, confirmPassword} = req.body;

        if (!name || !phone || !address || !email || !password || !confirmPassword) {
            return res.status(400).json({ error: "All fields are required" });
        }

        if (password !== confirmPassword) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ error: "Email already in use" });
        }

        const newUser = new User({
            name,
            phone,
            location: address, 
            email,
            password,
            role:"patient", 
            status: "Pending", 
        });

        await newUser.save();

        return res.status(201).json({ message: "User registered successfully" ,newUser});

    } catch (error) {
        console.error("Error in register:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};

const login = async(req,res) => {
    try {
        const { email, password } = req.body;

        const userDetails = await User.findOne({ email });
        if (!userDetails) {
            return res.status(400).json({ error: "User not found" });
        }

        // Verify password
        const isMatch = await bcrypt.compare(password, userDetails.password);
        if (!isMatch) {
            return res.status(400).json({ error: "Incorrect password" });
        }

        const checkPassword = await bcrypt.compare(password,userDetails.password)
        const tokenData = {
                _id:userDetails._id,
                email:userDetails.email
            }

            const token = await jwt.sign(tokenData,process.env.SECRET_KEY,{expiresIn : 60*60*8});
            const tokenOptions = {
                httpOnly:true,
                secure:true
            } 

            res.cookie("token",token,tokenOptions).status(200).json
            ({
                message:"Login succesfully",
                data:token, 
                user: { _id: userDetails._id, email: userDetails.email, name: userDetails.name },
                expires: new Date(Date.now() + 60*60*8),
                success:true,
                error:false
            })  
        
    } catch (error) {
        console.error("Login error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }

}


const checkToken = async(req,res) => {
    res.status(200).json({ message: "Valid token", user: req.user });
}


const sendOTP = async (req, res) => {
    try {
        console.log(req.body);
        const { numbers } = req.body;

        const phoneNumber = numbers.toString();

        // ✅ Check if user exists
        const user = await User.findOne({ phone:phoneNumber });
        console.log(user);

        if (!user) {
            return res.status(400).json({ error: "User not found" });
        }

        // ✅ Generate 6-digit OTP
        const otpCode = crypto.randomInt(100000, 999999);

        // ✅ Store OTP in DB (valid for 5 minutes)
        await OTP.create({phone:phoneNumber, otp: otpCode, expiresAt: Date.now() + 300000 });

        // ✅ Send OTP using Fast2SMS
        const apiKey = process.env.FAST2SMS_API_KEY;
        const message = `OTP for login is ${otpCode}. It is valid for 5 minutes.`;

        const response = await axios.post(
            "https://www.fast2sms.com/dev/bulkV2",
            {
                route: "otp",
                message: message,
                language: "english",
                numbers: phoneNumber
            },
            {
                headers: {
                    authorization: apiKey,
                }
            }
        );

        // ✅ Check if OTP was sent successfully
        if (response.data.return) {
            return res.status(200).json({ message: "OTP sent successfully" });
        } else {
            return res.status(500).json({ error: "Failed to send OTP" });
        }
    } catch (error) {
        console.error("OTP Error:", error);
        return res.status(500).json({ error: "Internal Server Error" });
    }
};


const logout = async(req,res)=>{
    try{
        res.clearCookie("token")
        res.json({
            message:"Log out successfully",
            error:false,
            success:true,
            data:[]
        })
    }
    catch(error){
        res.status(500).json({ message: "Server error" });
    }
}


module.exports = { register,login,sendOTP,checkToken,logout};


