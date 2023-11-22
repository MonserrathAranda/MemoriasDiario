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


// ...

// Nueva ruta para obtener datos de la tabla "descripcion"
app.get('/descripcion', (req, res) => {
  db.query('SELECT * FROM descripcion', (err, results) => {
    if (err) {
      res.send({ error: err.message });
    } else {
      res.send({ success: true, data: results });
    }
  });
});



// Nueva ruta para insertar datos en la tabla "descripcion"
app.post('/insertDescripcion', (req, res) => {
  const { texto, fecha } = req.body;
  console.log('Request received:', req.body);

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







app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
