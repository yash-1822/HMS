const express = require('express');
const router = express.Router();

const hospitalController = require('../controllers/hospitalController');

router.post('/add-hospitals',hospitalController.addHospitals);
router.get('/hospitals/:id',hospitalController.getHospitalsByCity);
router.get('/proxy-image',hospitalController.getImage)
router.get('/findHospital/:id',hospitalController.getHospitalData)


module.exports = router;