
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express()

app.use(bodyParser.urlencoded({ extended: true}));
app.use(bodyParser.json());
app.use(cors());


const sqlite3 = require('sqlite3').verbose();

// otwórz połączenie z bazą danych
let db = new sqlite3.Database('database.db', (err) => {
  if (err) {
    return console.error(err.message);
  }
  console.log('Connected to the database.');
});

// utwórz tabelę w bazie danych
db.run(`CREATE TABLE IF NOT EXISTS form_data (
  id INT AUTO_INCREMENT PRIMARY KEY,
  email TEXT,
  message TEXT,
  nawadnianie BOOLEAN,
  zakladanie BOOLEAN,
  pielegnacja BOOLEAN,
  projekt BOOLEAN )`, function(err) {
  if (err) {
    return console.error(err.message);
  }
  console.log('Table created.');
});

// zapisz dane z formularza do bazy danych
app.post('/form', (req, res) => {
  const {email, message, nawadnianie, zakladanie, pielegnacja, projekt} = req.body;
  db.run(`INSERT INTO form_data (email, message,  nawadnianie, zakladanie, pielegnacja, projekt) VALUES (?, ?, ?, ?, ?, ?)`, [email, message, nawadnianie, zakladanie, pielegnacja, projekt], function(err) {
    if (err) {
      return console.log(err.message);
    }
    console.log(`A row has been inserted with rowid ${this.lastID}`);
    res.send(email);
  });
})

app.get('/' , (req, res) =>{
  res.send("moje api")
})

const port = process.env.PORT;
app.listen(port, () =>{
  console.log(`Serwer działa na porcie ${port}`)
});