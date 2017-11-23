var express = require('express'),
    port = process.env.PORT||3000,
    app = express(),
    mongoose = require('mongoose'),
    User = require('./api/models/userModel'), //created model loading here
    bodyParser = require('body-parser');

// mongoose instance connection url connection
mongoose.Promise = global.Promise;
mongoose.connect('mongodb://localhost/FotoScoudDB');

var db = mongoose.connection;

app.use(stormpath.init(app, {
  // Optional configuration, see documentation
}));

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());


var routes = require('./api/routes/userRoute'); //importing route
routes(app); //register the route


app.listen(port);
console.log('server running on ' +port);


