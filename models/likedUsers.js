const mongoose = require("mongoose");

const Schema = mongoose.Schema;

// Modeling the schema of the liked user
const likedUsersSchema = new Schema({
  name: {
    type: String,
    required: [true, "Username is required"],
  },
  email: {
    type: String,
    required: [true, "Email is required"],
  },
  psw: {
    type: String,
    required: [true, "Password is required"],
  },
  about: {
    type: String,
    required: [false],
  },
});

const LikedUserModel = mongoose.model("likedUser", likedUsersSchema);

module.exports = LikedUserModel;
