const express = require('express')
const camelCase = require('camelcase')
const skinTones = new Map([
	['none', ''],
	['white', '🏻'],
	['creamWhite', '🏼'],
	['lightBrown', '🏽'],
	['brown', '🏾'],
	['darkBrown', '🏿']
])


const app = express()
const port = 3000

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

console.log(
  camelCase('foo-bar')
)
 console.log(
   skinTones
 )

