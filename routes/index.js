// Importing the Router function from the Express module
const router = require('express').Router();

// Define a route handler for the root URL ('/')
router.get('/', (req, res) => {  
  res.send('Hello World');  // Sending a response to the client with 'Hello World'
});

// Use the '/users' path to handle the user routes from the 'users.js' file
router.use('/users', require('./users'));  // Make sure the path is './users' to match your file structure

// Export the router so it can be used in app.js or server.js
module.exports = router;
