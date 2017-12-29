'use strict';

module.exports = function (app) {
  var group = require('../controllers/groupController');

  app.route('/group')
    .post(group.create_a_group);

  app.route('/group/:id')
    .get(group.read_group);

  app.route('/group/:id')
    .put(group.update_group)
    .delete(group.delete_group);
}


