// backend/controllers/climaController.js
const climaService = require('../services/climaService');// Se importa el servicio del clima desde la carpeta de servicios

const obtenerClima = (req, res) => { // Controlador para obtener el clima de una ciudad
  const { ciudad } = req.params;  // Se extrae el parámetro 'ciudad' de los parámetros de la ruta 

  try {
    const clima = climaService.obtenerClima(ciudad);// Se obtiene la información del clima llamando a la función del servicio
    if (clima) {
      res.json(clima); // Si se recibe información del clima, se envía como respuesta en formato JSON
    } else {
      res.status(404).json({ error: 'Ciudad no encontrada' });// Si no se encontró información del clima, se responde con un estado 404 y un mensaje de error
    }
  } catch (error) {
    res.status(500).json({ error: 'Hubo un problema al obtener el clima' });// Si ocurre algún error al obtener el clima, se responde con un estado 500 y un mensaje de error
  }
};

module.exports = { obtenerClima };// Se exporta el controlador para que pueda ser utilizado en las rutas