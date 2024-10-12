import React, { useState } from 'react';
import axios from 'axios';
import './Upload.css'; // Importamos el archivo CSS

const Upload = () => {
  const [file, setFile] = useState(null);
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
        setUploadStatus('Archivo subido con éxito. Resultados: ' + JSON.stringify(response.data));
      } catch (error) {
        console.error('Error subiendo el archivo:', error);
        setUploadStatus('Error al subir el archivo.');
      }
    } else {
      alert('Por favor, seleccione un archivo.');
    }
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
    </div>
  );
};

export default Upload;
