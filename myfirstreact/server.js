const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
//const mongoose = require('mongoose');
const session = require('express-session') ;
const app = express() ;
const path = require('path');

// mongoose.connect("mongodb://localhost/chat113") ;

// const Schema = mongoose.Schema;
// var userSchema = new Schema({
//     username : String ,
//     password : String
// }) ;
// var snapModel543 = mongoose.model("User" , userSchema ) ;

app.use(morgan('common')) ;
app.use(express.static(path.join(__dirname, 'public')))
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended:true })) ;
app.use(session({
	cookie: { maxAge: 60000 },
    secret : "secret",
    resave : false,
    saveUninitialized : true
})) ;

app.get('/', function (req, res, next) {
    res.sendFile(__dirname + '/public/index.html');
});
app.get('/worod', function (req, res, next) {
    res.sendFile(__dirname + '/html/worod.html');
    console.log('Page redirected to page worod.html');
});
app.get('/sand', function () {
    res.sendFile(__dirname + '/public/index.html');
})

app.listen(3000);
console.log("app running on port 3000") ;