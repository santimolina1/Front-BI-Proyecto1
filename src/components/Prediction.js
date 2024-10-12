import React, { useState } from 'react';
import axios from 'axios';
import './Prediction.css'; // Importamos el archivo CSS

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
      const response = await axios.post('http://127.0.0.1:8000/prediccion/', opinions.map(opinion => ({ opinion })));
      setResults(response.data);
    } catch (error) {
      console.error('Error haciendo la predicción:', error);
    }
  };

  return (
    <div className="prediction-container">
      <h1 className="title">Predicción de ODS</h1>
      <form className="prediction-form" onSubmit={handleSubmit}>
        {opinions.map((opinion, index) => (
          <div key={index} className="input-group">
            <label>Opinión {index + 1}:</label>
            <input
              type="text"
              value={opinion}
              onChange={(e) => handleInputChange(index, e.target.value)}
              className="input-field"
            />
          </div>
        ))}
        <div className="button-group">
          <button type="button" onClick={addOpinion} className="btn add-opinion">
            Agregar otra opinión
          </button>
          <button type="submit" className="btn submit-btn">
            Enviar
          </button>
        </div>
      </form>

      {/* Mostrar resultados si hay */}
      {results.length > 0 && (
        <div className="results-container">
          <h2>Resultados</h2>
          {results.map((result, index) => (
            <div key={index} className="result-item">
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
