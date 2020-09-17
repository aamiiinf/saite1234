const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session') ;
const app = express() ;
const path = require('path');

mongoose.connect("mongodb://localhost/myTest") ;

const Schema = mongoose.Schema;
var userSchema = new Schema({
    username : String ,
    password : Number
}) ;
var InputModel = mongoose.model("User" , userSchema ) ;

// const Schema2 = mongoose.Schema;
// var oneSchema = new Schema2({
//    onevane : String 
// }) ;
// var OneModel = mongoose.model("One" , oneSchema ) ;

app.set('views', path.join(__dirname, '/views'));
// app.set('view engine', 'html');
app.use(morgan('common')) ;
app.use(express.static(path.join(__dirname, '/public')));
app.use(bodyParser.json()) ;
app.use(bodyParser.urlencoded({ extended:false})) ;
app.use(session({
	cookie: { maxAge: 60000 },
    secret : "secret",
    resave : false,
    saveUninitialized : false
})) ;

app.get('/', function (req, res, next) {
    console.log('join to main page');
    res.sendFile(path.join(__dirname + '/views/index.html'));
});
app.get('/worod', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/views/worod.html'));
    console.log('Page redirected to page worod.html');
});
app.post('/login', function (req, res, next) {
	var formData = req.body;
	var username = formData.username;
	var password = formData.password;
    
    var newUser = new InputModel({
    	username : formData.username , 
    	password : formData.password

    });
    newUser.save() ;
    console.log(newUser);
});

app.get('/modir', function (req, res, next) {
    res.sendFile(path.join(__dirname + '/views/panel-modiriat/index.html'));
    console.log('Page redirected to page panel modiriat');
});
app.get('/new_aghahi', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/views/new_aghahi.html'));
  console.log('Page redirected to page new aghahi...');
});
app.get('/login', function (req, res, next) {
  res.sendFile(path.join(__dirname + '/views/login.html'));
  console.log('Page redirected to page login...');
});
app.get('/tedad', function (req, res, next) {
    InputModel.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
          console.log(result)
        }
      });
});
app.post('/mongos', function (req, res, next) {
    InputModel.find({}, function(err, result) {
        if (err) {
          res.send(err);
        } else {
          res.send(result);
          console.log(result)
        }
      });
});

app.listen(3000);
console.log("app running at port 3000") ;