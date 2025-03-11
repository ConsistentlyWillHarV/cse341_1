// Import the Express library to create an Express application
const express = require('express');

// Import the MongoDB database connection module. Adjust the path based on your file structure.
const mongodb = require('./cse341_1/data/database.js');



// Create an instance of the Express application
const app = express();

// Set the port number from the environment variables or default to 3000 if not set
const port = process.env.PORT || 3001;

// Mount the 'users' routes under the '/users' path
// This means that any request made to '/users' will be handled by the routes defined in the 'routes' file
app.use('/users', require('./routes/users'));
  // 'users' routes are mounted under '/users'

// Define a basic route for the root URL ('/')
// This is an optional route that will send a "Hello, world!" message when accessed
app.get('/', (req, res) => {
    res.send('Hello, world!');
});

// Initialize MongoDB connection and start the server once the database connection is successful
mongodb.initDb((err) => {
    // If an error occurs while connecting to the database, log the error message
    if (err) {
        console.log('Failed to connect to database:', err);
    } else {
        // If the connection is successful, start the Express server
        // The server will listen on the specified port (either from environment variables or default 3000)
        app.listen(port, () => {
            console.log(`Server is running on port ${port}`);
        });
    }
});
