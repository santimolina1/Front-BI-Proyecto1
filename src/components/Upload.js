import React, { useState } from 'react';

const Upload = () => {
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (file) {
      const formData = new FormData();
      formData.append('file', file);

      // Aquí realizarías la llamada a la API para subir el archivo
      // Simulación de subida exitosa
      alert(`Archivo ${file.name} subido con éxito.`);
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
    </div>
  );
};

export default Upload;
