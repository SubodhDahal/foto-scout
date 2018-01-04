'use strict';

var mongoose = require('mongoose'),
  group = mongoose.model('Group'),

  //create group
exports.create_a_group = function (req, res) {
  var new_group = new group(req.body);
  new_group.save(function (err, group) {
    if (err)
      res.send(err);
    res.json({success: 'true', message: 'group created'});
  });
};

// read group
exports.read_group = function (req, res) {
  group.findById({
    _id: req.params.id
  }, function (err, group) {
    if (err)
      res.send(err);
    res.json(group);
  })
};

// update group
exports.update_group = function (req, res) {
  group.findByIdAndUpdate(req.params.id, {
    $set: {
      name: req.body.name,
      description: req.body.description
    }
  }, {new: false}, function (err, group) {
    if (err) res.send(err);

    res.send({
      message: 'Group updated successfully',
      group: group
    });
  });
};

// delete group
exports.delete_group = function (req, res) {
  group.remove({
    _id: req.params.id
  }, function (err, group) {
    if (err)
      res.send(err);
    res.json({success: 'true', message: 'Successfully deleted group'});
    // res.json({ message: 'group successfully deleted' });
  });
};

//Get All group list
exports.list_all_group = function(req, res) {
  group.find({}, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};


//add user
 exports.add_user = function (req, res) {
  var add_user = new user({
    name: 'req.params.id'
  });

    add_user.save().then(function(){
      add_user.findOne({name: 'req params.id'}).then (function(record)){
        assert(record.add_user.length === 1);
        done();
      });
    });
};






