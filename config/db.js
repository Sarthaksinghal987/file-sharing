require('dotenv').config();
//This line imports and configures the dotenv module, which is commonly used to load environment variables from a .env file into the process.env object. 
//This is helpful for keeping sensitive information, such as database connection strings, secure.


const mongoose = require('mongoose');
//This line imports the Mongoose library, which is a popular MongoDB ODM (Object Data Modeling) library for Node.js. 
//It provides a higher-level abstraction over MongoDB operations and makes it easier to work with MongoDB.


function connectDB() {
//This function is defined to establish a connection to the MongoDB database. 
//The function is not immediately executed; it needs to be called elsewhere in your code.

    mongoose.connect(process.env.MONGO_CONNECTION_URL, { useNewUrlParser: true, useUnifiedTopology: true, });
    // This line connects to the MongoDB database using the connection URL specified in the environment variable MONGO_CONNECTION_URL.
    
    const connection = mongoose.connection;
    //This line creates a reference to the MongoDB connection.
    
    connection.once('open', function () {
        console.log('MongoDB running');
      }).on('error', function (err) {
        console.log(err);
      });
    //This event listener is triggered once the MongoDB connection is open. It logs a message to the console indicating that MongoDB is running.
    //If there is an error during the connection process, it logs the error to the console.
}

module.exports = connectDB;
//This exports the connectDB function so that it can be imported and used in other files.
