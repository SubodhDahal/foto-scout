'use strict';
var multer = require('multer'),
  mongoose = require('mongoose'),
  Image = mongoose.model('ImageUpload'),
  User = mongoose.model('User'),
  dateFormat = require('dateformat'),
  ExifImage = require('exif').ExifImage,
  {validator,check,validationResult} = require('express-validator/check'),
  {getUserByToken} = require('../common/users');

/**
 * Get current date
 * @return {String}
 */
function getCurrentDate()
{
  var now = new Date();
  return dateFormat(now, "isoDateTime")
}

/**
 * Search an image within certain radius of an location
 * @param  {Object} req
 * @param  {Object} res
 * @return {Object}
 */
//search image by location
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

  var searchParameters = {
    location: {
      $geoWithin: {
        $centerSphere: centerSphere
      }
    }
  }

  var categories = req.query.categories ? req.query.categories : null;

  // search by category only if categories are specified
  // or all is not selected as a category
  if (categories
    && req.query.categories.indexOf('0') === -1) {
    searchParameters.category = {
      $in: req.query.categories
    }
  }

  return Image.find(searchParameters)
    .exec(function(err, images) {
      if (err) {
        return res.status(500)
                  .json(err);
      }

      var response = {
        status: 'success',
        images: images
      }

      return res.status(200)
                .json(response);
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
    image: 'public/uploads/' + imagename
  }, function (error, exifData) {
    if (error && error.code !== 'NO_EXIF_SEGMENT' && error.code !=='NOT_A_JPEG') {
      errorCallback(error);
      return;
    }

    console.log('exifData', exifData)

    callback(exifData)
  });
}

//generate unique image code
function generateUniqueImageId()
{
  var randtoken = require('rand-token').generator({
    string: ''
  });
  var token = randtoken.generate(16);
  return token;
}

// Image Upload
exports.upload_an_image = function (req,res,next) {
  if (req.files.length == 0) {
    return res.status(400).json({
      status: 'error',
      message: 'No image specified'
    })
  }

  var token = req.header('x-auth'),
    file = req.files[0],
    imageName = file.filename,
    filePath = file.path.replace("public\\", "").replace('public/', ''),   // remove public\ from filepath
    uniqueImageId = generateUniqueImageId(); // generate unique image code

  try {
    getUserByToken(token).then((user) => {
      if (!user) {
        return Promise.reject();
      }

      extractExifData(imageName, function (exifData) {
        var insertObj = {
          path: filePath,
          originalname: imageName,
          description: req.body.description,
          category:req.body.category,

          userId: user._id,

          likes: [],
          comments:[
            {
              userId:"1",
              imageId:uniqueImageId,//generate unique image code
              text:"",
              date: getCurrentDate()
            }
          ]
        }

        if (req.body.latitude !== '') {
          insertObj.location = {
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
            res.status(400).send(err);

          res.json({
            success: 'true',
            message: 'Image uploaded successfully'
          });
        });
      }, function(error) {
        res.status(400).json({
          status: 'error',
          message: error.message
        });
      });
    })
    .catch((error) => {
      res.status(400).json({
        status: 'error',
        message: error.message
      });
    });

  } catch (error) {
    res.status(400).json({
      status: 'error',
      message: error.message
    });
  }
};

//Update an image by id
exports.update_an_image = function(req, res) {
  var updateData = {
    description: req.body.description,
    category: req.body.category,
  }

  if (req.body.latitude && req.body.longitude) {
    updateData['location'] = {
      coordinates: [
        parseFloat(req.body.longitude),
        parseFloat(req.body.latitude),
      ],
      type: 'Point'
    }
  }

  Image.update({_id: req.params.ImageId},
    {
      $set: updateData
    },(err, image) => {
      if (err)
        res.status(400).send(err)

      res.json({
          success: true,
          message: 'Image updated successfully'
        });
    });
};

//Delete an image by id
exports.delete_an_image = function(req, res) {
  var token = req.header('x-auth');

  getUserByToken(token).then((user) => {
    Image.remove({
      _id: req.params.ImageId
    }, function(err, image) {
      if (err)
        res.status(400).send(err);
      res.json({success: 'true', message: 'Image successfully deleted'});
    });
  })
};

// Get an image by Id
exports.read_an_image = function(req, res) {
  Image.findById(req.params.ImageId, function(err, image) {
    if (err)
      res.status(400).send(err);
    res.json(image);
  });
};

//Get All Images list
exports.list_all_images = function(req, res) {
  Image.find({}, function(err, image) {
    if (err)
      res.status(400).send(err);
    res.json(image);
  });
};

/**
 * Get all images uploaded by current user
 * @param  {Object} req
 * @param  {Object} res
 */
exports.get_users_images = function(req, res) {
  var token = req.header('x-auth');

  getUserByToken(token)
    .then((user) => {
      Image.find({
        userId: user._id
      }, function(err, images) {
        if (err)
          res.status(400).send(err);

        res.json({
          images
        });
      });
    })
    .catch(({message}) => {
      res.status(400).send({
        status: 'error',
        message
      })
    });
}

/**
 * Like/dislike an image
 * @param  {[type]}   req  [description]
 * @param  {[type]}   res  [description]
 * @param  {Function} next [description]
 * @return {[type]}        [description]
 */
exports.update_image_like_couter = function(req,res,next) {
  var token = req.header('x-auth');

  getUserByToken(token)
    .then((user) => {
      if (req.params.action === 'like') {
        var parameters = {
          $addToSet: {
            'likes': user._id
          }
        }
      } else {
        var parameters = {
          $pull: {
            'likes': user._id
          }
        }
      }

      Image.findByIdAndUpdate(
        req.params.id,
        parameters,
        {new: true},
        function (err, group) {
          if (err)
            res.status(400).send(err);

          res.json({
            message: 'Like successfully updated to image'
          });
        });
    })
    .catch((error) => {
      console.log('ERROR', error)
    });
};

//Image comment
exports.update_comment = function(req, res) {
  Image.update({"comments.imageId": req.params.imageId}
      , {
      $push: {
        comments: {
          $each: [{date: getCurrentDate(), text: req.body.comment,imageId:req.params.imageId,userId:req.params.userId}]
        }
      }
    }
    ,(err, image) => {
      if (err)
        res.status(400).send(err)
      res.json({success: 'true', message: 'Comment Updated successfully'});
    });
};
