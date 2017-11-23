'use strict';
module.exports = function(app) {
    var user = require('../controllers/userController');

    // user Route
    app.route('/user')
		.get(user.list_users)
        .post(user.create_a_user);
};