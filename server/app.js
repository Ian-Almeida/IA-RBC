const express = require('express')
const cors = require('cors')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db')

app.use(cors())

app.get('/', (req, res) => {
  res.send('Hello World')
})

app.listen(port, () => {
  console.log('Running on port: ' + port)
})
