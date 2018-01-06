'use strict';
var multer = require('multer');
var crypto=require("crypto");

var upload = multer({ storage: storage });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/uploads/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      //cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      cb(null, raw.toString('hex') + Date.now() + '.' + "jpg");
    });
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

  app.route('/images/my')
    .get(image.get_users_images);

  // Image Upload  Routes
  app.route('/upload')
    .get(image.list_all_images)
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

  //image like
  app.route('/imageLike/:id/:action')
    .put(image.update_image_like_couter);

  //image comment
 app.route('/imageComment/:imageId/:userId')
    .put(image.update_comment)
};
