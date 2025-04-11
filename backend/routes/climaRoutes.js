// backend/routes/climaRoutes.js
const express = require('express'); // Se importa Express para usar su sistema de enrutamiento
const climaController = require('../controllers/climaController'); // Se importa el controlador que contiene la lógica para obtener el clima
const router = express.Router(); // Se crea una instancia del enrutador de Express

// Ruta GET que recibe una ciudad como parámetro en la URL.
// Esta ruta llama al método 'obtenerClima' del controlador cuando se accede a '/clima/:ciudad'.
router.get('/clima/:ciudad', climaController.obtenerClima);

module.exports = router; // Se exporta el enrutador para poder usarlo en otras partes de la aplicación
