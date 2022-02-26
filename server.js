const express = require('express')
const camelCase = require('camelcase')
// express.static(root, [options])
const skinTones = new Map([
	['none', ''],
	['white', '🏻'],
	['creamWhite', '🏼'],
	['lightBrown', '🏽'],
	['brown', '🏾'],
	['darkBrown', '🏿']
])

// app.use('/static', express.static('public'))

const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/login', (req, res) => {
	res.send('Je gaat nu inloggen')
  })

  app.get('/login/registreren', (req, res) => {
	res.send('Je gaat nu registreren')
  })

  app.get('/home/:name', (req, res) => {
	res.send(`Je bent gematched met ${req.params.name}`)
  })


app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

app.use(function (req, res) {
    console.error("Error 404: page nog found");
});

// console.log(
//   camelCase('foo-bar')
// )
//  console.log(
//    skinTones
//  )

