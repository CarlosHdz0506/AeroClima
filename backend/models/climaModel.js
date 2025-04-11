// backend/models/climaModel.js
const mongoose = require('mongoose');// Se importa el módulo mongoose para interactuar con MongoDB

const climaSchema = new mongoose.Schema({ // Se define el esquema (estructura) de los documentos de clima en la base de datos
  ciudad: { type: String, required: true, unique: true },// Nombre de la ciudad, debe ser único y obligatorio
  clima: { type: Object, required: true }, // Datos del clima, se guarda como un objeto y es obligatorio
  fecha: { type: Date, default: Date.now } // Fecha en la que se guarda o actualiza el clima, se asigna automáticamente
});

const Clima = mongoose.model('Clima', climaSchema); // Se crea el modelo de Mongoose con el nombre 'Clima' basado en el esquema anterior

const actualizarClima = async (ciudad, climaData) => {// Función asincrónica para actualizar el clima de una ciudad o crearlo si no existe
  try {
    // Busca un registro por ciudad y lo actualiza con nuevos datos,
    // si no existe, lo crea (gracias a 'upsert: true')
    const clima = await Clima.findOneAndUpdate(
      { ciudad: ciudad },  // Filtro: buscar por nombre de ciudad
      { clima: climaData, fecha: Date.now() },  // Datos a actualizar
      { upsert: true, new: true }  // Opciones: crear si no existe, y devolver el nuevo documento
    );
    return clima;  // Devuelve el documento actualizado o creado
  } catch (error) {
    // En caso de error, se imprime en consola y se lanza una excepción
    console.error('Error al guardar el clima:', error);
    throw new Error('No se pudo guardar el clima.');
  }
};

module.exports = { Clima, actualizarClima }; // Se exportan tanto el modelo como la función para que puedan ser utilizados en otras partes del backend
