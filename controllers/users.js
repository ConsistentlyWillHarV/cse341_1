// Import the MongoDB database connection module
const mongodb = require('../data/database');  // This gives access to the database connection
const ObjectId = require('mongodb').ObjectId;  // Import the ObjectId class from MongoDB to work with ObjectId values

// Define a function to handle getting all users from the database
const getAll = async (req, res) => {
  // Use the MongoDB client to query the 'users' collection and find all records
  const result = await mongodb.getDatabase().db().collection('users').find();
  
  // Convert the result into an array (as MongoDB returns a cursor)
  result.toArray().then(users => {
    // Set the response header to 'application/json', telling the client to expect JSON
    res.setHeader('Content-Type', 'application/json');
    
    // Respond with a 200 status code and the array of users in JSON format
    res.status(200).json(users);
  });
};

// Define a function to handle getting a single user by their ID from the database
const getSingle = async (req, res) => {
  // Extract the 'id' parameter from the request URL, and convert it to an ObjectId for MongoDB
  const userid = new ObjectId(req.params.id);  // 'req.params.id' comes from the URL path
  
  // Use the MongoDB client to query the 'users' collection, searching for a document with the given _id
  const result = await mongodb.getDatabase().db().collection('users').find({ _id: userid });
  
  // Convert the result into an array and handle it with a .then() promise handler
  result.toArray().then(users => {
    // Set the response header to 'application/json', telling the client the data will be in JSON format
    res.setHeader('Content-Type', 'application/json');
    
    // Respond with a 200 status code and the first (and only) user in JSON format
    // Since _id is unique, we expect only one user in the array
    res.status(200).json(users[0]);
  });
};

// Export the functions so they can be used in the routes file
module.exports = {
  getAll,  // Export the 'getAll' function to get all users
  getSingle  // Export the 'getSingle' function to get a single user by ID
};
