// Importaciones necesarias para la vista
import { useState } from 'react'; // Hook para manejar estados locales
import { obtenerVuelos } from '../services/vueloService'; // Función que consulta los vuelos desde la API
import './styles/VuelosList.css'; // Estilos para el componente
import moment from 'moment-timezone'; // Librería para manejar fechas y zonas horarias
import 'moment/locale/es'; // Importa el idioma español para Moment.js
moment.locale('es'); // Establece el idioma a español

export default function VuelosList() { // Componente principal que permite buscar y visualizar vuelos
  // Estados para manejar los inputs del formulario y los resultados
  const [origen, setOrigen] = useState(""); // Código IATA de origen
  const [destino, setDestino] = useState(""); // Código IATA de destino
  const [fecha, setFecha] = useState(""); // Fecha del vuelo
  const [resultados, setResultados] = useState([]);
  const [mostrarMas, setMostrarMas] = useState(3); // Número de vuelos visibles inicialmente
  const [detallesVisibles, setDetallesVisibles] = useState({}); // Controla qué detalles están visibles
  const [cargando, setCargando] = useState(false); // Estado de carga
  const [error, setError] = useState(""); // Mensaje de error

  // Diccionario que relaciona códigos IATA con zonas horarias
  const zonasPorIATA = {
    MAD: 'Europe/Madrid',
    MEX: 'America/Mexico_City',
    JFK: 'America/New_York',
    LAX: 'America/Los_Angeles',
    CDG: 'Europe/Paris',
  };

  // Función para alternar la visibilidad de los detalles de un vuelo
  const toggleDetalles = (index) => {
    setDetallesVisibles(prevState => ({
      ...prevState, // Conserva el estado anterior
      [index]: !prevState[index] // Cambia el valor booleano del índice
    }));
  };

  // Maneja el envío del formulario
  const handleSubmit = async (e) => {
    e.preventDefault(); // Previene que el formulario recargue la página

    // Validación de campos vacíos
    if (!origen || !destino || !fecha) {
      setError("Por favor, completa todos los campos (Origen, Destino, Fecha).");
      return;
    }

    // Validación de conexión
    if (!navigator.onLine) {
      setError("No tienes conexión a internet. Por favor, revisa tu conexión.");
      setResultados([]);
      return;
    }

    // Validación de formato IATA
    const iataRegex = /^[A-Za-z]{3}$/;
    if (!iataRegex.test(origen) || !iataRegex.test(destino)) {
      setError("El código IATA de origen o destino no es válido. Por favor, utiliza códigos de 3 letras.");
      setResultados([]);
      return;
    }

    // Comienza la búsqueda
    setCargando(true);
    setError("");

    try { // Llama a la API de vuelos
      const datos = await obtenerVuelos(origen, destino, fecha);

      if (datos.length === 0) { // Si no se encontraron vuelos, mostrar mensaje
        setError("No se encontraron vuelos para la fecha seleccionada.");
        setResultados([]);
      } else {// Si hay vuelos, guardar los datos y reiniciar configuraciones de visualización
        setResultados(datos);
        setMostrarMas(3); // Resetea los resultados visibles
        setDetallesVisibles({}); // Resetea los detalles visibles
      }
    } catch (err) { // Captura errores de la API o red
      setError("Ocurrió un error al obtener los vuelos. Intenta de nuevo más tarde.");
    } finally {
      setCargando(false); // Finaliza carga
    }
  };

  // Calcula la duración entre dos fechas
  const calcularDuracion = (salida, llegada) => {
    const fechaSalida = moment(salida.at);
    const fechaLlegada = moment(llegada.at);
    const duracion = moment.duration(fechaLlegada.diff(fechaSalida));
    const horas = Math.floor(duracion.asHours());
    const minutos = duracion.minutes();
    return { horas, minutos };
  };

  return (
    <div className="vuelos-container">
      <h2>Buscar Vuelos</h2>
      <p className="descripcion">
        Consulta los vuelos para viajar alrededor del mundo.
      </p>

      {/* Formulario para ingresar origen, destino y fecha */}
      <form onSubmit={handleSubmit} className="form-vuelos">
        <input placeholder="Origen" value={origen} onChange={(e) => setOrigen(e.target.value)} />
        <input placeholder="Destino" value={destino} onChange={(e) => setDestino(e.target.value)} />
        <input type="date" value={fecha} onChange={(e) => setFecha(e.target.value)} />
        <button type="submit">Buscar</button>
      </form>

      {/* Mensajes de error o de carga */}
      {error && <div className="error-message">{error}</div>}
      {cargando && <div className="cargando-message">Cargando...</div>}

      {/* Nota explicativa sobre los códigos IATA */}
      <p className="nota-iata">
        Para llenar los campos de origen y destino, debes utilizar el formato IATA de 3 letras.
        Por ejemplo, para seleccionar México debes escribir <strong>(MEX)</strong>. Si lo desconoces,
        visita el siguiente link:{" "}
        <a href="https://www.iata.org/en/publications/directories/code-search/" target="_blank" rel="noopener noreferrer">
          Buscar código IATA
        </a>.
      </p>

      {/* Muestra los resultados obtenidos */}
      {resultados.length > 0 && (
        <div>
          <h3>Resultados:</h3>
          {/* Se muestran hasta "mostrarMas" vuelos */}
          {resultados.slice(0, mostrarMas).map((vuelo, index) => {
            const salida = vuelo.itineraries[0].segments[0].departure;
            const llegada = vuelo.itineraries[0].segments.at(-1).arrival;
            const duracion = calcularDuracion(salida, llegada);
            const precio = vuelo.price;

            const zonaSalida = zonasPorIATA[salida.iataCode] || 'UTC';
            const zonaLlegada = zonasPorIATA[llegada.iataCode] || 'UTC';

            const horaSalida = moment(salida.at).tz(zonaSalida).format('h:mm A');
            const horaLlegada = moment(llegada.at).tz(zonaLlegada).format('h:mm A');
            const fechaSalida = moment(salida.at).tz(zonaSalida).format('YYYY-MM-DD');
            
            return (
              <div key={index} className="vuelo-card">
                {/* Resumen del vuelo */}
                <div className="vuelo-resumen">
                  <div>
                    <strong>{salida.iataCode}</strong> → <strong>{llegada.iataCode}</strong>
                  </div>
                  <div>
                    {fechaSalida} — {duracion.horas} horas {duracion.minutos} minutos
                  </div>
                  <div>
                    <strong>${precio.total}</strong>
                  </div>
                </div>

                {/* Línea visual del vuelo */}
                <div className="barra-vuelo">
                  <div className="hora-salida">
                    <div className="hora">{horaSalida}</div>
                    <div className="iata">{salida.iataCode}</div>
                  </div>
                  <div className="duracion">
                    <div className="horas">{duracion.horas} horas</div>
                    <div className="minutos">{duracion.minutos} minutos</div>
                  </div>
                  <div className="hora-llegada">
                    <div className="hora">{horaLlegada}</div>
                    <div className="iata">{llegada.iataCode}</div>
                  </div>
                </div>

                {/* Botón para ver más/menos detalles */}
                <button onClick={() => toggleDetalles(index)} className="btn-detalles">
                  {detallesVisibles[index] ? "Ocultar detalles" : "Ver más detalles"}
                </button>

                {/* Sección de detalles adicionales del vuelo */}
                {detallesVisibles[index] && (
                  <div className="vuelo-detalles">
                    <p><strong>Salida:</strong> {moment(salida.at).tz(zonaSalida).format('dddd, D [de] MMMM [de] YYYY, h:mm a')}</p>
                    <p><strong>Llegada:</strong> {moment(llegada.at).tz(zonaLlegada).format('dddd, D [de] MMMM [de] YYYY, h:mm a')}</p>
                    <p><strong>Duración total:</strong> {duracion.horas} horas {duracion.minutos} minutos</p>
                    <p><strong>Base:</strong> ${precio.base}</p>
                    <p><strong>Moneda:</strong> {precio.currency}</p>
                    <p><strong>Tarifas:</strong> {precio.fees?.map(fee => `${fee.amount} ${fee.type}`).join(', ') || 'N/A'}</p>
                    <p><strong>Total con impuestos:</strong> ${precio.grandTotal}</p>
                  </div>
                )}
              </div>
            );
          })}

          {/* Botón para mostrar más resultados */}
          {mostrarMas < resultados.length && (
            <div className="mostrar-mas-container">
              <button onClick={() => setMostrarMas(mostrarMas + 3)} className="btn-mostrar-mas">
                Mostrar más vuelos
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
