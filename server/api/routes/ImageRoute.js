'use strict';
var multer = require('multer');

var storage = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './api/uploads/')
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

var upload = multer({
  storage: storage
});

module.exports = function(app) {
  var image = require('../controllers/ImageController');
  var image_category=require('../controllers/ImageCategoryController');

  // Search image results
  app.route('/images/search')
    .get(image.search_image_by_location);

  // Image Upload  Routes
  app.route('/iupload')
    .post(upload.any(),image.upload_an_image);

  app.route('/upload/:ImageId')
    .get(image.read_an_image)
    .put(image.update_an_image)
    .delete(image.delete_an_image);

  //Image category Routes
  app.route('/ImageCategory')
    .get(image_category.get_category)
    .post(image_category.create_category);
  app.route('/ImageCategory/:CategoryId')
    .put(image_category.update_category)
    .delete(image_category.delete_category)
    .get(image_category.read_category_by_id);
};
