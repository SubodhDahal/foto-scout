
var express = require('express'),
    app = express();
var router = express.Router();
var multer = require('multer');
    port = process.env.PORT || 3000,
    mongoose = require('mongoose'),
    Image = require('./api/models/ImageUploadModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/FotoScoudDB');

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ImageUploadRoute'); //importing route
routes(app); //register the route
app.listen(port);
console.log('Image Upload RESTful API server started on: ' + port);


// var express = require('express');
// var app = express();
// var bodyParser = require('body-parser');
// var mongoose = require('mongoose');
// var path = require('path');
// app.use(bodyParser.json());
//
// //To get the access for the functions defined in index.js class
// var routes = require('./api/routes/ImageUploadRoute');
//
// // connect to mongo,
// //i have created mongo collection in flickimange db. the below is my database access url..
// //So make sure you give your connection details..
// mongoose.connect("mongodb://localhost:27017/FotoScoutDB");
//
// app.use('/', routes);
//
// //URL : http://localhost:3000/images/
// // To get all the images/files stored in MongoDB

//app.listen(3000);

//console.log('Running on port 3000');
