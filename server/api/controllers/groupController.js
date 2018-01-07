'use strict';

var mongoose = require('mongoose'),
  group = mongoose.model('Group'),
  User = mongoose.model('User'),
  {getUserByToken} = require('../common/users');

// create group
exports.create_a_group = function (req, res) {
  var new_group = new group(req.body),
    token = req.header('x-auth');

  getUserByToken(token)
    .then((user) => {
      new_group.admins = [user._id];

      new_group.save(function (err, group) {
        if (err)
          res.status(400).send(err);
        res.json({success: 'true', message: 'Group created'});
      });
    })
    .catch(({message}) => {
      res.status(400).send({
        status: 'error',
        message
      })
    })
};

// read group
exports.read_group = function (req, res) {
  group.findById({
    _id: req.params.id
  }, function (err, group) {
    if (err)
      res.status(400).send(err);

    res.json({
      status: 'success',
      group
    });
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
    if (err) res.status(400).send(err);

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
      res.status(400).send(err);
    res.json({success: 'true', message: 'Successfully deleted group'});
    // res.json({ message: 'group successfully deleted' });
  });
};

//Get All group list
exports.list_all_group = function (req, res) {
  group.find({}, function (err, group) {
    if (err)
      res.status(400).send(err);
    res.json(group);
  });
};


//add user
exports.add_user_to_group = function (req, res) {
  let token = req.header('x-auth');

  getUserByToken(token)
    .then((user) => {
      group.findByIdAndUpdate(req.params.id, {
        $addToSet: {
          'users': user._id
        }
      }, {new: true}, function (err, group) {
        if (err) res.status(400).send(err);

        res.json({
          message: 'User successfully added to group',
          group: group
        });
      });
    })
    .catch(({message}) => {
      res.status(400).send({
        status: 'error',
        message
      })
    })
};

//delete user
exports.delete_user_from_group = function (req, res) {
  let token = req.header('x-auth');

  getUserByToken(token)
    .then((user) => {
      group.findByIdAndUpdate(req.params.id, {
        $pull: {
          'users': user._id
        }
      }, {new: true}, function (err, group) {
        if (err) res.status(400).send(err);

        res.json({
          message: 'User successfully deleted from group',
          group: group
        });
      });
    })
    .catch(({message}) => {
      res.status(400).send({
        status: 'error',
        message
      })
    })
};

//add admin to the group
exports.add_admin_to_group = function (req, res) {
  group.findByIdAndUpdate(req.params.id, {
    $addToSet: {
      'admins': req.body.user_id
    }
  }, {new: true}, function (err, group) {
    if (err) res.status(400).send(err);

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
    if (err) res.status(400).send(err);

    res.json({
      message: 'admin successfully deleted from  group',
      group: group
    });
  });
};
