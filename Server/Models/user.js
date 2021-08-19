const db = require("../db");
const bcrypt = require("bcryptjs");

const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    pass: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    }
});
// UserSchema.methods.comparePassword = async (password) => {
//     return ;
// }

module.exports = mongoose.model('User', UserSchema);