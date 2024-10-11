import React from 'react';
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Home from './components/Home';
import Prediction from './components/Prediction';
import Upload from './components/Upload';
import './App.css'; // Importamos el CSS para estilos de la barra de navegación

const App = () => {
  return (
    <Router>
      <header className="navbar">
        <div className="navbar-container">
          <h1 className="navbar-logo">ODS Web</h1>
          <nav>
            <ul className="nav-links">
              <li><Link to="/">Inicio</Link></li>
              <li><Link to="/prediction">Predicción</Link></li>
              <li><Link to="/upload">Subir Archivo</Link></li>
            </ul>
          </nav>
        </div>
      </header>

      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/prediction" element={<Prediction />} />
          <Route path="/upload" element={<Upload />} />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
