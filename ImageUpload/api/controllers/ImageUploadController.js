'use strict';


var mongoose = require('mongoose'),
    Image = mongoose.model('ImageUpload');

exports.list_all_images = function(req, res) {
    Image.find({}, function(err, image) {
        if (err)
            res.send(err);
        res.json(image);
    });
};




exports.upload_an_image = function(req, res) {
    var new_image = new Image(req.body);
    new_image.save(function(err, image) {
        if (err)
            res.send(err);
        res.json(image);
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