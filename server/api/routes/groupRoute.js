'use strict';

module.exports = function(app) {
  var group = require('../controllers/groupController');
  app.route('/group')
    .post(group.create_a_group);

  app.route('/group/:id')

    .get(group.read_group)
}


   /* .post(group.update_group)
    .delete (group.delete_group);
   .add(group.add_user)*/


