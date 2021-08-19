const db = require("../db");
const bcrypt = require("bcryptjs");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;
var {cloudinary} = require("../Cloudinary");

const PostSchema = new Schema({
    title: {
        type: String,
        required: true,
    },
    body: {
        type: String,
        required: true,
    },
    summary: {
        type: String,
        required: true,
    },
    publishedAt: {
        type: String,
        required: true,
    },
    imgURL: {
        type: String,
        required: true,
    },
    public_id: {
        type: String,
        required: true,
    }
});


module.exports = mongoose.model('Post', PostSchema);