const express = require('express');
const mysql = require('mysql');
const cors = require('cors');
const bodyParser = require('body-parser');
const multer = require('multer');
const path = require('path');

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

// Ruta para obtener datos de la tabla "imagen" con enlaces a las imágenes
app.get('/imagen', (req, res) => {
  db.query('SELECT id, fecha, imagen FROM imagen', (err, results) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      res.send({ success: true, data: results });
    }
  });
});

// Ruta para manejar la carga de imágenes y la inserción en la base de datos
const storage = multer.memoryStorage(); // Almacena la imagen en memoria como un búfer
const upload = multer({ storage: storage });

app.post('/imagen', upload.single('imagen'), (req, res) => {
  try {
    if (!req.file) {
      throw new Error('No se proporcionó ninguna imagen.');
    }

    const fecha = req.body.fecha;

    // Inserta la información en la base de datos
    db.query(
      'INSERT INTO imagen (fecha, imagen) VALUES (?, ?)',
      [fecha, req.file.buffer],
      (err, result) => {
        if (err) {
          throw err;
        }

        // La imagen se ha cargado con éxito y se ha insertado en la base de datos
        res.json({ success: true, message: 'Imagen cargada e insertada con éxito' });
      }
    );
  } catch (error) {
    console.error('Error en la carga de imágenes:', error.message);
    res.json({ success: false, error: error.message });
  }
});

// Ruta para eliminar una imagen por ID
app.delete('/imagen/:id', (req, res) => {
  const imageId = req.params.id;

  // Consulta SQL para eliminar la imagen por ID
  const deleteQuery = 'DELETE FROM imagen WHERE id = ?';

  db.query(deleteQuery, [imageId], (err, result) => {
    if (err) {
      res.send({ success: false, error: err.message });
    } else {
      if (result.affectedRows > 0) {
        res.send({ success: true, message: 'Imagen eliminada con éxito' });
      } else {
        res.send({ success: false, message: 'No se encontró la imagen para eliminar' });
      }
    }
  });
});

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



app.listen(port, () => {
  console.log(`Servidor corriendo en el puerto ${port}`);
});
