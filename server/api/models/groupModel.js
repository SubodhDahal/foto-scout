var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var groupSchema = new Schema({
  name:{
    type: String
  },

  description:{
    type: String
  },

});

module.exports = mongoose.model('Group', groupSchema);

