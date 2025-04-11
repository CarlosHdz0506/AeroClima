import React, { useState, useEffect } from 'react';  // Importa React y los hooks useState y useEffect
import Header from './views/Header';  // Importa la vista Header
import VuelosList from './views/VuelosList';  // Importa la vista VuelosList
import Clima from './views/Clima';  // Importa la vista Clima
import Contacto from './views/Contacto';  // Importa la vista Contacto
import Loader from './views/Loader';  // Importa la vista Loader (pantalla de carga)
import avionImage from './images/Avion.avif';  // Importa la imagen del avión
import './App.css';  // Importa los estilos CSS para la aplicación

function App() {
  const [loading, setLoading] = useState(true);  // Crea un estado 'loading' para controlar la carga de la página, inicializado como true

  useEffect(() => {
    // Simula el tiempo de carga de la página
    setTimeout(() => {
      setLoading(false);  // Después de 3 segundos, oculta el Loader
    }, 3000);
  }, []);  // Este efecto solo se ejecuta una vez cuando el componente se monta

  return (
    <div>
      {loading && <Loader />}  {/* Muestra el componente Loader mientras el estado 'loading' es true */}

      <Header />  {/* Muestra el componente Header */}

      {/* Imagen de avión */}
      <section id="imagen-avion">  
        <img 
          src={avionImage}  // Usa la imagen importada del avión
          alt="Avión"  // Texto alternativo para la imagen
          className="imagen-avion"  // Asigna la clase CSS 'imagen-avion' a la imagen
        />
      </section>

      <main>
        <section id="vuelos">  {/* Sección para mostrar la lista de vuelos */}
          <VuelosList />  {/* Muestra el componente VuelosList */}
        </section>

        <section id="clima">  {/* Sección para mostrar el clima */}
          <Clima />  {/* Muestra el componente Clima */}
        </section>

        <section id="contacto">  {/* Sección para mostrar la información de contacto */}
          <Contacto />  {/* Muestra el componente Contacto */}
        </section>
      </main>
    </div>
  );
}

export default App;  // Exporta el componente App para que pueda ser utilizado en otros lugares
