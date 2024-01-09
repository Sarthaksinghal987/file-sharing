const router = require('express').Router();   //This line creates an instance of an Express router. Routers are used to define a group of routes that can be attached to an Express application.

const File = require('../models/file');   // Importing a module named 'File' from the '../models/file' path. This module is presumably a Mongoose model that represents a file in your application.

router.get('/:uuid', async (req,res) =>{   //This line defines a route handler for HTTP GET requests with a dynamic parameter named 'uuid.' The route expects a URL like '/:uuid,' where 'uuid' is a placeholder for a unique identifier.
    const file = await File.findOne({ uuid: req.params.uuid});  //This line uses Mongoose to query the database for a file with a matching 'uuid' property. 
    if(!file) {
        return res.render('download', { error: 'Link has been expired'});   //If no matching file is found, it means the link has expired, and it renders a 'download' view with an error message indicating that the link has expired.
    }

    const filePath = `${__dirname}/../${file.path}`;  //This line constructs the file path where the requested file is located. It uses the '__dirname' variable to get the current directory of the module and appends the 'file.path' property from the 'file' object. 

    res.download(filePath);   // This line uses the res.download() method to send the file as a download to the client's browser. 
});

module.exports = router;    //export the Express router instance, allowing it to be attached to your Express application in another module.