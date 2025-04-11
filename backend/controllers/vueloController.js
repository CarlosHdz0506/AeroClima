// backend/controllers/vueloController.js
const vueloService = require('../services/vueloService'); // Se importa el servicio de vuelos que contiene la lógica para consultar los vuelos

const obtenerVuelos = async (req, res) => {// Controlador asincrónico para obtener vuelos según los parámetros de consulta
  const { origen, destino, fecha } = req.query;// Se extraen los parámetros 'origen', 'destino' y 'fecha' desde la URL 

  try {
    const vuelos = await vueloService.obtenerVuelos(origen, destino, fecha); // Se llama al servicio de vuelos para obtener la lista de vuelos según los parámetros recibidos
    res.json(vuelos); // Si se obtienen vuelos correctamente, se envían como respuesta en formato JSON
  } catch (error) {
    res.status(500).json({ message: 'Error al obtener los vuelos' }); // Si ocurre algún error durante la obtención de vuelos, se responde con un estado 500 (error interno)
  }
};

module.exports = { obtenerVuelos }; // Se exporta el controlador para que pueda ser usado en las rutas del backend