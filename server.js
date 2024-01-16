require('dotenv').config();
const express=require('express');
const cors=require('cors');
const bcrypt=require('bcrypt');
const cookieParser=require('cookie-parser');
const path=require('path');
const auth=require('./middleware/auth');
const File=require('./models/file');

const app=express();
const PORT=process.env.PORT || 3000;

const connectDB=require('./config/db');
connectDB();

// Cors

const corsOptions={
    origin:'*'
}

                          // MIDDLEWARES

// static middleware to server html/css files static files
app.use(express.static('public'));
app.use(cors(corsOptions));
app.use(express.json());

// Browser se cookie fetch karne ke liye 
app.use(cookieParser());
// You need to use bodyParser() if you want the form data to be available in req.body.
app.use(express.urlencoded({ extended: false}));

                     // TEMPLATE ENGINE

app.set('views',path.join(__dirname,'/views'));
app.set('view engine','ejs');

                            
                            //ROUTES
                   
app.use('/register',require('./routes/register'))// to register user
app.use('/login',require('./routes/login'))// to login user
app.use('/api/files',require('./routes/files')); // to upload file
app.use('/files',require('./routes/show'));     // to preview download page
app.use('/files/download',require('./routes/download')) // to download file

app.get('/home',auth,(req,res)=>{
    res.render('home');
});

app.get('/logout',auth,async (req,res)=>{
    try{
        res.clearCookie('jwt');
        res.redirect('/');
    }catch(error){
        res.status(500).send(error);
    }

})

app.listen(PORT,()=>{
    console.log(`Listening on port ${PORT}`);
})