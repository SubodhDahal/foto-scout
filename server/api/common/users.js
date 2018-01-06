var mongoose = require('mongoose'),
  User = mongoose.model('User');

/**
 * Get a user by authentication token
 * @param  {String} token
 * @return {Object}
 */
exports.getUserByToken = function (token) {
  return new Promise((resolve, reject) => {
    User.findByToken(token)
      .then((user) => {
        if (!user) {
          reject({
            message: 'Couldn\'t find user'
          })
        } else {
          resolve(user)
        }
      })
      .catch((error) => {
        reject({
          message: 'Error occured while getting user information'
        })
      })
  })
}