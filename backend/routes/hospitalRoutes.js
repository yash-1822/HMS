const express = require('express');
const router = express.Router();

const hospitalController = require('../controllers/hospitalController');

router.post('/add-hospitals',hospitalController.addHospitals);
router.get('/hospitals/eluru',hospitalController.getEluruData)
router.get('/proxy-image',hospitalController.getImage)


module.exports = router;