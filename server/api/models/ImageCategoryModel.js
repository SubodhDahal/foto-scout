'use strict';

var mongoose = require('mongoose');
var categorySchema = new mongoose.Schema({
  categoryName: {
    type: String,
    required: false,
    unique : true,
    dropDups: true
  }
});
module.exports = mongoose.model('category', categorySchema);
