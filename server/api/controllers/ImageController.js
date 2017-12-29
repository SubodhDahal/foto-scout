'use strict';
var multer = require('multer');
var mongoose = require('mongoose');
var ExifImage = require('exif').ExifImage;

/**
 * Search an image within certain radius of an location
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object}
 */
exports.search_image_by_location = function(req, res) {
  var latitude = req.query.latitude,
    longitude = req.query.longitude,
    maxDistance = req.query.radius,
    EARTH_RADIUS = 6384;  // radius of the earth in kilometers

  // The maximum distance we want to search in kim
  maxDistance /= EARTH_RADIUS;

  // The center and the size of the sphere from which we want to search
  var centerSphere = [[
                      parseFloat(longitude),
                      parseFloat(latitude)
                    ], maxDistance];

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
      insertObj = {
        path: filePath,
        originalname: imagename,
        description: req.body.description,
        userId: 1,
        location: {
          coordinates: [
            parseFloat(req.body.longitude),
            parseFloat(req.body.latitude),
          ],
          type: 'Point'
        }
      }

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
