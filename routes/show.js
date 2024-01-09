const router = require('express').Router();       //This line creates an instance of an Express router. Routers are used to define a group of routes that can be attached to an Express application.

const File = require('../models/file');   // Importing a module named 'File' from the '../models/file' path. This module is presumably a Mongoose model that represents a file in your application.

router.get('/:uuid', async(req, res) =>{  //This line defines a route handler for HTTP GET requests with a dynamic parameter named 'uuid.' 
    try{
        const file = await File.findOne({ uuid: req.params.uuid});    //This line uses Mongoose to query the database for a file with a matching 'uuid' property.
        if(!file)
        {
            return res.render('download' ,{ error: 'Link has been expired'});   //If no matching file is found, it means the link has expired, and it renders a 'download' view with an error message indicating that the link has expired.
        }

        return res.render('download', {    //If a matching file is found, this block of code is executed. It renders a 'download' view with the resulting data.
            uuid: file.uuid,
            fileName: file.filename,
            fileSize: file.size,
            downloadLink: `${process.env.APP_BASE_URL}/files/download/${file.uuid}`,
        });
    } catch(err) {
        return res.render('download' ,{ error: 'Something went wrong'});  // In case of an error, it renders a 'download' view with an error message indicating that something went wrong.
    }
    
});

module.exports = router;  //export the Express router instance, allowing it to be attached to your Express application in another module.