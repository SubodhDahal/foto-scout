var express = require('express'),
  app = express(),
  router = express.Router(),
  multer = require('multer'),
  path = require('path'),
  port = process.env.PORT||3000,
  mongoose = require('mongoose'),
  bodyParser = require('body-parser'),
  jwt = require('jsonwebtoken'),
  cors = require('cors'),

  // Loading models
  Image = require('./api/models/ImageModel'),
  User = require('./api/models/userModel'),
  Group = require('./api/models/groupModel');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://localhost/FotoScoutDB');
var db = mongoose.connection;
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));
app.use(bodyParser.json());
app.use(cors());


/* Importing routes */
var routes = require('./api/routes/ImageRoute');
var routes1 = require('./api/routes/userRoute');
var routes2 = require('./api/routes/groupRoute');

routes(app);
routes1(app);
routes2(app);

app.listen(port);
console.log('Scout RESTful API server started on: ' + port);
