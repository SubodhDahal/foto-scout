var mongoose = require('mongoose');
var Schema = mongoose.Schema;

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

module.exports = mongoose.model('User', UserSchema);


