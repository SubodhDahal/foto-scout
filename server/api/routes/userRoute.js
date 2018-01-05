'use strict';

var multer = require('multer');
var crypto=require("crypto");

var upload = multer({ storage: storage });
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/user_profile_pics/')
  },
  filename: function (req, file, cb) {
    crypto.pseudoRandomBytes(16, function (err, raw) {
      //cb(null, raw.toString('hex') + Date.now() + '.' + mime.extension(file.mimetype));
      cb(null, raw.toString('hex') + Date.now() + '.' + "jpg");
    });
  }
});

var upload = multer({
  storage: storage
});

module.exports = function(app) {
    var user = require('../controllers/userController');


    // register route
    app.route('/register')
      .post(user.create_a_user);

    //login route
    app.route('/login')
      .post(user.sign_in);

    //user profile route
    app.route('/user/me')
      .get(user.user_profile);

    app.route('/user/me/edit')
      .post(user.profile_edit);

    //setting profile pic
    app.route('/user/me/profile_pic')
      .post(upload.any(),user.set_profile_pic);

	  //logging out
	  app.route('/user/me/logout')
	   .delete(user.log_out);
};
