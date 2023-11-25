
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';

const ModalButton1 = ({ onClose }) => {
  const [descripcionData, setDescripcionData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(3);
  const [newText, setNewText] = useState('');
  const [newDate, setNewDate] = useState(new Date());

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

  const handleInsertData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/insertdescripcion', {
        texto: newText,
        fecha: newDate.toISOString().split('T')[0], // Convierte la fecha a formato YYYY-MM-DD
      });

      if (response.data.success) {
        fetchData();
        setNewText('');
        setNewDate(new Date());
      } else {
        console.error('Error al insertar datos:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/descripcion/${id}`);
      if (response.data.success) {
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
        <p>¡CUÉNTAME!</p>

        <div>
          <label>Texto:</label>
          <input type="text" value={newText} onChange={(e) => setNewText(e.target.value)} />
          <label>Fecha:</label>
          <DatePicker selected={newDate} onChange={(date) => setNewDate(date)} />
          <button onClick={handleInsertData}>Insertar Datos</button>
        </div>

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
                <td>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
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
