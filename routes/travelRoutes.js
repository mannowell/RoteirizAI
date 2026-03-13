const express = require('express');
const router = express.Router();
const travelController = require('../controllers/travelController');

router.post('/plan', travelController.planTrip);

module.exports = router;
