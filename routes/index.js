// Importing the Router function from the Express module
const router = require('express').Router();  // 

// Define a route handler for the root URL ('/')
router.get('/', (req, res) => {  
  res.send('Hello World');  // Sending a response to the client with 'Hello World'
});

// Export the router so it can be used in other files (like in app.js)
module.exports = router;  // Export the router instance for use in other parts of the application
