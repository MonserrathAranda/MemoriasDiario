// App.js
import './App.css'
import React, { useState } from 'react';
import axios from 'axios';
import HomePage from './HomePage';

const App = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loggedIn, setLoggedIn] = useState(false);

  const handleLogin = async () => {
    try {
      const response = await axios.post('http://localhost:5000/login', {
        username,
        password,
      });

      if (response.data.success) {
        alert(response.data.message);
        setLoggedIn(true);
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      console.error('Error en la solicitud:', error.message);
    }
  };

  const handleLogout = () => {
    setLoggedIn(false);
  };

  if (loggedIn) {
    return <HomePage onLogout={handleLogout} />;
  }

  return (
    <div className="container">
      <h1>Login</h1>
      <label>Usuario:</label>
      <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      <br />
      <label>Contraseña:</label>
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <br />
      <button onClick={handleLogin}>Iniciar Sesión</button>
    </div>
  );
};

export default App;
