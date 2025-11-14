const express = require('express');
const router = express.Router();
const genreController = require('../controllers/genreController');

/**
 * This defines the router for the '/api/genres' endpoint
 * Beacuse it connects GET '/genre-trends' to out controller function 'getGenreTrends'
 */
router.get('/genre-trends', genreController.getGenreTrends);

module.exports = router; // This will export the router