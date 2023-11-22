import React, { useState } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ImageInsertForm = ({ onClose, onInsert }) => {
  const [fecha, setFecha] = useState(new Date());
  const [selectedImage, setSelectedImage] = useState(null);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    setSelectedImage(file);
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    try {
      if (!fecha || !selectedImage) {
        console.error('Por favor, completa todos los campos.');
        return;
      }

      const formData = new FormData();
      formData.append('fecha', fecha.toISOString());
      formData.append('imagen', selectedImage);

      const response = await axios.post('http://localhost:5000/imagen', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data.success) {
        console.log('Imagen insertada exitosamente');
        onInsert(); // Llama a la función proporcionada para actualizar la lista de imágenes
        onClose(); // Cierra el modal después de insertar la imagen
      } else {
        console.error('Error al insertar la imagen:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <div>
        <center><h1 style={{ color: 'black' }}>Insertar Imagenes</h1></center>
      <form onSubmit={handleFormSubmit}>
        <label>
          Fecha:
          <DatePicker selected={fecha} onChange={(date) => setFecha(date)} />
        </label>
        <br />
        <label>
          Imagen:
          <input type="file" accept="image/*" onChange={handleImageChange} />
        </label>
        <br />
        <button type="submit">Insertar Imagen</button>
      </form>
    </div>
  );
};

export default ImageInsertForm;
