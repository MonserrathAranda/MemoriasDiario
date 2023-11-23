//ModalButton3.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';




const ModalButton3 = ({ onClose }) => {
  const [musicaData, setmusicaData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3); 
  const [newcancion, setNewcancion] = useState(''); // Add state for new text
 
 




 
    const fetchData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/musica');
        if (response.data.success) {
          setmusicaData(response.data.data);
        } else {
          console.error('Error al obtener datos de la musica:', response.data.error);
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
  const currentItems = musicaData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

 
 
  
  const handleInsertData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/insertmusica', {
        cancion: newcancion,
       
      });

      if (response.data.success) {
        // Refresh data after insertion
        fetchData();
        // Clear input fields
        setNewcancion('');
       
      } else {
        console.error('Error al insertar datos:', response.data.error);
        console.log('Respuesta del servidor:', response);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
      console.error('Error completo:', error);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/musica/${id}`);
      
      if (response.data.success) {
        // Refresh data after deletion
        fetchData();
      } else {
        console.error('Error al eliminar datos:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };


  return (
    <div className="modal">
      <div className="modal-content">
        <span className="close" onClick={onClose}>&times;</span>
        <p>¡¿CUAL ES NUESTRA CANCION EL DIA DE HOY?!</p>
       
       
        <div>
          <label>Canción:</label>
          <input type="text" value={newcancion} onChange={(e) => setNewcancion(e.target.value)} />
         
          <button onClick={handleInsertData}>Insertar Canción</button>
        </div>

      
       
       
        <table>
          <thead>
            <tr>
              <th>Cancion:</th>
              
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.cancion}</td>
                <td>
        <button onClick={() => handleDelete(item.id)}>Eliminar</button>
      </td>
               
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Atrás</button>
          <button onClick={handleNextPage} disabled={indexOfLastItem >= musicaData.length}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default ModalButton3;