const express = require("express");
const bodyParser = require("body-parser");
const slug = require("slug");
const arrayBack = require("array-back");
const dotenv = require("dotenv").config();
const { MongoClient } = require("mongodb");
const { ObjectId } = require("mongodb");
const db = require("./config/config.js");
const UserModel = require("./models/userModel");
const LikedUserModel = require("./models/likedUsers");
const mongoose = require("mongoose");
const res = require("express/lib/response");
const toId = mongoose.Types.ObjectId;
let port = process.env.PORT;

var urlencodedParser = bodyParser.urlencoded({ extended: false });

console.log(process.env.TESTVAR);

const app = express();
db.connectDb();

const loadUsers = async () => {
  const usersList = await UserModel.find({});
  return [usersList];
};
// Middleware
app.use(express.static("public"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//  Set Template Engine
app.set("view engine", "ejs");

// Routing
app.get("/", (req, res) => {
  res.render("index");
});

app.get("/register", (req, res) => {
  res.render("register");
});

app.get("/likedUsers", (req, res) => {
  res.render("likedUsers");
});

app.get("/discover", (req, res) => {
  res.render("discover");
});

app.get("/accountDeleted", (req, res) => {
  res.render("accountDeleted");
});

app.post("/register", urlencodedParser, async (req, res) => {
  // Format user data in correct format
  let user = {
    slug: slug(req.body.name),
    name: req.body.name,
    email: req.body.email,
    about: req.body.about,
    psw: req.body.psw,
  };

  // Save user to the database
  const data = new UserModel(user);
  data.save();

  // Load user
  res.render("discover", { data });
});

app.post("/like/:id", async (req, res) => {
  let id = toId(req.params.id);

  // 1. Haal alle users uit de normale user collection
  const users = await UserModel.find({});

  // 2a. Haal de goeie user op basis van id uit de users collection
  const data = await UserModel.findById(id);
  console.table(data.name);
  let likedUser = {
    name: data.name,
    email: data.email,
    about: data.about,
    psw: data.psw,
  };

  // 2b. Zet de user op basis van id in de likedUsers collection
  const likedUsers = LikedUserModel(likedUser);
  likedUsers.save();

  // 3. Verwijder de user op basis van id uit de normal users collection
  const deleteUser = await UserModel.deleteOne(likedUser);

  // 4. Render de pagina met normale users
  res.render("discover", { users });
});

app.post("/dislike/:id", async (req, res) => {
  let id = toId(req.params.id);

  // 1. Haal alle users uit de normale user collection
  const users = await UserModel.find({});

  // 2. Haal de goeie user op basis van id uit de users collection
  const userToBeRemoved = await UserModel.findById(id);

  // 3. Verwijder de user op basis van id uit de normal users collection
  const deleteUser = await UserModel.deleteOne(userToBeRemoved);

  // 4. Render de pagina met normale users
  res.render("accountDeleted", { userToBeRemoved });
});

app.listen(port, () => console.log(`App listening to port ${port}`));
