
const app = require('./app')
const fileUpload = require('express-fileupload');

const connectDatabase = require('./config/database');
const http = require('http');
const cors = require('cors');
const express = require('express')
const bodyParser = require("body-parser");
app.use(express.urlencoded({ extended: true }));


const path = require('path');



// Serve avatar images from the avatars folder
app.use(express.static(path.join(__dirname, "public")));


//app.use(bodyParser.json());

const dotenv= require('dotenv');
dotenv.config({path : 'backend/config/config.env'});

app.use(fileUpload());

app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE, OPTIONS");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});

//app.use(cors({ origin: 'http://localhost:3000' }));
const allowedOrigins = ['http://localhost:3000'];
app.use(cors({
  origin: function(origin, callback) {
    // allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  }
}));

app.use((req, res, next) => {
    // Allow requests from any origin
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Set the allowed HTTP methods
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    // Set the allowed HTTP headers
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    // Allow cookies to be sent in cross-origin requests
    res.setHeader('Access-Control-Allow-Credentials', true);
    next();
  });

// Configuration env file

// Connection to Database
connectDatabase();

const server = app.listen(process.env.PORT,()=>{
    console.log(`Server started on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode.`)
})
app.use('/avatar', express.static('public/avatar'));

process.on('unhandledRejection',err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down, Unhandled Rejection');
    server.close(() =>{
        process.exit(1)
    })
})



process.on('uncaughtException',err =>{
    console.log(`ERROR: ${err.message}`);
    console.log('Shutting down,uncaught Exception ');
        process.exit(1)
    })

 


