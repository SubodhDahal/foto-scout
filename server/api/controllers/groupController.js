'use strict';

var mongoose = require('mongoose'),
  group = mongoose.model('Group');

exports.create_a_group = function(req, res){
  var new_group = new group(req.body);
  new_group.save(function(err,group) {
    if (err)
      res.send(err);
    res.json({success: 'true', message: 'group created'});
  });
};

exports.read_group = function(req, res) {
  group.findById(req.params.Id, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};

/*exports.update_group = function(req, res){
  group.findOneAndUpdate({_id: req.params.id}, req.body, {new: true}, function(err, group) {
    if (err)
      res.send(err);
    res.json(group);
  });
};

exports.delete_group = function(req, res) {
  group.remove({_id: req.params.Id}, function(err, group) {
    if (err)
      res.send(err);
    res.json({success: 'true', message: 'group  deleted successfully'});
    // res.json({ message: 'group successfully deleted' });
  });
};

/*exports.add_user = function(req, res) {
  User.findOne({
    id: req.body.id
  }, function (err, user) {
    if (!user) {
      var new_user = new User(req.body);
      new_user.save(function (err, user) {
        if (err)
          res.send(err);
        res.json({success: 'true', message: 'user added is successful'});
      });
    }
    else {
      return res.json({message: 'user already exist'})
    }
  })
}*/
