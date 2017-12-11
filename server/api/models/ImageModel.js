'use strict';

var mongoose = require('mongoose');
var imageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: true,
    trim: true
  },
  originalname: {
    type: String,
    required: true
  },
  userId:{
    type:Number,
    required:false
  },
  metadata:
    {
      type: Object,
      required: true
    }

});
module.exports = mongoose.model('ImageUpload', imageSchema);
