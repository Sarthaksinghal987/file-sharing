const router = require('express').Router();    //This line creates an instance of an Express router, which is used to define routes and their handlers.

const multer = require('multer');      //importing the multer middleware, which is used for handling file uploads.

const path = require('path');        // The path module is imported, which is used for working with file paths and directories.

const File = require('../models/file');      // importing the 'File' model, which represents files in your system.

const { v4: uuid4 } = require('uuid');     // imports the 'v4' method from the 'uuid' library and renames it as 'uuid4.' It's used to generate unique identifiers (UUIDs).

let storage = multer.diskStorage({         //defining a storage configuration for multer. It specifies where uploaded files should be stored and how their filenames should be generated.
    destination: (req, file, cb) => cb(null, 'uploads/'),

    filename: (req, file, cb) =>{
        const uniqueName = `${Date.now()}-${Math.round(Math.random() * 1E9)}${path.extname(file.originalname)}`;
        cb(null, uniqueName);
    }
});

let upload = multer({      //This line sets up the multer middleware with the previously defined storage configuration. It also specifies that it will handle a single file upload with the field name "myfile."
    storage,
    limit: { fileSize: 1000000 * 100},
}).single("myfile");

router.post('/',(req, res) =>{    //This defines an HTTP POST route handler for the root path ('/'). It handles file uploads.

    //Store file
    upload(req, res, async (err) => {      //upload middleware is use to process the file upload.
        //Validate request
        if(!req.file){             //check if correct file is uploaded or not
            return res.json({error : 'All fields are required.'});    
        }
        
        if(err)                   // check for error while uploading
        {
            return res.status(500).send({ error: err.message});
        }

        //Store into Database
        const file= new File({       //If the upload is successful, it creates a new 'File' instance.
            filename: req.file.filename,
            uuid: uuid4(),
            path: req.file.path,
            size: req.file.size
        });

        const response = await file.save();     //Saves it to the database.
        return res.json({ file: `${process.env.APP_BASE_URL}/files/${response.uuid}`});  // It then returns a JSON response with a download link to the uploaded file.
    });

});

router.post('/send', async (req, res)=>{      //This defines an HTTP POST route handler for '/send.' It handles the sharing of files via email.

    const { uuid, emailTo, emailFrom } = req.body;     //It extracts uuid, emailTo, and emailFrom from the request body and checks if all fields are provided. If not, it returns a 422 Unprocessable Entity status with an error message.
    if(!uuid || !emailTo || !emailFrom) {
        return res.status(422).send({ error: 'All fields are required'});
    }

    const file = await File.findOne({ uuid: uuid});    //It looks up the file in the database based on the provided uuid and checks if it has already been sent. If it has, it returns a 422 status with an error message.
    if(file.sender) {
        return res.status(422).send({ error: 'Email already sent.'});
    }

    file.sender = emailFrom;
    file.receiver = emailTo;
    const response = await file.save();    //It updates the 'sender' and 'receiver' fields in the 'File' model and saves the changes.

    const sendMail =require('../services/emailService');    //It uses the 'emailService' and 'emailTemplate' services to send an email with a download link and other details.
    sendMail({
        from: emailFrom,
        to: emailTo,
        subject: 'File Sharing',
        text: `${emailFrom} shared a file with you`,
        html: require('../services/emailTemplate')({
            emailFrom: emailFrom,
            downloadLink: `${process.env.APP_BASE_URL}/files/${file.uuid}`,
            size: parseInt(file.size/1000)+ ' KB',
            expires: '24 hours',
        }),
    });

    return res.send({ success: true});     // it returns a success response if everything is successful.
});

module.exports = router;     //This exports the router, making it available for use in other parts of your application.