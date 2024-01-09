const nodemailer = require('nodemailer');    //This line imports the Nodemailer library, which is a popular Node.js module for sending email.

async function sendMail({ from, to, subject, text, html}) {   //This defines an asynchronous function named sendMail that takes an object with several parameters
    let transporter = nodemailer.createTransport({   //A Nodemailer transporter is created with the required configuration options.
        host: process.env.SMTP_HOST,
        port: process.env.SMTP_PORT,
        secure: false,
        auth: {
            user: process.env.MAIL_USER,
            pass: process.env.MAIL_PASS
        }
    });

    let info = await transporter.sendMail({    //This line uses the Nodemailer sendMail method to send an email by setting the values of various parameters.
        from: `<${from}>`,
        to: to,
        subject: subject,
        text: text,
        html: html
    });
    console.log(info);
}

module.exports = sendMail;   //The sendMail function is exported so that it can be used in other parts of your application.