const express = require('express');
const bodyParser = require('body-parser');
const slug = require('slug');
const arrayBack = require('array-back');
const dotenv = require ('dotenv').config();
const {MongoClient } = require('mongodb');
const {ObjectId} = require('mongodb');

var urlencodedParser = bodyParser.urlencoded({ extended: false })

console.log(process.env.TESTVAR)

const app = express();
const port = 3000;
let db = null;

// Middleware
app.use(express.static('public'))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( {extended: true}))
 
//  Set Template Engine
app.set('view engine', 'ejs');

// Routing
app.get('/', (req, res) => {
  res.render('index')
});


app.get('/register',  (req, res) => {
  // RENDER PAGE
  res.render('register');
})

app.post('/register', urlencodedParser, async (req, res) => {

  let user = {
    slug: slug(req.body.name),
    name: req.body.name,
    email: req.body.email,
    psw: req.body.psw
  }
  
  const users = await db.collection('users').find({}).toArray();
  
  // Add user to users list locally
  users.push(user)
  // Add user to MongoDB Database
  await db.collection('users').insertOne(user);
  
  res.render('discover', {users})
})

async function connectDB() {
  const uri = process.env.DB_URI;

  const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  });
  try {
    await client.connect();
    db = client.db(process.env.DB_NAME);
  } catch (error) {
    throw error;
  }
}

  app.listen(port, () => {
    console.log(`web server  running on http://localhost:${port}`)


    connectDB().then ( () => {console.log("we have a connection!") 
})})

