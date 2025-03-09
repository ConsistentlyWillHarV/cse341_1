// Load environment variables from a .env file using dotenv library
// The .env file usually contains sensitive configurations like database URLs or API keys
const dotenv = require('dotenv').config();  // Load and parse .env file into process.env

// Correct import of MongoClient from the MongoDB package to interact with the database
const { MongoClient } = require('mongodb');  // MongoClient is used to establish connections to MongoDB

// Variable to hold the MongoDB database connection object
let database;  // Initially set to undefined, will be assigned the MongoDB client object once connected

// Function to initialize the database connection
const initDb = (callback) => {
  // Check if the database has already been initialized
  if (database) {
    console.log('Database is already initialized');  // Log if the database is already set up
    return callback(null, database);  // Return the already initialized database
  }

  // If not initialized, connect to the database using MongoClient
  MongoClient.connect(process.env.MONGODB_URL)  // Use the MongoDB URL from environment variables (stored in .env file)
    .then((client) => {
      // Once the connection is successful, store the client object in the 'database' variable
      database = client;  
      callback(null, database);  // Call the callback with 'null' for error and pass the database connection
    })
    .catch((err) => {
      // If there is an error during connection, call the callback with the error
      callback(err);  // Pass the error to the callback so the caller knows there was an issue
    });
};

// Function to get the database connection object
const getDatabase = () => {
  // If the database is not initialized yet, throw an error
  if (!database) {
    throw new Error('Database not initialized');  // Ensure that the database is initialized before accessing it
  }
  return database;  // Return the database connection object
};

// Export the functions so they can be used in other parts of the application
module.exports = {
  initDb,  // Export the initDb function to initialize the database connection
  getDatabase  // Export the getDatabase function to access the database after initialization
};
