// controllers/popularController.js
const rawgServices = require('../services/rawgServices');

/**
 * WHAT: Handles the request for GET /api/popular
 */
const getPopularGames = async (req, res) => {
  try {
    // 1. Call the *new* service function
    const games = await rawgServices.fetchPopularGames();
    
    // 2. Send the data back as a JSON response.
    res.json(games);
    
  } catch (error) {
    // 3. Handle errors
    console.error("Error in getPopularGames controller:", error.message);
    res.status(500).json({ message: "Error fetching popular games" });
  }
};

module.exports = {
  getPopularGames,
};