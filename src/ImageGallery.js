import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ImageGallery = () => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const response = await axios.get('http://localhost:5000/imagen');
      setImages(response.data.data);
    } catch (error) {
      console.error('Error fetching images:', error.message);
    }
  };

  const handleDeleteImage = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/imagen/${id}`);
      console.log(response.data.message);
      fetchImages();
    } catch (error) {
      console.error('Error deleting image:', error.message);
    }
  };

  return (
    <div>
      <center><h1 style={{ color: 'black' }}>Imagenes</h1></center>
      {images.map((image) => (
        <div key={image.id}>
          <p>ID: {image.id}</p>
          <p>Fecha: {image.fecha}</p>
          <img
            src={`data:image/jpeg;base64,${btoa(new Uint8Array(image.imagen.data).reduce((data, byte) => data + String.fromCharCode(byte), ''))}`}
            alt={`Imagen ${image.id}`}
            style={{ maxWidth: '50px', height: 'auto' }}
          />
          <button
            onClick={() => handleDeleteImage(image.id)}
            style={{ fontSize: '12px', padding: '10px 10px' }}
          >
            Eliminar
          </button>
          <hr />
        </div>
      ))}
    </div>
  );
};

export default ImageGallery;
