'use strict';
var multer = require('multer');
var mongoose = require('mongoose'),
    Image = mongoose.model('ImageUpload');

var storage = multer.diskStorage({
    destination: function (req, file, callback) {
        callback(null, './api/uploads');
    },
    filename: function (req, file, callback) {
        callback(null, file.fieldname + '-' + Date.now());
    }
});
var upload = multer({storage: storage}).single('userPhoto');
exports.list_all_images = function(req, res) {
    Image.find({}, function(err, image) {
        if (err)
            res.send(err);
        res.json(image);
    });
};

// To get more info about 'multer'.. you can go through https://www.npmjs.com/package/multer..
exports.upload_an_image =function(req, res) {
     upload(req,res,function(err) {
        //console.log(req.body);
        //console.log(req.files);
        if(err) {
            return res.end("Error uploading file.");
        }
        res.end("File is uploaded");
    })
        //var path = req.file.path;
        var imageName = req.file.originalname;

        var imagepath = 'kkkkk';
        imagepath['originalname'] = imageName;
        //Image.create(imagepath);
        Image.create(function (err, imagepath) {
            if (err)
                res.send(err);
            res.json(imagepath);
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