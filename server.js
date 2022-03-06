const database = require('./database/db.js')
const express = require('express')
const app = express()

app.use(express.static('public'))

app.get('./', async (req, res) => {
  const allUsers = await database.showUsers()

  res.render('showUsers', {
    page: 'Users',
    email: 'michielschipper@gmail.com',
    uname: 'Michiel',
    allUsers: 'allUsers',
  })
})

app.get('/register', (req, res) => {
	res.render('register')
  })
  
  app.post('/register', async (req, res) => {
    console.log(req.body)
    const user = {email: req.req, res}
    await database.registerUser(user);
    res.send({
      succes: user.uname,
    });
  });

  app.listen(3000, () => console.log('Server on, port: 3000'))