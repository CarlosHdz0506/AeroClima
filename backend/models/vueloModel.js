// backend/models/vueloModel.js

// Se crea una lista de objetos que representan vuelos disponibles.
// Cada vuelo tiene un id, una ciudad de origen, una ciudad de destino, una fecha y una hora.
const vuelos = [
    { id: 1, origen: 'Madrid', destino: 'Barcelona', fecha: '2025-05-01', hora: '10:00' },
    { id: 2, origen: 'New York', destino: 'London', fecha: '2025-06-15', hora: '15:00' },
];

const obtenerVuelos = () => { // Función que retorna todos los vuelos disponibles en la lista
    return vuelos;  // Retorna el arreglo completo de vuelos
};

module.exports = { obtenerVuelos }; // Se exporta la función 'obtenerVuelos' para que pueda ser usada en otras partes del proyecto
