const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');

const app = express();
const port = 5000;

app.use(cors());
app.use(bodyParser.json());

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: '',
  database: 'diario',
});

db.connect();




app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM login WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        res.send({ error: err.message });
      } else {
        if (results.length > 0) {
          res.send({ success: true, message: 'Inicio de sesión exitoso' });
        } else {
          res.send({ success: false, message: 'Credenciales incorrectas' });
        }
      }
    }
  );
});




app.get('/descripcion', (req, res) => {
  db.query('SELECT * FROM descripcion', (err, results) => {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send({ success: true, data: results });
    }
  });
});


app.post('/insertDescripcion', (req, res) => {
  console.log('Request received:', req.body);
  const { texto, fecha } = req.body;

  db.query(
    'INSERT INTO descripcion (texto, fecha) VALUES (?, ?)',
    [texto, fecha],
    (err, results) => {
      if (err) {
        res.send({ success: false, error: err.message });
      } else {
        res.send({ success: true, message: 'Datos insertados correctamente' });
      }
    }
  );
});



//musica

app.get('/musica', (req, res) => {
  db.query('SELECT * FROM musica', (err, results) => {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send({ success: true, data: results });
    }
  });
});


app.post('/insertmusica', (req, res) => {
  console.log('Request received:', req.body);
  const { cancion } = req.body;

  db.query(
    'INSERT INTO musica (cancion) VALUES (?)',
    [cancion],
    (err, results) => {
      if (err) {
        res.send({ success: false, error: err.message });
      } else {
        res.send({ success: true, message: 'Datos insertados correctamente' });
      }
    }
  );
});
//cambio de contra y user

app.get('/getlogin', (req, res) => {
  db.query('SELECT * FROM login', (err, results) => {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send({ success: true, data: results });
    }
  });
});

app.post('/insertlogin', (req, res) => {
  console.log('Request received:', req.body);
  const { username, password } = req.body;

  db.query(
    'INSERT INTO login (username, password) VALUES (?, ?)',
    [username, password],
    (err, results) => {
      if (err) {
        res.send({ success: false, error: err.message });
      } else {
        res.send({ success: true, message: 'Datos insertados correctamente' });
      }
    }
  );
});




app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
