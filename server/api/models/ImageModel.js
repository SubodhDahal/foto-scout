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
  description: {
    type: String,
    required: false,
    validate: descriptionValidator
  },
  userId: {
    type: String,
  },
  location: {
    type: Object
  },
  metadata: {
    type: Object,
    required: false
  },
  category:{
    type: Array,
    required:false
  },
  likes:{
    type: Array
  },
  comments:{
    type:Object
  }

});
module.exports = mongoose.model('ImageUpload', imageSchema);
