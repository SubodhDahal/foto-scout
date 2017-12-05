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
  var imageList = require('../controllers/ImageUploadController');

  // Image Upload  Routes
  app.route('/upload')
    .get(imageList.list_all_images)
    .post(upload.any(),imageList.upload_an_image);


  app.route('/upload/:ImageId')
    .get(imageList.read_an_image)
    .put(imageList.update_an_image)
    .delete(imageList.delete_an_image);

};
