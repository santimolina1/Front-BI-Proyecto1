import React, { useState } from 'react';
import axios from 'axios';

const Prediction = () => {
  const [opinions, setOpinions] = useState(['']);
  const [results, setResults] = useState([]);

  const handleInputChange = (index, value) => {
    const updatedOpinions = [...opinions];
    updatedOpinions[index] = value;
    setOpinions(updatedOpinions);
  };

  const addOpinion = () => {
    setOpinions([...opinions, '']);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/prediccion/', opinions.map(opinion => ({ opinion })));
      setResults(response.data); // Asume que tu backend devuelve una lista de predicciones
    } catch (error) {
      console.error('Error haciendo la predicción:', error);
    }
  };

  return (
    <div style={{ padding: '20px' }}>
      <h1>Predicción de ODS</h1>
      <form onSubmit={handleSubmit}>
        {opinions.map((opinion, index) => (
          <div key={index} style={{ marginBottom: '10px' }}>
            <label>Opinión {index + 1}:</label>
            <input
              type="text"
              value={opinion}
              onChange={(e) => handleInputChange(index, e.target.value)}
              style={{ width: '100%', padding: '5px', margin: '5px 0' }}
            />
          </div>
        ))}
        <button type="button" onClick={addOpinion}>Agregar otra opinión</button>
        <button type="submit" style={{ marginLeft: '10px' }}>Enviar</button>
      </form>

      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultados</h2>
          {results.map((result, index) => (
            <div key={index}>
              <p>Opinión {index + 1}: {result.ods} - {result.porcentaje}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prediction;
