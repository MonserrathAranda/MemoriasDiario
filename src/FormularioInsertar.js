

import React, { useState } from 'react';
import axios from 'axios';

const FormularioInsertar = ({ onClose, onInsert }) => {
  const [texto, setTexto] = useState('');
  const [fecha, setFecha] = useState('');

  const handleInsertar = async () => {
    try {
      const response = await axios.post('http://localhost:5000/descripcion', { texto, fecha });
      console.log(response.data);
      if (response.data.success) {
        onInsert(); 
        onClose(); 
      } else {
        console.error('Error al insertar datos:', response.data.error);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  return (
    <div className="formulario">
      <label>
        Texto:
        <input type="text" value={texto} onChange={(e) => setTexto(e.target.value)} />
      </label>
      <label>
        Fecha:
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
      </label>
      <button onClick={handleInsertar}>Insertar</button>
    </div>
  );
};

export default FormularioInsertar;
