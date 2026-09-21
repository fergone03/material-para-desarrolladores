import { Link } from 'react-router-dom';
import LegalPage, { Email, TITULAR } from './LegalPage';

export default function Privacidad() {
  return (
    <LegalPage title="Política de privacidad">
      <p>
        Esta política explica qué datos personales se tratan en Material para Desarrolladores, conforme al
        Reglamento (UE) 2016/679 (RGPD) y a la Ley Orgánica 3/2018 (LOPDGDD).
      </p>

      <h2 className="h4 mt-4">1. Responsable del tratamiento</h2>
      <ul>
        <li><strong>Responsable:</strong> {TITULAR.nombre}</li>
        <li><strong>Contacto:</strong> <Email /></li>
      </ul>

      <h2 className="h4 mt-4">2. Qué datos se tratan</h2>
      <ul>
        <li>
          <strong>Datos de tu cuenta:</strong> correo electrónico, que también se usa como nombre de usuario, y
          contraseña. La contraseña se guarda cifrada con un hash (bcrypt) y nadie puede leerla. Tu correo se usa
          solo para confirmar la cuenta y para recuperar la contraseña si lo pides.
        </li>
        <li>
          <strong>Contenido que creas:</strong> las páginas y categorías que guardas, con su fecha de creación.
        </li>
        <li>
          <strong>Datos técnicos:</strong> el servidor registra la dirección IP, la fecha y la dirección visitada
          de cada petición.
        </li>
      </ul>
      <p>
        El formulario de la página «Sobre nosotros» no envía ni guarda ningún dato. Si solo navegas sin
        registrarte, únicamente se tratan los datos técnicos.
      </p>

      <h2 className="h4 mt-4">3. Para qué y con qué base legal</h2>
      <ul>
        <li>
          <strong>Gestionar tu cuenta y guardar tus páginas.</strong> Base legal: la prestación del servicio que
          solicitas al registrarte (art. 6.1.b RGPD).
        </li>
        <li>
          <strong>Seguridad del sitio</strong> (detectar abusos y ataques) mediante los registros del servidor.
          Base legal: interés legítimo del responsable (art. 6.1.f RGPD).
        </li>
      </ul>
      <p>No se envían comunicaciones comerciales ni se elaboran perfiles.</p>

      <h2 className="h4 mt-4">4. Cuánto tiempo se conservan</h2>
      <ul>
        <li>Los datos de la cuenta y tus páginas se conservan mientras la cuenta exista y se borran al eliminarla.</li>
        <li>Los registros del servidor se borran automáticamente a los 14 días.</li>
      </ul>

      <h2 className="h4 mt-4">5. Destinatarios</h2>
      <p>
        No se ceden datos a terceros salvo obligación legal. El sitio se aloja en un servidor de OVHcloud
        (OVH SAS, Francia) y los correos de confirmación y recuperación de contraseña se envían mediante Brevo
        (Sendinblue SAS, Francia). Ambos actúan como encargados del tratamiento. Los datos no salen de la Unión
        Europea.
      </p>

      <h2 className="h4 mt-4">6. Tus derechos</h2>
      <p>
        Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación del tratamiento y
        portabilidad escribiendo a <Email />. Para borrar tu cuenta basta con pedirlo desde el correo con el que
        te registraste.
      </p>
      <p>
        Si consideras que no se han atendido tus derechos, puedes reclamar ante la Agencia Española de Protección
        de Datos (<a href="https://www.aepd.es" target="_blank" rel="noopener noreferrer">www.aepd.es</a>).
      </p>

      <h2 className="h4 mt-4">7. Menores</h2>
      <p>Para registrarte debes tener al menos 14 años.</p>

      <h2 className="h4 mt-4">8. Seguridad</h2>
      <p>
        Las comunicaciones con el sitio van cifradas mediante HTTPS y las contraseñas se almacenan con hash.
      </p>

      <p className="mt-4">
        Consulta también el <Link to="/aviso-legal">aviso legal</Link> y la{' '}
        <Link to="/cookies">política de cookies</Link>.
      </p>
    </LegalPage>
  );
}
