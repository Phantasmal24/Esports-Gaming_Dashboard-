const express = require('express');
const router = express.Router();
const platformController = require('../controllers/PlatformController');

/**
 * This defines the router for the '/api/genres' endpoint
 * Beacuse it connects GET '/platform-performance' to out controller function 'getPlatformPerformance'
 */
router.get('/platform-performance', platformController.getPlatformPerformance);

module.exports = router; // This will export the router