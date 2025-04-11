// frontend/src/components/Clima.jsx
import React, { useState } from 'react'; // Importa React y el hook useState para manejar estados en el componente
import climaService from '../services/climaService'; // Importa el servicio personalizado que se encarga de obtener datos del clima
import './styles/Clima.css'; // Importa los estilos específicos de la vista Clima

export default function Clima() { // Define y exporta el componente funcional Clima
  const [ciudad, setCiudad] = useState(''); // Estado para almacenar el nombre de la ciudad ingresada
  const [clima, setClima] = useState(null); // Estado para guardar los datos del clima recibidos
  const [error, setError] = useState(null); // Estado para guardar mensajes de error
  const [loading, setLoading] = useState(false); // Estado para mostrar mensaje de carga mientras se obtienen los datos
  const [isCelsius, setIsCelsius] = useState(true); // Estado para alternar entre Celsius y Fahrenheit

  const obtenerClima = async () => { // Función asincrónica que obtiene los datos del clima
    // Verifica si el usuario tiene conexión a internet
    if (!navigator.onLine) {
      setError('No estás conectado a internet. Por favor verifica tu conexión.');
      setClima(null);
      return;
    }

    setLoading(true); // Muestra indicador de carga
    setError(null);   // Limpia errores anteriores

    try {
      // Llama al servicio para obtener el clima de la ciudad
      const datosClima = await climaService.obtenerClima(ciudad);
      
      // Si la API devuelve código 404, significa que la ciudad no fue encontrada
      if (datosClima.cod === '404') {
        setClima(null);
      } else {
        setClima(datosClima); // Guarda los datos del clima
      }
    } catch (err) {
      // Muestra mensaje si ocurre un error en la petición
      setError('Error al obtener el clima. Intenta una ciudad, país o estado válido.');
      setClima(null);
    } finally {
      setLoading(false); // Oculta el indicador de carga
    }
  };

  // Función que se ejecuta al enviar el formulario
  const handleSubmit = (e) => {
    e.preventDefault(); // Previene el comportamiento por defecto del formulario
    if (!ciudad.trim()) {
      setError('Por favor, ingresa una ciudad, estado o país.');
    } else {
      obtenerClima(); // Llama a la función para obtener el clima
    }
  };

  // Cambia entre Celsius y Fahrenheit
  const toggleTemperatureUnit = () => {
    setIsCelsius((prev) => !prev);
  };

  // Genera recomendaciones basadas en la temperatura y descripción del clima
  const obtenerRecomendaciones = (temp, descripcion) => {
    if (descripcion.includes("rain") || descripcion.includes("lluvia")) {
      return "🌧️ Lleva un paraguas o impermeable.";
    } else if (temp < 10) {
      return "🧥 Hace frío. Se recomienda llevar abrigo y ropa térmica.";
    } else if (temp >= 10 && temp < 20) {
      return "🧣 Clima fresco. Usa ropa ligera con una chaqueta.";
    } else if (temp >= 20 && temp < 30) {
      return "👕 Clima templado. Ropa ligera y cómoda es ideal.";
    } else if (temp >= 30) {
      return "🌞 Hace calor. Usa ropa fresca, protector solar y mantente hidratado.";
    } else {
      return "Consulta el clima antes de salir.";
    }
  };
  
  // JSX que representa el contenido de la vista
  return (
    <div className="clima-container">
      {/* Título del componente */}
      <h2 className="clima-header">Consultar Clima</h2>

      {/* Descripción breve del funcionamiento */}
      <p className="clima-description">
        Puedes consultar el clima de ciudades, países o estados y cambiar entre Celsius y Fahrenheit.
      </p>

      {/* Formulario para ingresar la ciudad */}
      <form onSubmit={handleSubmit} className="clima-form">
        <input
          type="text"
          value={ciudad}
          onChange={(e) => setCiudad(e.target.value)} // Actualiza el estado con el texto ingresado
          placeholder="Ingresa una ciudad"
          className="clima-input"
        />
        <button type="submit" className="clima-button">Obtener Clima</button>
      </form>

      {/* Muestra mensaje de error si existe */}
      {error && <p className="clima-error">{error}</p>}

      {/* Muestra mensaje de carga si está cargando */}
      {loading && <p className="clima-loading">Cargando...</p>}

      {/* Si existen datos de clima, se muestran */}
      {clima && (
        <div className="clima-info">
          <h3 className="clima-city">Clima en {clima.name}</h3>

          <div className="clima-details">
            {/* Icono del clima */}
            <div className="clima-icon-container">
              <img
                src={`http://openweathermap.org/img/wn/${clima.weather[0].icon}.png`}
                alt={clima.weather[0].description}
                className="clima-icon"
              />
            </div>

            {/* Muestra la temperatura con la unidad seleccionada */}
            <p className="clima-temp">
              Temperatura: {isCelsius ? clima.main.temp : (clima.main.temp * 9 / 5 + 32).toFixed(1)}°{isCelsius ? 'C' : 'F'}
            </p>

            {/* Muestra la descripción, humedad y viento */}
            <p className="clima-desc">Descripción: {clima.weather[0].description}</p>
            <p className="clima-humidity">Humedad: {clima.main.humidity}%</p>
            <p className="clima-wind">Viento: {clima.wind.speed} m/s</p>

            {/* Muestra la recomendación basada en el clima */}
            <p className="clima-recomendacion">
              <strong>Recomendación:</strong> {obtenerRecomendaciones(clima.main.temp, clima.weather[0].description)}
            </p>
          </div>

          {/* Botón para cambiar de Celsius a Fahrenheit o viceversa */}
          <button onClick={toggleTemperatureUnit} className="clima-toggle-unit">
            Cambiar a {isCelsius ? 'Fahrenheit' : 'Celsius'}
          </button>
        </div>
      )}
    </div>
  );
}
