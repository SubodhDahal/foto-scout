'use strict';

module.exports = function (app) {
  var group = require('../controllers/groupController');

  app.route('/group/:id/users')
    .post(group.add_user_to_group)
    .delete(group.delete_user_from_group);

  app.route('/group')
    .get(group.list_all_group)
    .post(group.create_a_group);

  app.route('/group/:id')
    .get(group.read_group);

  app.route('/group/:id')
    .put(group.update_group)
    .delete(group.delete_group);
};


