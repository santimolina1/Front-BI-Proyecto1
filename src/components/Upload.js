import React, { useState } from 'react';
import axios from 'axios';

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
    <div style={{ padding: '20px' }}>
      <h1>Subir archivo para reentrenar modelo</h1>
      <form onSubmit={handleSubmit}>
        <input type="file" accept=".xlsx" onChange={handleFileChange} />
        <button type="submit" style={{ marginTop: '10px' }}>Subir archivo</button>
      </form>

      {uploadStatus && (
        <div style={{ marginTop: '20px' }}>
          <h2>{uploadStatus}</h2>
        </div>
      )}
    </div>
  );
};

export default Upload;
