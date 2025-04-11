// frontend/src/components/Loader.jsx
import React, { useState, useEffect } from 'react'; // Importa los hooks de React necesarios
import './styles/Loader.css'; // Importa el archivo de estilos para el loader

const Loader = () => { // Componente Loader que muestra un indicador de carga
  const [loading, setLoading] = useState(true); // Estado para controlar si está cargando o no

  useEffect(() => { // useEffect que se ejecuta una sola vez al montar el componente
    const timer = setTimeout(() => { // Se crea un temporizador que cambia el estado 'loading' a 'false' después de 3 segundos
      setLoading(false);  // Cambia el estado a 'false' después de 3 segundos 
    }, 3000);  // Tiempo de espera (3 segundos en este caso, ajustable)

    return () => clearTimeout(timer);  // Limpiar el temporizador cuando el componente se desmonte para evitar errores
  }, []); // Dependencia vacía asegura que solo se ejecute una vez al montar el componente

  if (loading) { // Si la variable 'loading' es true, muestra el loader
    return (
      <div className="loader-container"> {/* Contenedor para el loader, que incluye el indicador de carga y la animación */}
        <div className="loader">
          <div className="loader-bar"></div> {/* Barra de carga */}
          <div className="loader-animation">
            <span role="img" aria-label="avión" className="loader-plane">✈️</span> {/* Icono de avión animado */}
          </div>
        </div>
        <h2 className="loading-text">AeroClima Cargando...</h2> {/* Texto que aparece durante la carga */}
      </div>
    );
  }

  return null; // Si la carga ha terminado, no se muestra nada del loader
};

export default Loader; // Exporta el componente Loader para que pueda ser utilizado en otras partes de la aplicación