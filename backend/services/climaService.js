// backend/services/climaService.js
const axios = require('axios'); // Se importa el módulo axios para hacer solicitudes HTTP
// Lee las claves de la API de OpenWeather desde las variables de entorno
const OpenWeather_apiKey = process.env.OpenWeather_apiKey;

const obtenerClima = async (ciudad) => { // Función asíncrona para obtener el clima de una ciudad
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${OpenWeather_apiKey}&units=metric`; // URL de la API con los parámetros ciudad, API key y unidades en grados Celsius

  try {
    const response = await axios.get(url); // Se realiza una solicitud GET a la API
    return response.data; // Se devuelve solo el contenido de la respuesta (los datos del clima)
  } catch (error) {
    console.error('Error en la solicitud:', error); // En caso de error, se imprime en consola
    throw error;// Se lanza el error para que sea manejado por el controlador que llame esta función
  }
};

module.exports = { obtenerClima }; // Se exporta la función obtenerClima para que esté disponible en otros archivos
