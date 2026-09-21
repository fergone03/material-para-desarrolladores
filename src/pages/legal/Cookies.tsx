import { Link } from 'react-router-dom';
import LegalPage from './LegalPage';

export default function Cookies() {
  return (
    <LegalPage title="Política de cookies">
      <h2 className="h4 mt-4">1. Resumen</h2>
      <p>
        Este sitio <strong>no usa cookies</strong>, ni de análisis, ni de publicidad, ni de terceros. Por eso no
        se muestra ningún aviso para aceptarlas.
      </p>

      <h2 className="h4 mt-4">2. Almacenamiento local que sí se usa</h2>
      <p>
        El sitio guarda en tu navegador (<code>localStorage</code>) la siguiente información, estrictamente
        necesaria para el servicio que pides o para recordar una preferencia que tú eliges:
      </p>
      <div className="table-responsive">
        <table className="table table-sm">
          <thead>
            <tr>
              <th>Nombre</th>
              <th>Para qué sirve</th>
              <th>Duración</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td><code>mpd-auth</code></td>
              <td>Mantener tu sesión iniciada.</td>
              <td>Hasta que cierras sesión.</td>
            </tr>
            <tr>
              <td><code>darkMode</code></td>
              <td>Recordar si prefieres el modo oscuro.</td>
              <td>Hasta que lo borras.</td>
            </tr>
          </tbody>
        </table>
      </div>
      <p>
        Estos usos están exentos de consentimiento según el artículo 22.2 de la LSSI-CE. No se comparten con
        nadie.
      </p>

      <h2 className="h4 mt-4">3. Recursos de terceros</h2>
      <p>
        Las fuentes y demás recursos se sirven desde este mismo servidor, así que tu navegador no se conecta a
        servicios externos al visitar el sitio.
      </p>

      <h2 className="h4 mt-4">4. Cómo borrar estos datos</h2>
      <p>
        Puedes eliminarlos cerrando sesión o borrando los datos del sitio desde la configuración de tu navegador.
      </p>

      <p className="mt-4">
        Más información en la <Link to="/privacidad">política de privacidad</Link>.
      </p>
    </LegalPage>
  );
}
