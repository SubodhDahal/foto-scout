'use strict';

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

	  //logging out
	  app.route('/user/me/logout')
	   .delete(user.log_out);
};
