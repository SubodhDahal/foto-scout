var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var chatSchema = new Schema({

  msg: String,
  created: {type: Date, default: Date.now}

});

mongoose.model('Chat',chatSchema);
