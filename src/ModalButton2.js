import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalButton2 = ({ onClose }) => {
  const [imagenes, setImagenes] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/imagen');
        if (response.data.success) {
          setImagenes(response.data.data);
        } else {
          console.error('Error al obtener datos de la imagen:', response.data.error);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    };

    fetchData();
  }, []);

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Hola</p>
        <table>
          <thead>
            <tr>
              <th>Id</th>
              <th>Fecha</th>
              <th>Imagen</th>
            </tr>
          </thead>
          <tbody>
            {imagenes.map((item, index) => (
              <tr key={index}>
                <td>{item.id}</td>
                <td>{item.fecha}</td>
                <td>
                  {item.imagen ? (
                    <img
                      src={item.imagen}
                      alt={`Imagen-${item.id}`}
                      onError={(e) => console.error(`Error al cargar la imagen-${item.id}`, e)}
                    />
                  ) : (
                    <span>No hay imagen</span>
                  )}
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
