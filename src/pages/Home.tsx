// src/pages/Dashboard.tsx
import { Container, Button } from 'react-bootstrap';
import { FaGithub, FaSignInAlt } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f8fafc' }}>
      <Container className="text-center">
        <h1
          className="display-4 fw-bold mb-3"
          style={{
            color: '#008cba',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            fontSize: '3.2rem',
            letterSpacing: '0.03em',
            lineHeight: 1.1
          }}
        >
          Material para Desarrolladores
        </h1>
        <h2 className="h4 mb-4 text-secondary">Tu espacio para organizar, compartir y descubrir recursos útiles de desarrollo web.</h2>
        <p className="mb-4 text-muted" style={{ maxWidth: 600, margin: '0 auto' }}>
          Gestiona tus páginas favoritas, agrúpalas por categorías, y accede a ellas desde cualquier dispositivo. Únete a la comunidad y comparte tus recursos con otros desarrolladores.
        </p>
        <div className="d-flex flex-column flex-md-row justify-content-center align-items-center gap-3 mb-4">
          <Link to="/register">
            <Button size="lg" variant="primary" className="px-4">
              <FaSignInAlt className="me-2" />Empieza ahora
            </Button>
          </Link>
          <a href="https://github.com/fergone03/material-para-desarrolladores" target="_blank" rel="noopener noreferrer">
            <Button size="lg" variant="outline-dark" className="px-4">
              <FaGithub className="me-2" />GitHub
            </Button>
          </a>
        </div>
        <p className="text-muted small mt-3">¿Tienes dudas? <a href="mailto:fergonesteban03@gmail.com">Contáctanos</a></p>
      </Container>
    </div>
  );
};

export default Home;
