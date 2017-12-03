'use strict';
module.exports = function(app) {
    var imageList = require('../controllers/ImageUploadController');

    // Image Upload  Routes
    app.route('/images')
        .get(imageList.list_all_images)
        .post(imageList.upload_an_image);


    app.route('/images/:ImageId')
        .get(imageList.read_an_image)
        .put(imageList.update_an_image)
        .delete(imageList.delete_an_image);
};
