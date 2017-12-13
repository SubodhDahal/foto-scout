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
  exports.upload_an_image=function(req,res,next){
    var imagename=req.files[0].originalname;
    try {
      new ExifImage({ image :'api/uploads/'+imagename}, function (error, exifData) {
        var generated_exifDate=exifData;
        var insertObj={};
        insertObj['path']=req.files[0].path;
        insertObj['originalname']=imagename;
        insertObj['userId']=1;
        insertObj['metadata']=generated_exifDate;
        if (error)
          res.send('Error: '+error.message);
        else
          var upload_image = new Image(insertObj);
        upload_image.save(function(err, image) {
          if (err)
            res.send(err);
          res.send('Image upload successfully');
        });

      });
    } catch (error) {
      res.send('Error: ' + error.message);
    }
};
exports.read_an_image = function(req, res) {
  Image.findById(req.params.ImageId, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};


exports.update_an_image = function(req, res) {
  Image.findOneAndUpdate({_id: req.params.ImageId}, req.body, {new: true}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};


exports.delete_an_image = function(req, res) {


  Image.remove({
    _id: req.params.ImageId
  }, function(err, image) {
    if (err)
      res.send(err);
    res.json({ message: 'Image successfully deleted' });
  });
};
