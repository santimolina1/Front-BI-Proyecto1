import React, { useState } from 'react';
import axios from 'axios';

const Prediction = () => {
  const [opinions, setOpinions] = useState(['']);
  const [results, setResults] = useState([]);

  // Manejar cambios en los inputs
  const handleInputChange = (index, value) => {
    const updatedOpinions = [...opinions];
    updatedOpinions[index] = value;
    setOpinions(updatedOpinions);
  };

  // Añadir una nueva opinión
  const addOpinion = () => {
    setOpinions([...opinions, '']);
  };

  // Manejar el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Enviar las opiniones en el formato esperado por el backend
      const response = await axios.post('http://127.0.0.1:8000/prediccion/', opinions.map(opinion => ({ opinion })));
      setResults(response.data); // Asumimos que el backend devuelve los resultados en el formato correcto
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

      {/* Mostrar resultados si hay */}
      {results.length > 0 && (
        <div style={{ marginTop: '20px' }}>
          <h2>Resultados</h2>
          {results.map((result, index) => (
            <div key={index} style={{ marginBottom: '20px' }}>
              <h3>Opinión {result.opinion}</h3>
              <p>Clase predicha: {result.clase_predicha}</p>
              <h4>Probabilidades:</h4>
              <ul>
                {Object.keys(result.probabilidades).map((ods, i) => (
                  <li key={i}>
                    {ods}: {result.probabilidades[ods]}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Prediction;
