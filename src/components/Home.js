import React from 'react';
import './Home.css'; // Importamos el archivo CSS

// Importamos las imágenes
import banner from '../assets/images/banner.png'; // Asegúrate de tener esta imagen
import ods3 from '../assets/images/ods3.png';
import ods4 from '../assets/images/ods4.png';
import ods5 from '../assets/images/ods5.png';

const Home = () => {
  return (
    <div className="home-container">
      {/* Banner de imagen */}
      <div className="banner">
        <img src={banner} alt="Banner ODS" />
      </div>

      {/* Sección de introducción */}
      <section className="intro-section">
        <h1>Objetivos de Desarrollo Sostenible (ODS)</h1>
        <p className="intro-text">
          Los Objetivos de Desarrollo Sostenible son un llamado universal a la acción para poner fin a la pobreza, proteger el planeta y mejorar las vidas y las perspectivas de las personas en todo el mundo.
        </p>
      </section>

      {/* ODS secciones con íconos */}
      <section className="ods-section">
        <div className="ods-item">
          <img src={ods3} alt="ODS 3" />
          <h2>ODS 3: Salud y Bienestar</h2>
          <p>Garantizar una vida sana y promover el bienestar para todos en todas las edades es esencial para el desarrollo sostenible.</p>
        </div>

        <div className="ods-item">
          <img src={ods4} alt="ODS 4" />
          <h2>ODS 4: Educación de Calidad</h2>
          <p>Garantizar una educación inclusiva, equitativa y de calidad y promover oportunidades de aprendizaje durante toda la vida para todos.</p>
        </div>

        <div className="ods-item">
          <img src={ods5} alt="ODS 5" />
          <h2>ODS 5: Igualdad de Género</h2>
          <p>Lograr la igualdad entre los géneros y empoderar a todas las mujeres y las niñas.</p>
        </div>
      </section>
    </div>
  );
};

export default Home;
