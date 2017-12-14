var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt');

var UserSchema = new Schema({
    firstname:{
        type: String
    },
    lastname: {
        type: String
    },
    email:{
        type: String
    },
    passcode:{
        type: String
    }
});

  UserSchema.methods.comparePassword = function (password) {
  return bcrypt.compareSync(password, this.passcode);
}

module.exports = mongoose.model('User', UserSchema);


