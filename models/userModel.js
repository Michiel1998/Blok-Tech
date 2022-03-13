const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "name is required"]
    },
    email: {
        type: String,
        required: [true, "email is required"]
    },
    psw: {
        type: String,
        required: [true, "psw is required"]
    },
    about: {
        type: String,
        required: [true, "about is required"]
    }
})

const UserModel = mongoose.model('usermodel', UserSchema)

module.exports = UserModel;