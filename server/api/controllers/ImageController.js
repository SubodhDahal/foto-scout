'use strict';
var multer = require('multer');
var mongoose = require('mongoose');
exports.list_all_images = function(req, res) {
  Image.find({}, function(err, image) {
    if (err)
      res.send(err);
    res.json(image);
  });
};
exports.upload_an_image=function(req,res,next){
  // res.send(req.files);
  var imagepath = {};
  imagepath['userId']=1;
  imagepath['path'] = req.files[0].path;
  imagepath['originalname'] = req.files[0].originalname;
  var upload_image = new Image(imagepath);
  upload_image.save(function(err, user) {
    if (err)
      res.send(err);
    res.send('Image upload successfully');
  });
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
