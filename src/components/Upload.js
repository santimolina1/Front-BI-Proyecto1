import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css'; // Importamos el archivo CSS

const Upload = () => {
  const [file, setFile] = useState(null);
  const [results, setResults] = useState(null);
  const [uploadStatus, setUploadStatus] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      try {
        const response = await axios.post('http://127.0.0.1:8000/reentrenar/', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        setResults(response.data); // Guardamos los resultados del entrenamiento
        setUploadStatus('Archivo subido con éxito.');
      } catch (error) {
        console.error('Error subiendo el archivo:', error);
        setUploadStatus('Error al subir el archivo.');
      }
    } else {
      alert('Por favor, seleccione un archivo.');
    }
  };

  const odsMapping = {
    1: 'ODS 3: Salud y Bienestar',
    2: 'ODS 4: Educación de Calidad',
    3: 'ODS 5: Igualdad de Género'
  };

  return (
    <div className="upload-container">
      <h1 className="title">Subir archivo para reentrenar modelo</h1>
      <form className="upload-form" onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} className="file-input" />
        <button type="submit" className="btn upload-btn">Subir archivo</button>
      </form>

      {uploadStatus && (
        <div className={`status-message ${uploadStatus.includes('éxito') ? 'success' : 'error'}`}>
          <h2>{uploadStatus}</h2>
        </div>
      )}

      {/* Mostrar resultados si hay */}
      {results && (
        <div className="results-container">
          <h2>Resultados del Reentrenamiento</h2>
          <table className="results-table">
            <thead>
              <tr>
                <th>ODS</th>
                <th>Precisión</th>
                <th>Recall</th>
                <th>F1-Score</th>
              </tr>
            </thead>
            <tbody>
              {Object.keys(results).map((key) => (
                <tr key={key}>
                  <td>{odsMapping[key]}</td>
                  <td>{results[key]["precision"].toFixed(2)}</td>
                  <td>{results[key]["recall"].toFixed(2)}</td>
                  <td>{results[key]["f1-score"].toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Upload;
