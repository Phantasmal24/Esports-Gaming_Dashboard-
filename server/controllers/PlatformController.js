const rawgServices = require("../services/rawgServices");

/**
 * Handles the request for GET /api/platform-performance
 * This function "connects" the web roite to the data service
 */
const getPlatformPerformance = async (req, res) => {
    try {
        // Calling the services to get the data
        const platforms = await rawgServices.fetchPlatformPerformance();
        // Send response back to the client
        res.json(platforms);
    } catch (error) {
        // Handling the errors
        console.log("Error is getPlatformPerformance controller:", error.message);
        res.status(500).json({ message: "Error fetching platform performance data" });
    }
};

module.exports = {
    getPlatformPerformance,
}