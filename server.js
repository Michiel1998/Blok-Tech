const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const arrayBack = require('array-back');
const dotenv = require ('dotenv').config();
const {MongoClient } = require('mongodb');
const {ObjectId} = require('mongodb');
const db = require("./config/config.js");
const UserModel = require('./models/users')
const LikedUserModel = require('./models/likedUsers')
const mongoose = require("mongoose");
const toId = mongoose.Types.ObjectId;
let port = process.env.PORT;

var urlencodedParser = bodyParser.urlencoded({ extended: false })

console.log(process.env.TESTVAR)

const app = express();
db.connectDb();

const loadUsers = async () => {
  const usersList = await UserModel.find({}).lean();
  return usersList;
}
// Middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}))
 
//  Set Template Engine
app.set('view engine', 'ejs');

// Routing
app.get('/', (req, res) => {
  loadUsers().then(result)
  res.render('index')
});

app.get('/register',  (req, res) => {
  res.render('register');
});

app.get('/discover', (req, res) => {
  res.render('discover');
});

app.post('/register', urlencodedParser, async (req, res) => {
  let user = {
    slug: slug(req.body.name),
    name: req.body.name,
    email: req.body.email,
    psw: req.body.psw
  }
  
  const users = await UserModel.find({}).lean();
  
  // Add user to users list locally
  users.push(user)
  // Add user to MongoDB Database
  await UserModel.insertOne(user);
  
  res.render('discover', {users})
})

app.post("/like/:id", async (req, res) => {
  console.log("like");

  try {
    req.params.id = toId(req.params.id);

    const users = await UserModel.find({}).lean();
    const likedUser = await UserModel.find().lean();
    const likedUsers = await LikedUserModel.find({}).lean();

    console.table(likedUser);
    console.table(users);
    console.table(likedUsers);
    
  } catch (err) {
    console.log(err);
  }

  // const users = await LikedUsers.find({}).toArray();
  // const likedUsers = LikedUserModel.find({}).toArray();

  // console.log(data.name);

  // let likedUser = {
  //   _id: data._id,
  //   name: data.name,
  //   email: data.email,
  //   psw: data.psw
  // }
  
  // likedUsers.push(likedUser);
  // await LikedUserModel.insertOne(likedUser)

  // try {    
  //   console.log('DELETING USER');
  //   await UserModel.deleteOne({_id: ObjectId(likedUser._id)});
  // } catch (error) {
  //   console.log(error);
  // }


  // res.render('register', {users})
});

app.post("/dislike/:id", async (req, res) => {
  console.log("like");

  try {
   const deleteUser = await likedUser.delete();
    
  } catch (err) {
    console.log(err);
  }
});

app.listen(port, () => console.log(`App listening to port ${port}`));