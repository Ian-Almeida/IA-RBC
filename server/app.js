const express = require('express')
const cors = require('cors')
const bodyParser = require('body-parser')
const app = express()
const port = 3000

const sqlite3 = require('sqlite3').verbose()
const db = new sqlite3.Database('db')


app.use(cors())
app.use(express.json())
app.use(bodyParser.json())
app.use(bodyParser.urlencoded( {extended: true} ))

db.serialize(() => {
  db.run("CREATE TABLE IF NOT EXISTS conhecimento ( id INTEGER PRIMARY KEY AUTOINCREMENT, idade INTEGER, periodo INTEGER, genero_favorito TEXT, estado TEXT, horas_disponiveis INTEGER )");
  // const stmt = db.prepare("INSERT INTO lorem VALUES (?)");
  // for (let i = 0; i < 10; i++) {
  //     stmt.run("Ipsum " + i);
  // }
  // stmt.finalize();

  // db.each("SELECT rowid AS id, info FROM lorem", (err, row) => {
  //     console.log(row.id + ": " + row.info);
  // });
});

app.get('/', (req, res) => {
  const dados = []
  db.serialize(() => {
    db.each(`SELECT * FROM conhecimento`, (err, row) => {
      dados.push(row)
    });
    res.send(dados)
  });
})
app.post('/', (req, res) => {
  data = req.body
  console.log(data)
  db.serialize(() => {
    db.run(`INSERT INTO conhecimento ( idade, periodo, genero_favorito, estado, horas_disponiveis ) VALUES ( ${data.idade}, ${data.periodo}, '${data.genero_favorito}', '${data.estado}', ${data.horas_disponiveis})`);
  });
  res.send(req.body)
})

app.listen(port, () => {
  console.log('Running on port: ' + port)
})
