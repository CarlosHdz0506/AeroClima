// backend/services/vueloService.js
const axios = require('axios'); // Importa el módulo axios para realizar solicitudes HTTP
require('dotenv').config(); // Carga las variables de entorno desde un archivo .env

// Lee las claves de la API de Amadeus desde las variables de entorno
const AMADEUS_API_KEY = process.env.AMADEUS_API_KEY;
const AMADEUS_API_SECRET = process.env.AMADEUS_API_SECRET;

const obtenerVuelos = async (origen, destino, fecha) => { // Función asíncrona para obtener vuelos usando la API de Amadeus
  try {
    const tokenResponse = await axios.post( // Solicita un token de acceso a la API de Amadeus usando las credenciales
      'https://test.api.amadeus.com/v1/security/oauth2/token',  // URL para obtener el token
      `grant_type=client_credentials&client_id=${AMADEUS_API_KEY}&client_secret=${AMADEUS_API_SECRET}`,  // Cuerpo de la petición
      {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'  // Encabezado necesario para este tipo de solicitud
        }
      }
    );

    const accessToken = tokenResponse.data.access_token; // Guarda el token de acceso que se usará en la siguiente petición

    const vuelosResponse = await axios.get('https://test.api.amadeus.com/v2/shopping/flight-offers', { // Con el token obtenido, realiza una solicitud GET a la API de vuelos de Amadeus
      headers: {
        Authorization: `Bearer ${accessToken}`  // Se pasa el token en los headers
      },
      params: {
        originLocationCode: origen, // Código IATA del aeropuerto de origen
        destinationLocationCode: destino, // Código IATA del aeropuerto de destino
        departureDate: fecha, // Fecha de salida
        adults: 1  // Número de adultos (por defecto 1)
      }
    });

    return vuelosResponse.data.data; // Retorna solo la parte importante de la respuesta: los datos de vuelos
  } catch (error) {
    console.error("Error al obtener vuelos desde Amadeus:", error.response || error.message); // Imprime el error si algo falla, mostrando la respuesta de la API si está disponible
    throw error; // Lanza el error para que sea manejado en otro lugar (por ejemplo, en el controlador)
  }
};

module.exports = { obtenerVuelos }; // Exporta la función para que pueda ser usada en otros archivos
