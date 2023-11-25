// ModalButton2.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalButton2 = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const [newImage, setNewImage] = useState(null);
  const [fecha, setFecha] = useState(new Date());
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  const handleImageInsert = async (e) => {
    e.preventDefault(); 

    try {
      if (!fecha || !newImage) {
        console.error('Por favor, completa todos los campos.');
        return;
      }

      const formData = new FormData();
      formData.append('fecha', fecha.toISOString());
      formData.append('imagen', newImage);

      const response = await axios.post('http://localhost:5000/imagen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        console.log('Imagen insertada exitosamente');
        fetchData(); // Actualiza la lista de imágenes después de la inserción
      } else {
        console.error('Error al insertar la imagen:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/imagen');
      if (response.data.success) {
        setImages(response.data.data);
      } else {
        console.error('Error al obtener datos de la imagen:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handleBack = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
  };

  const handleImageDelete = async (imageId) => {
    try {
      const response = await axios.delete(`http://localhost:5000/imagen/${imageId}`);

      if (response.data.success) {
        console.log('Imagen eliminada exitosamente');
        fetchData(); // Actualiza la lista de imágenes después de la eliminación
      } else {
        console.error('Error al eliminar la imagen:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <div className="modal" style={{ display: 'block' }}>
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <center>
          <h1 style={{ color: 'black' }}>Imágenes</h1>
        </center>
        <div className="insert-exit-buttons">
          <form onSubmit={handleImageInsert}>
            <label>
              Fecha:
              <DatePicker selected={fecha} onChange={(date) => setFecha(date)} />
            </label>
            <br />
            <label>
              Imagen:
              <input type="file" accept="image/*" onChange={(e) => setNewImage(e.target.files[0])} />
            </label>
            <br />
            <button type="submit">Insertar Imagen</button>
          </form>
        </div>
        <div>
          <button onClick={handleBack}>Atrás</button>
          <button onClick={handleNext}>Siguiente</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>Fecha</th>
              <th>Imagen</th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {images.slice(currentIndex, currentIndex + 2).map((image) => (
              <tr key={image.id}>
                <td style={{ display: 'none' }}>{image.id}</td>
                <td>{image.fecha}</td>
                <td>
                  <img
                    src={`data:image/jpeg;base64,${btoa(
                      new Uint8Array(image.imagen.data).reduce(
                        (data, byte) => data + String.fromCharCode(byte),
                        ''
                      )
                    )}`}
                    alt={`Imagen ${image.id}`}
                    style={{ maxWidth: '50px', height: 'auto' }}
                  />
                </td>
                <td>
                  <button
                    onClick={() => handleImageDelete(image.id)}
                    style={{ fontSize: '12px', padding: '10px 10px' }}
                  >
                    Eliminar
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalButton2;