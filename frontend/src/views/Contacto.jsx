// frontend/src/components/Contacto.jsx
import React from 'react'; // Importa React para poder usar JSX
import './styles/Contacto.css'; // Importa los estilos específicos para esta vista 

// Componente funcional Contacto
const Contacto = () => {
  return (
    // Sección que contiene todo el bloque de contacto
    <section className="contacto-section">
      <div className="contacto-content"> {/* Contenedor principal del contenido */}

        {/* Título principal de la sección */}
        <h2 className="contacto-header">Contacto</h2>

        {/* Descripción que invita al usuario a comunicarse */}
        <p className="contacto-description">
          ¿Tienes dudas o necesitas más información? ¡No dudes en escribirme!
        </p>

        {/* Información de contacto personal: correo y ubicación */}
        <div className="contacto-info">
          <p><strong>Email:</strong> ch6382427@gmail.com</p>
          <p><strong>Ubicación:</strong> Ciudad Juárez, México</p>
        </div>

        {/* Enlaces a redes sociales */}
        <div className="contacto-redes">
          <p className="contacto-social-text">También puedes encontrarme en:</p>
          <ul>
            {/* Enlace a Facebook (se abre en nueva pestaña) */}
            <li>
              <a 
                href="https://www.facebook.com/carlos.hernandez.282418" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>

            {/* Enlace a Instagram */}
            <li>
              <a 
                href="https://www.instagram.com/ch4785836/" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>

            {/* Enlace a TikTok */}
            <li>
              <a 
                href="https://www.tiktok.com/@carloshernandez2952" 
                target="_blank" 
                rel="noopener noreferrer"
              >
                TikTok
              </a>
            </li>
          </ul>
        </div>
      </div>
    </section>
  );
};

export default Contacto; // Exporta el componente para que pueda ser utilizado en otros archivos