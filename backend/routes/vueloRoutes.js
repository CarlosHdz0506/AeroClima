const express = require("express"); // Se importa el módulo de Express para crear rutas
const router = express.Router(); // Se crea una instancia del router de Express
const { buscarVuelos } = require("../services/vueloService"); // Se importa la función buscarVuelos desde el servicio de vuelos

router.post("/", async (req, res) => { // Ruta POST principal para buscar vuelos
  try {
    const { origen, destino, fecha } = req.body; // Se extraen los datos del cuerpo de la solicitud (origen, destino y fecha)
    const vuelos = await buscarVuelos(origen, destino, fecha); // Se llama a la función buscarVuelos con los parámetros recibidos
    res.json(vuelos); // Se responde con los datos de los vuelos en formato JSON
  } catch (error) {
    res.status(500).json({ error: error.message }); // En caso de error, se devuelve un mensaje de error con estado 500
  }
});

module.exports = router; // Se exporta el router para que pueda ser usado en otras partes del backend
