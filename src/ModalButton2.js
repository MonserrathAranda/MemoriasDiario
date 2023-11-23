import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import ImageInsertForm from './insertImagen';  
import ImageGallery from './ImageGallery';
import './button2.css';

const ModalButton2 = ({ onClose }) => {
  const [images, setImages] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

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

  const handleImageClick = (imageId) => {
    console.log('Hiciste clic en la imagen con ID:', imageId);
    
  };

  const handleImageInsert = () => {
    // Lógica para actualizar la lista de imágenes después de la inserción
    fetchData();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>
          &times;
        </span>
        <div className="image-container">
          {/* Muestra ImageGallery aquí */}
          <ImageGallery images={images} onClick={handleImageClick} />
        </div>
        <div className="insert-exit-buttons">
          <ImageInsertForm onClose={onClose} onInsert={handleImageInsert} />
        </div>
      </div>
    </div>
  );
};

export default ModalButton2;