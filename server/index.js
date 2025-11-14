// 'dotenv' is a library for loading environment variables from a .env file
// and must be required before other modules
require('dotenv').config();
const express = require('express');
const cors = require('cors');  // 'cors' is scurity middleware for Express

// -- Importing the route files --
const trendingRoutes = require('./routes/trending');
const genreRoutes = require('./routes/genres');
const platformRoutes = require('./routes/platforms');
const popularRoutes = require('./routes/popular'); // <-- ADD THIS NEW LINE

// Creating the main Express applications
const app = express();
// Now we are using PORT form .env or default to 3001
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// -- Using the route files --
app.use('/api', trendingRoutes);
app.use('/api', genreRoutes);
app.use('/api', platformRoutes);
app.use('/api', popularRoutes); // <-- ADD THIS NEW LINE

// Starting the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  	console.log('You can now test your endpoints in Postman.');
  	console.log('GET http://localhost:3001/api/trending (LIVE Twitch data)');
    console.log('GET http://localhost:3001/api/popular (Random All-Time data)');
  	console.log('GET http://localhost:3001/api/genre-trends');
  	console.log('GET http://localhost:3001/api/platform-performance');
});