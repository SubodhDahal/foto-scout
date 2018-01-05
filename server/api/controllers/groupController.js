'use strict';

var mongoose = require('mongoose'),
  group = mongoose.model('Group');

// create group
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
exports.list_all_group = function (req, res) {
  group.find({}, function (err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};


//add user
exports.add_user_to_group = function (req, res) {
  group.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      'users': req.body.user_id
    }
  }, {new: true}, function (err, group) {
    if (err) res.send(err);

    res.json({
      message: 'User successfully added to group',
      group: group
    });
  });
};

//delete user
exports.delete_user_from_group = function (req, res) {
  group.findByIdAndUpdate(req.params.id, {
    $pull: {
      'users': req.body.user_id
    }
  }, {new: true}, function (err, group) {
    if (err) res.send(err);

    res.json({
      message: 'User successfully deleted from group',
      group: group
    });
  });
};

//add admin to the group
exports.add_admin_to_group = function (req, res) {
  group.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      'admins': req.body.user_id
    }
  }, {new: true}, function (err, group) {
    if (err) res.send(err);

    res.json({
      message: 'admin successfully added to group',
      group: group
    });
  });
};

//delete admin from group
exports.delete_admin_from_group = function (req, res) {
  group.findByIdAndUpdate(req.params.id, {
    $pull: {
      'admins': req.body.user_id
    }
  }, {new: true}, function (err, group) {
    if (err) res.send(err);

    res.json({
      message: 'admin successfully deleted from  group',
      group: group
    });
  });
};
