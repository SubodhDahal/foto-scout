'use strict';

module.exports = function(app) {
  var group = require('../controllers/groupController');
  app.route('/group')
    .post(group.create_a_group);
};
