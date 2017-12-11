var express = require('express'),
    port = process.env.PORT||3000,
    app = express(),
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'), //created model loading here
    jwt = require("jsonwebtoken"),
    bodyParser = require('body-parser');

// mongoose instance connection url connection
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


var routes = require('./api/routes/userRoute'); //importing route
routes(app); //register the route


app.listen(port);
console.log('server running on ' +port);


