import React, { useState } from 'react';
import './App.css'; // Archivo de estilos CSS
import ModalButton1 from './ModalButton1';
import ModalButton2 from './ModalButton2';
import ModalButton3 from './ModalButton3';


const HomePage = ({ onLogout }) => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [showModal1, setShowModal1] = useState(false);
  const [showModal2, setShowModal2] = useState(false);
  const [showModal3, setShowModal3] = useState(false);



  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };




  return (
    <div>
    {/* Three dark purple buttons */}
    <button className="purple-button" onClick={() => setShowModal1(true)}>¿Que Pasó hoy?</button>
    <button className="purple-button" onClick={() => setShowModal2(true)}>Button 2</button>
    <button className="purple-button" onClick={() => setShowModal3(true)}>Button 3</button>

    {showModal1 && <ModalButton1 onClose={() => setShowModal1(false)} />}
    {showModal2 && <ModalButton2 onClose={() => setShowModal2(false)} />}
    {showModal3 && <ModalButton3 onClose={() => setShowModal3(false)} />}

    


    <div className="page-container">
      <div className={`menu-btn ${menuOpen ? 'open' : ''}`} onClick={toggleMenu}>

        <div className="menu-btn_burger">😺MENU</div>
      </div>
      <nav className={`menu ${menuOpen ? 'open' : ''}`}>
        <ul>
          <li onClick={() => setShowModal1(true)}>Que Paso Hoy?</li>
          <li>Opción 2</li>
          <li>Opción 3</li>
          <li>Opción 4</li>
          <li>Opción 5</li>
          <li>
            <button onClick={onLogout}>Cerrar Sesión</button>
          </li>
        </ul>
      </nav>
      
      <div className="content-container">
        <h1>Breathe Slowly</h1>
        {/* Contenido de la página de inicio */}
      </div>
    </div>
    </div>

  );
};

export default HomePage;
