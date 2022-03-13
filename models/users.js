const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    name: {
        type: String,
        required: [true, "Username is required"]
    },
    email: {
        type: String,
        required: [true,  "Email is required"]
    },
    psw: {
        type: String,
        required: [true, "Password is required"]
    },
    about: {
        type: String,
        required: [false]
    }
})

const UserModel = mongoose.model("user", UserSchema)

module.exports = UserModel;