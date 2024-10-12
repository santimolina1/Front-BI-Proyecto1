import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Link, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Prediction from './components/Prediction';
import Upload from './components/Upload';
import './App.css';

const App = () => {
  const location = useLocation();

  useEffect(() => {
    // Cambiar el título basado en la ruta
    switch (location.pathname) {
      case '/prediction':
        document.title = "Predicción - ODS Web";
        break;
      case '/upload':
        document.title = "Subir Archivo - ODS Web";
        break;
      default:
        document.title = "Inicio - ODS Web";
        break;
    }
  }, [location.pathname]);

  return (
    <div>
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
    </div>
  );
};

const WrappedApp = () => (
  <Router>
    <App />
  </Router>
);

export default WrappedApp;
