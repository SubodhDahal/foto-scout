'use strict';

var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: false
  }
});
module.exports = mongoose.model('category', categorySchema);
