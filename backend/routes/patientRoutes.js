const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientControllers');

router.post('/register',patientController.register);
router.post('/login',patientController.login);
router.post('/otp',patientController.sendOTP)

module.exports = router;