var mongoose = require('mongoose'),
  Schema = mongoose.Schema;


var groupSchema = new Schema({
  name:{
    type: String
  },

  description:{
    type: String
  },

  users: {
    type: Array
  },

  admins:{
    type: Array
  }
});

module.exports = mongoose.model('Group', groupSchema);
