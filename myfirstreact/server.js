const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session') ;
const app = express() ;
const path = require('path');

mongoose.connect("mongodb://localhost/niazrooz") ;

const Schema = mongoose.Schema;
var userSchema = new Schema({
   username : String ,
   password : String
}) ;
var niazrooz = mongoose.model("User" , userSchema ) ;

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
    res.sendFile(__dirname + '/public/html/worod.html');
    console.log('Page redirected to page worod.html');
});
app.post('/login', function (req, res, next) {
    console.log(req.body);
    var formData = req.body;
    var password = formData.password;
    var username = formData.username;
    if (password.length && username.length) {
        if (password.length >= 4) {
         niazrooz.find({username}, function (err, docs) {
             if (err) {throw err}
             else if(docs.length){
                 res.json({msg :'user ghablan sabt shode'})
             }else{
                 var newUser = new niazrooz({
                     password : formData.password ,
                     username : formData.username
                 }) ;
                 newUser.save() ;
                 console.log(newUser);
                res.json({msg : 'sabte nam ba mofaghiat anjam shod'});
                res.sendFile(__dirname + '/public/html/darg.html');
             }
           });
        }else{
            res.json({msg : 'password bayad 4 ta bashad'})
        }
    }else{
        res.json({msg :'lotfan hame mavared ra kamel konid'})
    } 
});
app.post('/darg', function(req, res){
    console.log(req.body);
    
});

app.listen(3000);
console.log("app running at port 3000") ;