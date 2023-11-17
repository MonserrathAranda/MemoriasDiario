import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalButton1 = ({ onClose }) => {
  const [descripcionData, setDescripcionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); // Puedes ajustar la cantidad de elementos por página según tus necesidades

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/descripcion');
        if (response.data.success) {
          setDescripcionData(response.data.data);
        } else {
          console.error('Error al obtener datos de la descripción:', response.data.error);
        }
      } catch (error) {
        console.error('Error en la solicitud:', error.message);
      }
    };

    fetchData();
  }, []);

  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentItems = descripcionData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>¡CUÉNTAME!</p>
       
        <table>
          <thead>
            <tr>
              <th>Texto</th>
              <th>Fecha</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.texto}</td>
                <td>{item.fecha}</td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Atrás</button>
          <button onClick={handleNextPage} disabled={indexOfLastItem >= descripcionData.length}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default ModalButton1;

