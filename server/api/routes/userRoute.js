'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');
   // var image = require('../controllers/ImageController')

    // register route
    app.route('/register')
		//.get(user.list_users)
      .post(user.create_a_user);

    //login route
    app.route('/login')
      .post(user.sign_in)

    //App Home
    /*app.route('/home')
      .get(image.list_all_images())
      .post(image.loginRequired, image.upload_an_image, image.delete_an_image, image.update_an_image)*/
};
