'use strict';

/**
 * Seed model data to database
 */

var mongoose = require('mongoose'),
  imageCategory = require('../models/ImageCategoryModel');

mongoose.connect('mongodb://localhost/FotoScoutDB');

var imageCategories = [{
    categoryName: 'Architecture'
  },
  {
    categoryName: 'Landscape'
  },
  {
    categoryName: 'Portrait'
  },
  {
    categoryName: 'Cityscape'
  }]

imageCategory.create(imageCategories, function(err, category) {
  console.log('Categories seeded to DB');
  process.exit(0);
});
