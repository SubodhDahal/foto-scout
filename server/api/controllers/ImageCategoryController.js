'use strict';
var mongoose = require('mongoose'),
  ImageCategory = mongoose.model('category');
//get all Image Category
exports.get_category = function(req, res) {
  ImageCategory.find({}, function(err, category) {
    if (err)
      res.status(400).send(err);
    res.json({
      status: 'success',
      imageCategories: category
    });
  });
};

//Create new category
exports.create_category=function(req,res,next){
  var new_category = new ImageCategory(req.body);
  new_category.save(function (err, category) {
    if (err)
      res.status(400).send(err);
    res.json(category);
    //  res.send('Image upload successfully');
  });
};
//Update Category
exports.update_category = function(req, res) {
  ImageCategory.update({_id: req.params.CategoryId},{$set: {categoryName:req.body.categoryName}},(err, category) => {
    if (err)
      res.status(400).send(err);
    res.json("Category Updated successfully");
  });
};
//delete category
exports.delete_category = function(req, res) {
  ImageCategory.remove({
    _id: req.params.CategoryId
  }, function(err, category) {
    if (err)
      res.status(400).send(err);
    res.json({success: 'true', message: 'Successfully Deleted Category'});
  });
};

//Get Image Category By ID
exports.read_category_by_id = function(req, res) {
  ImageCategory.findById(req.params.CategoryId, function(err, category) {
    if (err)
      res.status(400).send(err);
    res.json(category);
  });
};
