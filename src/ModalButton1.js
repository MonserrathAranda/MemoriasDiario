
//ModalButton1.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';




const ModalButton1 = ({ onClose }) => {
  const [descripcionData, setDescripcionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(1); 
  const [newText, setNewText] = useState(''); // Add state for new text
  const [newDate, setNewDate] = useState(''); // Add state for new date
 
 




 
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




    useEffect(() => {
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

 
  // Resto del código...
  


  // Resto del código...
  
  const handleInsertData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/insertDescripcion', {
        texto: newText,
        fecha: newDate,
      });

      if (response.data.success) {
        // Refresh data after insertion
        fetchData();
        // Clear input fields
        setNewText('');
        setNewDate('');
      } else {
        console.error('Error al insertar datos:', response.data.error);
        console.log('Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      console.error('Error completo:', error);
    }
  };



  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>¡CUÉNTAME!</p>
       
        {/* Form for inserting data */}
        <div>
          <label>Texto:</label>
          <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
          <label>Fecha:</label>
          <input type="text" value={newDate} onChange={(e) => setNewDate(e.target.value)} />
          <button onClick={handleInsertData}>Insertar Datos</button>
        </div>

        {/* Display existing data */}
       
       
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

