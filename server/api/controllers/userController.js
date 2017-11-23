'use strict';

var mongoose = require('mongoose'),
    User = mongoose.model('User'),
	bcrypt = require('bcrypt');
	
exports.list_users = function(req, res) {
    User.find({}, function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });
};	
	
exports.create_a_user = function(req, res) {
    var new_user = new User(req.body);
    /*new_user.save(function(err, user) {
        if (err)
            res.send(err);
        res.json(user);
    });*/
	bcrypt.genSalt(10, function(err, salt) {
    	bcrypt.hash(new_user.passcode, salt, function(err, hash) {
   			new_user.passcode = hash;
   			new_user.save(function(err, user) {
				if (err)
					res.send(err);
				res.json(user);
			});
		});
	});
};


