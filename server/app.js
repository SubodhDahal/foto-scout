var express = require('express'),
    port = process.env.PORT||3000,
    app = express(),
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'), //created model loading here
    jwt = require("jsonwebtoken"),
    Image = require('./api/models/ImageModel'),
    bodyParser = require('body-parser'),
    path = require('path'),
    router = express.Router(),
    multer = require('multer');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/FotoScoutDB');

var db = mongoose.connection;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/ImageRoute'); //importing route
var routes1 = require('./api/routes/userRoute');

routes(app);
routes1(app);


//app.use('/', routes);
app.listen(port);
console.log('Scout RESTful API server started on: ' + port);

