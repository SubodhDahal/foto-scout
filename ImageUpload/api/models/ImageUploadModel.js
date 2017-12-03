'use strict';
var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var ImageUploadSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    path: {
        type: String,
        required: true,
        trim: true
    },

    created_date: {
        type: Date,
        default: Date.now
    },
    image_type: {
        type: [{
            type: String,
            enum: ['portrait', 'horizontal']
        }],
        default: ['portrait']
    },
    image_width:
        {
            type:Number
        },
    image_height:
        {
            type:Number
        }

});

module.exports = mongoose.model('ImageUpload', ImageUploadSchema);