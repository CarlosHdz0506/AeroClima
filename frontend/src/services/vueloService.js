import axios from 'axios';  // Importa la librería axios para realizar solicitudes HTTP

export async function obtenerVuelos(origen, destino, fecha) { // Función para obtener vuelos desde el backend
  const response = await axios.get('http://localhost:3001/api/vuelos', { // Realiza una solicitud GET al servidor backend para obtener los vuelos, pasando los parámetros 'origen', 'destino' y 'fecha' en la URL
    params: { origen, destino, fecha },  // Los parámetros de la consulta se incluyen en el objeto 'params'
  });
  
  return response.data; // Devuelve los datos de la respuesta que contienen la lista de vuelos
}
