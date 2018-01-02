'use strict';

var mongoose = require('mongoose');
const validate = require('mongoose-validator');

const descriptionValidator = [
  validate({
    validator: 'isLength',
    arguments: [0, 100],
    message: 'Name must not exceed {ARGS[1]} characters.'
  })
];


var imageSchema = new mongoose.Schema({
  path: {
    type: String,
    required: [true, 'Path is required.'],
  },
  originalname: {
    type: String,
    required: true
  },
  userId:{
    type:Number,
    required:false
  },
  description: {
    type: String,
    required: false,
    validate: descriptionValidator
  },
  GPSLatitude:{
    type:String,
    required:false
  },
  GPSLongitude:{
    type:String,
    required:false
  },
  location:{
    type:Object
  },
  metadata:
    {
      type: Object,
      required: false
    },
  imageCategoryId:{
    type: String,
    required:false
  }

});
module.exports = mongoose.model('ImageUpload', imageSchema);
