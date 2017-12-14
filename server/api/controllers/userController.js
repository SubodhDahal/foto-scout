'use strict';

var mongoose = require('mongoose'),
  jwt = require('jsonwebtoken'),
  User = mongoose.model('User'),
  bcrypt = require('bcrypt');

exports.create_a_user = function(req, res){
  User.findOne({
    email: req.body.email
  },function(err, user){
    if(!user){
      var new_user = new User(req.body);
      new_user.passcode = bcrypt.hashSync(req.body.passcode, 10);
      new_user.save(function(err, user) {
        if (err)
          res.send(err);
        res.json({success: 'true', message: 'Registration is successful'});
      });
    }
    else{
      return res.json({message: 'Account already exist'})}
  });

};

exports.sign_in = function(req, res) {
  User.findOne({
    email: req.body.email
  }, function(err, user) {
    if (err) throw err;
    if (!user) {
      res.json({ message: 'Authentication failed. User not found.' });
    } else if (user) if (!user.comparePassword(req.body.passcode)) {
      res.json({message: 'Authentication failed. Wrong passcode.'})
    } else {
      return res.json({
        access_token: jwt.sign({
          firstname: user.firstname,
          lastname: user.lastname,
          _id: user._id
        }, 'RESTFULAPIS')
      });
    }
  });
};

exports.loginRequired = function(req, res, next) {
  if (req.user) {
    next();
  } else {
    return res.status(401).json({ message: 'Unauthorized user!' });
  }
};


