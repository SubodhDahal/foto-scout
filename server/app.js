var express = require('express'),
  app = express(),
  router = express.Router(),
  multer = require('multer');
path=require('path'),
  port = process.env.PORT||3000,
  mongoose = require('mongoose'),
  Image = require('./api/models/ImageModel'),
  User = require('./api/models/userModel'), //created model loading here
  bodyParser = require('body-parser'),
  jwt = require("jsonwebtoken"),
  mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/FotoScoutDB');
var db = mongoose.connection;
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(function(req, res, next){
  if(req.headers && req.headers.authorization && req.headers.authorization.split('')[0] === 'JWT'){
    jwt.verify(req.headers.authorization.split('')[1], 'RESTFULAPIS', function(err, decode){
      req.user = decode;
      next();
    });
  }else{
    req.user = undefined;
    next();
  }
});
var routes = require('./api/routes/ImageRoute'); //importing route
var routes1 = require('./api/routes/userRoute');
routes(app);
routes1(app);
//app.use('/', routes);
app.listen(port);
console.log('Scout RESTful API server started on: ' + port);



