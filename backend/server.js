const express = require('express'); // Importa el framework Express para crear el servidor
const { obtenerVuelos } = require('./services/vueloService'); // Importa la función obtenerVuelos desde el archivo vueloService.js
const cors = require('cors');  // Importa el módulo CORS para permitir solicitudes desde otros orígenes (por ejemplo, desde el frontend)
const app = express(); // Crea una instancia de la aplicación Express

app.use(cors());// Middleware para habilitar CORS en todas las rutas (permite que el frontend se comunique con este backend)

app.get('/api/vuelos', async (req, res) => {// Ruta GET para obtener vuelos: se accede desde el frontend como /api/vuelos
  const { origen, destino, fecha } = req.query; // Extrae los parámetros de consulta (query params) de la URL: origen, destino y fecha

  try {
    const vuelos = await obtenerVuelos(origen, destino, fecha);// Llama a la función obtenerVuelos con los parámetros y espera la respuesta
    res.json(vuelos);// Responde al cliente con la lista de vuelos en formato JSON
  } catch (err) {
    console.error("Error al obtener vuelos:", err);// Muestra el error en la consola si algo falla
    res.status(500).send('Error al obtener vuelos');// Devuelve un estado 500 al cliente indicando un error interno en el servidor
  }
});

app.listen(3001, () => {// Inicia el servidor para que escuche en el puerto 3001
  console.log('Servidor backend corriendo en puerto 3001');// Imprime un mensaje en la consola indicando que el servidor está funcionando
});
