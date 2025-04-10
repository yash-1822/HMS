const express = require('express');
const router = express.Router();

const patientController = require('../controllers/patientControllers');
const verifyToken = require('../middleware/authMiddleware');

router.post('/register',patientController.register);
router.post('/login',patientController.login);
router.post('/otp',patientController.sendOTP)
router.get('/verify-token',verifyToken,patientController.checkToken)
router.post('/logout',verifyToken,patientController.logout)

module.exports = router;