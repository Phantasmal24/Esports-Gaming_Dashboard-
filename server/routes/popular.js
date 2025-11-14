// routes/popular.js
const express = require('express');
const router = express.Router();
// Import the *new* controller
const popularController = require('../controllers/popularController');

// WHAT: Defines the route
// WHY: This connects a GET request for '/popular'
// to the 'getPopularGames' function in our controller.
// The full path will be /api/popular
router.get('/popular', popularController.getPopularGames);

module.exports = router; // Export the router