import { Link } from 'react-router-dom';
import LegalPage, { Email, TITULAR } from './LegalPage';

export default function AvisoLegal() {
  return (
    <LegalPage title="Aviso legal">
      <h2 className="h4 mt-4">1. Titular del sitio</h2>
      <p>
        En cumplimiento de la Ley 34/2002, de Servicios de la Sociedad de la Información y de Comercio
        Electrónico (LSSI-CE), se informa de que este sitio web, disponible en{' '}
        <a href={TITULAR.sitio}>{TITULAR.sitio}</a>, es un proyecto personal, gratuito y sin ánimo de lucro de:
      </p>
      <ul>
        <li><strong>Titular:</strong> {TITULAR.nombre}</li>
        <li><strong>Contacto:</strong> <Email /></li>
      </ul>

      <h2 className="h4 mt-4">2. Objeto</h2>
      <p>
        Material para Desarrolladores es una recopilación de enlaces y recursos útiles para desarrolladores,
        organizados por categorías. Los usuarios registrados pueden además guardar sus propias páginas.
        El servicio es gratuito y no incluye publicidad ni venta de productos.
      </p>

      <h2 className="h4 mt-4">3. Condiciones de uso</h2>
      <p>
        El uso del sitio implica la aceptación de este aviso legal. Te comprometes a usarlo de forma lícita y a
        no publicar enlaces a contenido ilegal, malicioso u ofensivo. El titular puede eliminar cualquier contenido
        o cuenta que incumpla estas condiciones.
      </p>

      <h2 className="h4 mt-4">4. Enlaces a terceros</h2>
      <p>
        El sitio contiene enlaces a páginas de terceros. El titular no controla ni se hace responsable de su
        contenido, disponibilidad o políticas de privacidad. Si detectas un enlace a contenido ilícito, escribe
        a <Email /> y se retirará.
      </p>

      <h2 className="h4 mt-4">5. Propiedad intelectual</h2>
      <p>
        El diseño y el código del sitio pertenecen a su titular. Las páginas enlazadas, sus nombres y logotipos
        son propiedad de sus respectivos dueños y se muestran solo como referencia.
      </p>

      <h2 className="h4 mt-4">6. Responsabilidad</h2>
      <p>
        El titular procura que el sitio funcione correctamente, pero no garantiza su disponibilidad continua ni
        responde de los daños derivados de su uso o de interrupciones del servicio.
      </p>

      <h2 className="h4 mt-4">7. Datos personales y cookies</h2>
      <p>
        El tratamiento de datos se explica en la <Link to="/privacidad">política de privacidad</Link> y el uso de
        almacenamiento local en la <Link to="/cookies">política de cookies</Link>.
      </p>

      <h2 className="h4 mt-4">8. Legislación aplicable</h2>
      <p>Este aviso legal se rige por la legislación española.</p>
    </LegalPage>
  );
}
