const mysql = require("mysql");
const express = require("express");
var app = express();
const bodyparser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyparser.json());
var mysqlConnection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "opengym",
});

mysqlConnection.connect((err) => {
  if (!err) console.log("db connesso");
  else
    console.log("connessione db fallita :" + JSON.stringify(err, undefined, 2));
});

app.listen(5000, () => console.log("express server e runnato alla porta 5000"));

app.get("/", function (req, res, next) {
  res.send("Server runnning on port 5000");
});

app.post("/registrati", (req, res) => {
  let inp = req.body;
  var utente = {
    email: inp.email,
    nome: inp.name,
    cognome: inp.surname,
    password: inp.password,
  };
  console.log(utente);
  mysqlConnection.query("INSERT INTO utente SET ?", utente, function (
    err,
    result
  ) {
    if (!err) res.send("Utente registrato");
    else {
      console.log(err);
      res.send("Utente già registrato");
    }
  });
});

app.post("/login", (req, res) => {
  var email = req.body.email;
  var password = req.body.password;
  if (email && password) {
    mysqlConnection.query(
      "SELECT * FROM utente WHERE email = ? AND password = ?",
      [email, password],
      (err, results, fields) => {
        if (results.length > 0) {
          const token = jwt.sign(
            {
              email: results[0].email,
              nome: results[0].nome,
              cognome: results[0].cognome,
            },
            "SEGRETO",
            { expiresIn: 120 }
          );
          res.send({ auth: true, token: token });
        } else {
          res.send({ auth: false });
        }
        res.end();
      }
    );
  } else {
    res.send("Inserire email e password!");
    res.end();
  }
});

app.post("/prenotazione", (req, res) => {
  let inp = req.body;
  var utente = {
    id_palestra: inp.id_palestra,
    email: inp.email,
    data: inp.data,
    orario_inizio: inp.orario_inizio,
    orario_fine: inp.orario_fine,
  };
  mysqlConnection.query(
    "INSERT INTO prenotazione SET ?",
    prenotazione,
    (err, result) => {
      if (!err) res.send("Prenotazione inserita");
      else res.send("Non puoi prenotarti piu di una volta al giorno");
    }
  );
});

app.post;
