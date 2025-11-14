// We will import the specific function we need
const rawgServices = require('../services/rawgServices');

/**
 * Handles the request for GET /api/trending
 * This function "connects" the web roite to the data service
 */
const getTrendingGames = async (req, res) => {
    try {
        // We will call the service to get the data, it just asks
        const games = await rawgServices.fetchTrendingGames();

        // We will send the data back to the client
        res.json(games);
    } catch (error) {
        // If something goes wrong, we will send a "500" server error
        console.error("Error is getTrendingGames controller:", error.message);
        res.status(500).json({ message: "Error fetching trending games" });
    }
};

module.exports = {
    getTrendingGames,
};