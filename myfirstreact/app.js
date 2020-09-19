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
  email : String,
  name : String,
  password : String,
  password_2 : String,
  mobil : String,
  shahr : String,
  jensiat : String,
  tavalod : String
}) ;
var InputModel = mongoose.model("User" , userSchema ) ;

const Schema2 = mongoose.Schema;
var oneSchema = new Schema2({
   mozo : String ,
   matn : String
}) ;
var OneModel = mongoose.model("One" , oneSchema ) ;

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
app.post('/worod-p', function (req, res, next) {
  var formData = req.body;
  var email = formData.email
  var name = formData.name
  var password = formData.password
  var password_2 = formData.password_2
  var mobil = formData.mobil
  var shahr = formData.shahr
  var jensiat = formData.jensiat
  var tavalod = formData.tavalod

if(email.length && name.length && password_2.length && password.length
  && mobil.length && shahr.length && jensiat.length && tavalod.length) {
    if(password.length >=8 && password_2.length >=8){
      if(password === password_2){
        InputModel.find({email}, function (err, docs) {
          if (err) {throw err}
          else if(docs.length){
              res.send('ایمیل قبلا وارد شده')
          }else{
            var newUser = new InputModel({
              email : formData.email,
              name : formData.name,
              password : formData.password,
              password_2 : formData.password_2,
              mobil : formData.mobil,
              shahr : formData.shahr,
              jensiat : formData.jensiat,
              tavalod : formData.tavalod
            });
            newUser.save() ;
            console.log(newUser);
            console.log('sabte name ba mofaghiat anjam shod');
            res.send('ثبت نام با موفقیت انجام شد');
            //res.sendFile(__dirname + '/views/new_aghahi.html')
          }
          
        });
      }else{
        res.send('پسورد با تکرار آن مطابقت ندارد')
      }
     
    }else{
      res.send('پسورد باید 8 رقم یا بیشتر باشد')
    }

}else{
  res.send('لطفا همه موارد را کامل کنید');
  }
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
app.post('/login-2', function (req, res, next) {
  console.log(req.body);
  var formData_2 = req.body;
  var email = formData_2.email;
  var password = formData_2.password;
  if(email.length && password.length){
    InputModel.find({email , password}, function (err, docs) {
      if(docs.length){
        res.send('خوش آمدید')
      }else{
          res.send('پسورد یا ایمیل اشتباه است')
      }
    })
     
  }else{
    res.send('لطفا ایمیل و پسورد خود را وارد کنید');
  }
  
});
app.post('/darg', function (req, res, next) {
  console.log(req.body);
  var formData_3 = req.body;
  var mozo = formData_3.mozo;
  var matn = formData_3.matn;
  if(mozo.length && matn.length){
    var Aghahi = new OneModel({
      mozo : formData_3.mozo,
      matn : formData_3.matn
    });
    Aghahi.save() ;
    console.log(Aghahi);
    res.send('آگهی شما ثبت گردید و پس از تایید منتشر خواهد شد');
     
  }else{
    res.send('لطفا همه موارد را کامل کنید');
  }
});
app.post('/new-1', function(req, res) {
  OneModel.find({}, function(err, result) {
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