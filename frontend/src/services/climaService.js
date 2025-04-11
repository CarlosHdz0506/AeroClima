// frontend/src/services/climaService.js
const traducirDescripcion = (descripcion) => { // Función para traducir descripciones del clima del inglés al español
  const traducciones = { // Diccionario de traducciones de descripciones del clima
    "clear sky": "Cielo despejado",
    "few clouds": "Pocas nubes",
    "scattered clouds": "Nubes dispersas",
    "broken clouds": "Nubes rotas",
    "shower rain": "Lluvias ligeras",
    "rain": "Lluvia",
    "thunderstorm": "Tormenta eléctrica",
    "snow": "Nieve",
    "mist": "Neblina",
    "haze": "Bruma",
    "dust": "Polvo",
    "fog": "Niebla",
    "tornado": "Tornado",
    "tropical storm": "Tormenta tropical",
  };

  return traducciones[descripcion.toLowerCase()] || descripcion; // Devuelve la traducción correspondiente, o la descripción original si no se encuentra en el diccionario
};

const obtenerClima = async (ciudad) => { // Función para obtener el clima de una ciudad usando la API de OpenWeather
  const apiKey = '6dfaa0a5d34a9529a70962659213db6a';  // API Key de OpenWeather
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad}&appid=${apiKey}&units=metric&lang=es`;  // URL con unidad métrica y lenguaje español

  try {
    const response = await fetch(url); // Realiza la solicitud HTTP a la API
    // Si la respuesta no fue exitosa, lanza un error
    if (!response.ok) {
      throw new Error('Error al obtener el clima');
    }

    const data = await response.json(); // Convierte la respuesta a formato JSON
    // Si hay información del clima, traduce la descripción
    if (data.weather && data.weather.length > 0) {
      const descripcionTraducida = traducirDescripcion(data.weather[0].description);  // Traduce la descripción
      data.weather[0].description = descripcionTraducida;  // Reemplaza la descripción con la traducción
    }
    return data; // Devuelve los datos procesados
  } catch (error) {
    // Si ocurre un error, lo muestra en consola y retorna null
    console.error('Error en la petición:', error);
    return null;
  }
};

const climaService = { obtenerClima }; // Crea un objeto con la función obtenerClima para exportarlo
export default climaService; // Exporta el servicio para usarlo en otros componentes
