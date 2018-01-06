var mongoose = require('mongoose');
var Schema = mongoose.Schema;
//connect to mongodb
mongoose.connect('mongodb://localhost/FotoScoutDB');

mongoose.connection.on('open', function (ref) {
  console.log('Connected to mongo server.');
});
mongoose.connection.on('error', function (err) {
  console.log('Could not connect to mongo server!');
  console.log(err);
});
