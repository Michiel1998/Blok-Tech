const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Modeling the schema of the user
const UserSchema = new Schema({
  name: {
    type: String,
    required: [true, "name is required"],
  },
  email: {
    type: String,
    required: [true, "email is required"],
  },
  drink: {
    type: String,
    required: [false, "drink is required"],
  },
  psw: {
    type: String,
    required: [true, "psw is required"],
  },
  about: {
    type: String,
    required: [true, "about is required"],
  },
});

const UserModel = mongoose.model("usermodel", UserSchema);

module.exports = UserModel;
