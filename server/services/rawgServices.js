// Load environment variables from the .env file
require('dotenv').config();
// axios is a library for making HTTP requests
const axios = require('axios');

// Now we will GET the API key form the load environment variables
const RAWG_API_KEY = process.env.RAWG_API_KEY;

// -- Services for Trending Games -- 
const fetchTrendingGames = async () => {
    // 'await' means we are pausing here until the API call is finished
    const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
            key: RAWG_API_KEY,  // Send our secret API key
            ordering: '-rating', // 'sort by rating, descending
            page_size: 10, // Only get the top 10 results
        },
    });

    // Now we have the API call finished, we can return the data
    const games = response.data.results;
    // We will use the map over the games array to clean up the data
    // Beacuse the RAWG API sen 50+ fields, we only want to return 4.
    const cleanedGames = games.map((game) => ({
        id: game.id,
        name: game.name,
        rating: game.rating,
        image: game.background_image,
    }));
    // Returning the new, cleaned array
    return cleanedGames;
}

// -- Service Genre Trends --
/**
 * Fetches 50 popular games and calculates the genre trends
 * RAWG dosen't have a "genre trend" endpoints. We have to create one for it.
 */
const fetchGenreTrends = async () => {
    // We will fetch larger list of games to analyze
    const response = await axios.get('https://api.rawg.io/api/games', {
        params: {
            key: RAWG_API_KEY, // Send our secret API key
            ordering: '-added', // means most popular/ recetly added
            page_size: 50, // Only get the top 50 results
        },
    });

    const games = response.data.results;

    // Now we will process the data to count genres
    // We will create an empty "hash map" to store the counts.
    const genreCounts = {};

    // Looping through every game we fetched
    games.forEach((game) => {
        //  Looping thorugh each game, through each genre
        game.genres.forEach((genre) => {
            // genre.name is "Action", "RPG", etc
            if (genreCounts[genre.name]) {
                // If we've seen "Action" before, increment its count
                genreCounts[genre.name]++;
            } else {
                // If this is the first time we've seen "Action"
                genreCounts[genre.name] = 1;
            }
        });
    });

    // Now the genre point will look like this { "Action": 20, "RPG": 15, "Adventure": 10, ... }
    // Now we will formt the data to match the API contract
    // The contract wants: [{ id: "action", label: "Action", value: 25 }, ...]
    // Now we will get the array for the keys
    const formattedGenres = Object.keys(genreCounts).map((genreName) => ({
        id: genreName.toLocaleLowerCase().replace(' ', '-'),
        label: genreName, // This displays "Action"
        value: genreCounts[genreName], // This displays count: 25
    }));

    // Returning the final, formatted array
    return formattedGenres;
};

// -- Service Platform Performance --
/**
 * featched the top platforms, orderred by how mant games they have.
 * Provides data for the '/api/platform-performance' endpoint
 */
const fetchPlatformPerformance = async () => {
    // We are hitting the platforms endpoint with this
    const response = await axios.get('https://api.rawg.io/api/platforms', {
        params: {
            key: RAWG_API_KEY, // Send our secret API key
            ordering: '-games_count', // Get the platforms with the most games first
            page_size: 8, // Only get the top 8 results
        },
    });

    // Now we have the API call finished, we can return the data
    const platforms = response.data.results;
    // Now we will format it to contarct: [{ id, label, value }]
    const formattedPlatforms = platforms.map((platform) => ({
        id: platform.slug,  // "pc", "playstation", etc
        label: platform.name,  // "PC", "Playstation", etc
        value: platform.games_count, // The total game count
    }));

    // Returning the final, formatted array
    return formattedPlatforms;
};

// module.exports is a way node.js makes function
// available to other files that 'require' this one
module.exports = {
    fetchTrendingGames,
    fetchGenreTrends,
    fetchPlatformPerformance
};
