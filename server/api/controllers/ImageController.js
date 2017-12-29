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

/*exports.search_image_by_location = function(req, res) {
  // Image.findOne({$match:{ $and: [ { GPSLatitude:req.params.latitude},{ GPSLongitude:req.params.longitude}]}},
  Image.find({ $and:[{GPSLatitude: req.params.latitude},{GPSLongitude:req.params.longitude}]}, function (err, location) {
    if (err) throw err;
    res.json(location);
  })
};*/


//db.neighborhoods.findOne({ geometry: { $geoIntersects: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] } } } })

//var METERS_PER_MILE = 1609.34
//db.restaurants.find({ location: { $nearSphere: { $geometry: { type: "Point", coordinates: [ -73.93414657, 40.82302903 ] }, $maxDistance: 5 * METERS_PER_MILE } } })
exports.search_image_by_location = function(req, res) {
  Image.aggregate([
    { "$geoNear": {
      "near": {
        "type": "Point",
        "location": [40.093699, 32.074673 ]
      },
      "maxDistance": 500 * 1609,
      "spherical": true,
      "distanceField": "distance",
      "distanceMultiplier": 0.000621371
    }}
  ],function (err,image) {
    if(err)
      throw err;
    res.json(image);
  })
};
