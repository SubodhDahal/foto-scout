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
