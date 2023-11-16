// ModalButton1.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalButton1 = ({ onClose }) => {
  const [descripcionData, setDescripcionData] = useState([]);

  useEffect(() => {
    // Hacer la solicitud para obtener datos de la tabla "descripcion" cuando el componente se monta
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/descripcion');
        console.log('Respuesta de la solicitud:', response);
        if (response.data.success) {
          setDescripcionData(response.data.data);
          console.log('Datos de descripción:', response.data.data);
        } else {
          console.error('Error al obtener datos de la descripción:', response.data.error);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    };

    fetchData();
  }, []); // El segundo argumento [] asegura que useEffect se ejecute solo una vez al montar el componente

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>Hola</p>
        {/* Mostrar datos en una tabla */}
        <table>
          <thead>
            <tr>
              <th>Texto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {descripcionData.map((item, index) => (
              <tr key={index}>
                <td>{item.texto}</td>
                <td>{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ModalButton1;
