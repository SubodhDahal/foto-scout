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

  // Image Upload  Routes
  app.route('/upload')
    .get(image.list_all_images)
    .post(upload.any(),image.upload_an_image);

  app.route('/upload/:ImageId')
    .get(image.read_an_image)
    .put(image.update_an_image)
    .delete(image.delete_an_image);

  // Search image results
  app.route('/images/search/:latitude/:longitude/:radius')
    .get(image.search_image_by_location);
};
