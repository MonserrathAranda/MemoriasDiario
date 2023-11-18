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

// Ruta para manejar la autenticación de usuarios
app.post('/login', (req, res) => {
  const { username, password } = req.body;

  db.query(
    'SELECT * FROM login WHERE username = ? AND password = ?',
    [username, password],
    (err, results) => {
      if (err) {
        res.send({ success: false, error: err.message });
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

// Ruta para obtener datos de la tabla "descripcion"
app.get('/descripcion', (req, res) => {
  db.query('SELECT * FROM descripcion', (err, results) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: results });
    }
  });
});

// Ruta para obtener datos de la tabla "imagen"
app.get('/imagen', (req, res) => {
  db.query('SELECT id, fecha, imagen FROM imagen', (err, results) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      // Convertir BLOB a URL de imagen
      const dataWithImageURL = results.map(item => ({
        id: item.id,
        fecha: item.fecha,
        imagen: `data:image/jpeg;base64,${Buffer.from(item.imagen).toString('base64')}`,
      }));

      res.send({ success: true, data: dataWithImageURL });
    }
  });
});

app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
