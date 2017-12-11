var express = require('express'),
app = express();
var router = express.Router();
var multer = require('multer');
path=require('path');
port = process.env.PORT || 3000,
mongoose = require('mongoose'),
Image = require('./api/models/ImageModel'),
  User = require('./api/models/userModel'),
  bodyParser = require('body-parser');
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/FotoScoudDB');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
var routes = require('./api/routes/ImageRoute'); //importing route
var routes1 = require('./api/routes/userRoute');
routes(app);
routes1(app);
//app.use('/', routes);
app.listen(port);
console.log('Scout RESTful API server started on: ' + port);

