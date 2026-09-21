import { Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import { FaGithub, FaLinkedin } from 'react-icons/fa';

const Footer = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-dark text-white mt-auto" style={{ boxShadow: '0 -2px 12px rgba(0,0,0,0.08)' }}>
      <Container className="d-flex flex-column flex-md-row align-items-center justify-content-between py-3 gap-2">
        <div className="mb-2 mb-md-0" style={{ fontFamily: 'Dancing Script, cursive', fontSize: 20 }}>
          <span style={{ color: '#00bcd4', fontWeight: 700 }}>Material para Desarrolladores</span> &copy; {currentYear}
        </div>
        <div className="mb-2 mb-md-0 small text-muted text-center">
          Comunidad abierta para compartir recursos y crecer juntos.
          <div className="d-flex gap-3 justify-content-center mt-1">
            <Link to="/aviso-legal" className="text-reset">Aviso legal</Link>
            <Link to="/privacidad" className="text-reset">Privacidad</Link>
            <Link to="/cookies" className="text-reset">Cookies</Link>
          </div>
        </div>
        <div className="d-flex gap-3">
          <a href="https://github.com/fergone03/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = '#00bcd4'}
            onMouseOut={e => e.currentTarget.style.color = '#fff'}
            aria-label="GitHub">
            <FaGithub size={22} />
          </a>
          <a href="https://www.linkedin.com/in/estebanfernandezgonzalez/" target="_blank" rel="noopener noreferrer" style={{ color: '#fff', transition: 'color 0.2s' }}
            onMouseOver={e => e.currentTarget.style.color = '#00bcd4'}
            onMouseOut={e => e.currentTarget.style.color = '#fff'}
            aria-label="LinkedIn">
            <FaLinkedin size={22} />
          </a>
        </div>
      </Container>
    </footer>
  );
};

export default Footer;
