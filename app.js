const express = require('express');
const dotenv  = require('dotenv');
const cookieParser = require('cookie-parser')

const App = express();


// Getting Config File
dotenv.config( { path : './config.env' } )


App.use(express.json());


App.use(cookieParser());


// Routing 
App.use(require('./router/router.js'))


// Defining the Port
const port = process.env.PORT || 5000 ;

if(process.env.NODE_ENV == "production"){
    
    app.use(express.static('clientside/build'));

}


// Listening
App.listen(port , ()=>{
    console.log(`Server is Listening at port : ${port}`);
})