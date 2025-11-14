const rawgServices = require('../services/rawgServices');

/**
 * Handles the request for GET /api/genre-trends
 * This function "connects" the web roite to the data service
 */
const getGenreTrends = async (req, res) => {
    try {
        // Calling the services to get the data
        const genres = await rawgServices.fetchGenreTrends();
        // Send response back to the client
        res.json(genres);
    } catch (error) {
        // Handling the errors
        console.log("Error is getGenreTrends controller:", error.message);
        res.status(500).json({ message: "Error fetching genre trends data" });
    }
};

module.exports = {
    getGenreTrends,
};