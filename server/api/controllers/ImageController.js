'use strict';
var multer = require('multer');
var mongoose = require('mongoose');
var ExifImage = require('exif').ExifImage;

exports.list_all_images = function(req, res) {
  Image.find({}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};

/**
 * Extract EXIF data from image
 * @param  {String}   imagename
 * @param  {Function} callback
 * @param  {Function}   errorCallback
 */
function extractExifData (imagename, callback, errorCallback) {
  new ExifImage({
    image: 'api/uploads/' + imagename
  }, function (error, exifData) {
    if (error && error.code !== 'NO_EXIF_SEGMENT') {
      errorCallback(error);
      return;
    }

    callback(exifData)
  });
}

exports.upload_an_image = function (req,res,next) {
  var file = req.files[0],
    imagename = file.originalname,
    filePath = file.path;

  try {
    var insertObj = {};

    extractExifData(imagename, function (exifData) {
      insertObj['path'] = filePath;
      insertObj['originalname'] = imagename;
      insertObj['description'] = req.body.description;
      insertObj['userId'] = 1;
      insertObj['GPSLatitude'] = req.body.latitude;
      insertObj['GPSLongitude'] = req.body.longitude;

      var upload_image = new Image(insertObj);
      upload_image.save(function (err, image) {
        if (err)
          res.send(err);

        res.json({
          success: 'true',
          message: 'Image uploaded successfully'
        });
      });
    }, function(error) {
      res.json({
        status: 'error',
        message: error.message
      });
    })
  } catch (error) {
    res.json({
      status: 'error',
      message: error.message
    });
  }
};



/*exports.update_an_image = function(req, res) {
  Image.findOneAndUpdate({_id: req.params.ImageId}, req.body, {new: true}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};*/
exports.update_an_image = function(req, res) {
  Image.update({_id: req.params.ImageId},{$set: {description:req.body.description}},(err, image) => {
    // updating that event
    if (err)
      res.send(err);
    res.json("Image Updated successfully");
  });
};

exports.delete_an_image = function(req, res) {
  Image.remove({
    _id: req.params.ImageId
  }, function(err, image) {
    if (err)
      res.send(err);
    res.json({success: 'true', message: 'Successfully Updated Image'});
    // res.json({ message: 'Image successfully deleted' });
  });
};

exports.read_an_image = function(req, res) {
  Image.findById(req.params.ImageId, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};

/**
 * Search an image within certain radius of an location
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object}
 */
exports.search_image_by_location = function(req, res) {
  var latitude = req.params.latitude,
    longitude = req.params.longitude,
    maxDistance = req.params.radius,
    EARTH_RADIUS = 6384;  // radius of the earth in kilometers

  maxDistance /= EARTH_RADIUS;

  var centerSphere = [[ -73, 40 ], maxDistance ];

  return Image.find({
    location: {
      $geoWithin: {
        $centerSphere: centerSphere
      }
    }}).limit(10).exec(function(err, locations) {
      if (err) {
        return res.status(500)
                  .json(err);
      }

      return res.status(200)
                .json(locations);
    });
};
