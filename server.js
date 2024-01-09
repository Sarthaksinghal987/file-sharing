require('dotenv').config();       // It allows you to load environment variables from a .env file into your Node.js application

const express = require('express');     //Importing the express framework, which is a popular Node.js web framework used for building web applications.

const path =require('path');      //Imports the path module, which is a built-in Node.js module used for working with file paths and directories.

const app = express();            //Creating an instance of the Express application, which represents your web server.

const PORT = "5501";              // PORT ON WHICH BACKEND IS RUNNING

const cors = require('cors');     // Importing the cors middleware. It enables you to control which origins are allowed to make requests to your server.

app.use(express.static('public'));     // This line configures Express to serve static files from a directory named 'public.' Static files can include HTML, CSS, JavaScript, and other assets that don't require server-side processing.
app.use(express.json());          //This line adds middleware to parse incoming JSON data in the request body. It enables your application to handle JSON-formatted data sent in HTTP requests.

const connectDB = require('./config/db');  //Importing a function named connectDB from a file located in the './config/db' path. This function is presumably responsible for connecting your application to a database.
connectDB();        //Calling the connectDB function to establish a connection to your database.

//Cors
const corsOptions = {             //It specifies that requests from "http://127.0.0.1:5500" (presumably the frontend) are allowed to access resources on your backend.
    origin: "*",

    //URL ON WHICH FRONTEND IS RUNNING

}
app.use(cors(corsOptions));       //This line adds the CORS middleware to your Express application.

//Template Engine
app.set('views', path.join(__dirname, '/views'));  //configuring the views directory for your template engine. It tells Express to look for templates in the '/views' directory.
app.set('view engine', 'ejs');     //This sets the view engine to 'ejs,' which is a template engine for rendering dynamic HTML content.


//Routes
app.use('/api/files', require('./routes/files'));  //This line attaches the routes defined in the './routes/files' file to the path '/api/files' in your Express application.
app.use('/files',require('./routes/show'));   //This line attaches routes from the './routes/show' module to the path '/files' in your application.
app.use('/files/download',require('./routes/download'));   //This line attaches routes from the './routes/download' module to the path '/files/download' in your application.

app.listen(PORT, () =>{           //Start your Express server and make it listen on the specified port (5501)
    console.log(`Listening on Port ${PORT}`);
});