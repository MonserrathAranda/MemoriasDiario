import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ModalButton4 = ({ onClose }) => {
  const [logiData, setlogiData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(2);
  const [newusername, setNewusername] = useState('');
  const [newpassword, setNewpassword] = useState('');

  const fetchData = async () => {
    try {
      const response = await axios.get('http://localhost:5000/getlogin');
      if (response.data.success) {
        setlogiData(response.data.data);
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
  const currentItems = logiData.slice(indexOfFirstItem, indexOfLastItem);

  const handleNextPage = () => {
    setCurrentPage((prevPage) => prevPage + 1);
  };

  const handlePrevPage = () => {
    setCurrentPage((prevPage) => prevPage - 1);
  };

  const handleInsertlogData = async () => {
    try {
      const response = await axios.post('http://localhost:5000/insertlogin', {
        username: newusername,
        password: newpassword,
      });

      if (response.data.success) {
        // Refresh data after insertion
        fetchData();
        // Clear input fields
        setNewusername('');
        setNewpassword('');
      } else {
        console.error('Error al insertar datos:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const handleDelete = async (id) => {
    try {
      const response = await axios.delete(`http://localhost:5000/login/${id}`);
      
      if (response.data.success) {
        console.log('Usuario eliminado correctamente:', response.data.message);
  
        // Elimina localmente la fila con el ID eliminado
        setlogiData((prevData) => prevData.filter(item => item.id !== id));
      } else if (response.status === 404) {
        console.error('No se encontró el usuario para eliminar:', response.data.message);
      } else {
        console.error('Error al eliminar usuario:', response.data.error);
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
        <p>AGREGA TU NUEVO USUARIO Y CONTRASEÑA</p>

        <div>
          <label>USUARIO:</label>
          <input type="text" value={newusername} onChange={(e) => setNewusername(e.target.value)} />
          <label>CONTRASEÑA:</label>
          <input type="text" value={newpassword} onChange={(e) => setNewpassword(e.target.value)} />
          <button onClick={handleInsertlogData}>Insertar Datos</button>
        </div>

        <table>
          <thead>
            <tr>
              <th>username</th>
              <th>password</th>
            </tr>
          </thead>
          <tbody>
            {currentItems.map((item, index) => (
              <tr key={index}>
                <td>{item.username}</td>
                <td>{item.password}</td>
                <td>
                  <button onClick={() => handleDelete(item.id)}>Eliminar</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>

        <div className="pagination">
          <button onClick={handlePrevPage} disabled={currentPage === 1}>Atrás</button>
          <button onClick={handleNextPage} disabled={indexOfLastItem >= logiData.length}>Siguiente</button>
        </div>
      </div>
    </div>
  );
};

export default ModalButton4;
