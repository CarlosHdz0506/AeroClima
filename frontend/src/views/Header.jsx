// frontend/src/components/Header.jsx
import React, { useState } from 'react'; // Importa React y el hook useState
import './styles/Header.css'; // Importa el archivo de estilos específico para el encabezado

const Header = () => {
  const slides = [ // Se define un arreglo de slides (diapositivas) con información para mostrar en el carrusel
    { 
      id: 1, 
      title: 'Consulta vuelos', // Título del slide
      description: '¿Te gustaría consultar los vuelos que hay cerca del país?', // Texto descriptivo
      targetId: 'vuelos' // ID de la sección a la que se va a hacer scroll
    },
    { 
      id: 2, 
      title: 'Consulta el clima',
      description: '¿Desconoces cómo es el clima del lugar que deseas viajar?',
      targetId: 'clima'
    },
    { 
      id: 3, 
      title: 'Contáctanos',
      description: '¿Tienes alguna duda sobre la página o valoración?',
      targetId: 'contacto'
    },
  ];

  const [current, setCurrent] = useState(0); // Estado para rastrear la diapositiva actual que se muestra en pantalla
  const goToSlide = (index) => setCurrent(index); // Función para cambiar a una diapositiva específica mediante los puntos indicadores

  // Función que realiza desplazamiento suave hacia la sección con el ID especificado
  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  };

  // JSX que representa el header con un slider/carousel
  return (
    <header className="slider-header">
      <div className="slider-container">
        {/* Contenido dinámico del slide actual */}
        <div className="slider-content">
          <h2>{slides[current].title}</h2>
          <p className="slider-description">{slides[current].description}</p> {/* Descripción adicional */}
          <button
            className="slider-button"
            onClick={() => scrollToSection(slides[current].targetId)} // Va a la sección correspondiente al slide
          >
            Ir a {slides[current].title.toLowerCase()} {/* Texto dinámico del botón */}
          </button>
        </div>

        {/* Puntos de navegación del slider */}
        <div className="slider-dots">
          {slides.map((_, index) => (
            <span
              key={index}
              className={`dot ${index === current ? 'active' : ''}`} // Activo si coincide con el índice actual
              onClick={() => goToSlide(index)} // Cambia a la diapositiva correspondiente
            ></span>
          ))}
        </div>
      </div>
    </header>
  );
};

export default Header; // Exporta el componente para ser usado en otras partes del proyecto
