var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    bcrypt = require('bcrypt'),
    jwt = require('jsonwebtoken'),
     _ = require('lodash');

var userProfileSchema = new Schema({
    about_me:{type: String, default: "None"},
    profile_pic:{type: String, default: "None"}
});

var UserSchema = new Schema({
    firstname:{
      type: String,
      require: true,
    },
    lastname:{type: String},
    email:{
      type: String,
      require: true,
      unique: true
    },
    passcode:{
      type: String,
      required: true,
      minlength: 6
    },
    user_profile:[userProfileSchema],
    tokens: [{
      access: {
        type: String,
        required: true
      },
      token: {
        type: String,
        required: true
      }
    }]
});

UserSchema.methods.toJSON = function () {
  var user = this;
  var userObject = user.toObject();

  return _.pick(userObject, ['_id','firstname','lastname','email','user_profile']);
};

UserSchema.methods.generateAuthToken = function () {
  var user = this;
  var access = 'auth';
  var token = jwt.sign({_id: user._id.toHexString(), access}, 'yomantameronepaliho').toString();

  user.tokens.push({access, token});

  return user.save().then(() => {
    return token;
  });
};

UserSchema.methods.removeToken = function (token) {
  var user = this;

  return user.update({
    $pull: {
      tokens: {token}
    }
  });
};

UserSchema.statics.findByCredentials = function (email, passcode) {
  var User = this;

  return User.findOne({email}).then((user) => {
    if (!user) {
      return Promise.reject();
    }

    return new Promise((resolve, reject) => {
      // Use bcrypt.compare to compare password and user.password
      bcrypt.compare(passcode, user.passcode, (err, res) => {
        if (res) {
          resolve(user);
        } else {
          reject();
        }
      });
    });
  });
};

UserSchema.statics.findByToken = function (token) {
  var User = this;
  var decoded;

  try {
    decoded = jwt.verify(token, 'yomantameronepaliho');
  } catch (e) {
    return Promise.reject();
  }

  return User.findOne({
    '_id': decoded._id,
    'tokens.token': token,
    'tokens.access': 'auth'
  });
};

module.exports = mongoose.model('User', UserSchema);
