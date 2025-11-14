const express = require('express');
// We create a mini-router for the '/api/trending' endpoint
const router = express.Router();
// We import the controller functions for the '/api/trending' endpoint
const trendingController = require('../controllers/trendingController');

// This line of code will deine the route like when we recieve GET reuests for '/trending,
// we will call the controller function 'getTrendingGames'
router.get('/trending', trendingController.getTrendingGames);

module.exports = router; // This will export the router