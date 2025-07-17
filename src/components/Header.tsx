import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaSignOutAlt } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(() => {
    // Preferencia guardada o preferencia del sistema
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('darkMode');
      if (saved !== null) return saved === 'true';
      return window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches;
    }
    return false;
  });

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark');
    } else {
      document.body.classList.remove('dark');
    }
    localStorage.setItem('darkMode', darkMode.toString());
  }, [darkMode]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleDarkMode = () => setDarkMode((prev) => !prev);

  return (
    <header style={{background: darkMode ? '#23272b' : '#fff', borderBottom: '1px solid #eaeaea', position: 'sticky', top: 0, zIndex: 1100, fontFamily: 'Inter, Segoe UI, Arial, sans-serif'}}>
      <nav className="container d-flex align-items-center justify-content-between py-2" style={{minHeight: 64}}>
        <Link
          to="/dashboard"
          className="fw-bold text-decoration-none"
          style={{
            color: darkMode ? '#00bcd4' : '#008cba',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            fontSize: '2.2rem',
            letterSpacing: '0.03em',
            lineHeight: 1.1
          }}
        >
          Material para Desarrolladores
        </Link>
        <div className="d-flex align-items-center gap-2">
          <button
            className="btn btn-link p-2"
            style={{fontSize: '1.5rem', color: darkMode ? '#ffd600' : '#333'}}
            onClick={toggleDarkMode}
            aria-label={darkMode ? 'Cambiar a modo claro' : 'Cambiar a modo oscuro'}
            title={darkMode ? 'Modo claro' : 'Modo oscuro'}
          >
            {darkMode ? <FaSun /> : <FaMoon />}
          </button>
          <button
            className="d-lg-none border-0 bg-transparent p-2"
            type="button"
            onClick={toggleMenu}
            aria-label="Menú"
            style={{fontSize: '1.75rem', color: darkMode ? '#f1f1f1' : '#333'}}
          >
            <FaBars />
          </button>
        </div>
        <ul className="d-none d-lg-flex align-items-center gap-3 mb-0" style={{listStyle: 'none'}}>
          <li><Link to="/" className="nav-link px-2" style={{ color: darkMode ? '#00bcd4' : '#008cba' }}>Inicio</Link></li>
          <li><Link to="/dashboard" className="nav-link px-2" style={{ color: darkMode ? '#00bcd4' : '#008cba' }}>Recursos</Link></li>
          <li><Link to="/about" className="nav-link px-2" style={{ color: darkMode ? '#00bcd4' : '#008cba' }}>Sobre nosotros</Link></li>
          {!user ? (
            <li>
              <Link to="/login" className="nav-link px-2 d-flex align-items-center" style={{ color: darkMode ? '#00bcd4' : '#008cba' }} title="Iniciar sesión">
                <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25V19.5z" />
                </svg>
              </Link>
            </li>
          ) : (
            <li>
              <button
                className="btn btn-link nav-link px-2 text-danger d-flex align-items-center gap-1"
                style={{fontWeight: 500}}
                onClick={logout}
                aria-label="Cerrar sesión"
              >
                <FaSignOutAlt style={{fontSize: '1.1em'}} />
                <span className="d-none d-md-inline">Salir</span>
              </button>
            </li>
          )}
          {isAdmin && (
            <li className="nav-item">
              <Link to="/admin/users" className="nav-link">
                Usuarios
              </Link>
            </li>
          )}
        </ul>
      </nav>
      {/* Mobile menu overlay */}
      {isMenuOpen && (
        <div
          className="d-lg-none position-fixed top-0 end-0 h-100 bg-white shadow-lg p-4"
          style={{width: 240, maxWidth: '75vw', transform: 'translateX(0)', transition: 'transform 0.3s cubic-bezier(.4,0,.2,1)', zIndex: 1200, borderRadius: '0 0 0 16px'}}
          tabIndex={-1}
          aria-hidden={!isMenuOpen}
        >
          <button
            className="border-0 bg-transparent position-absolute top-0 end-0 m-3"
            style={{fontSize: '1.5rem'}}
            aria-label="Cerrar menú"
            onClick={toggleMenu}
          >
            <FaSignOutAlt />
          </button>
          <ul className="nav flex-column gap-3 mt-5">
            <li><Link to="/" className="nav-link" onClick={toggleMenu}>Inicio</Link></li>
            <li><Link to="/dashboard" className="nav-link" onClick={toggleMenu}>Dashboard</Link></li>
            <li><Link to="/about" className="nav-link" onClick={toggleMenu}>About Us</Link></li>
            {!user ? (
              <li>
                <Link to="/login" className="nav-link d-flex align-items-center" onClick={toggleMenu} title="Iniciar sesión">
                  <svg xmlns="http://www.w3.org/2000/svg" width="28" height="28" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25V19.5z" />
                  </svg>
                </Link>
              </li>
            ) : (
              <li>
                <button
                  className="btn btn-link nav-link text-danger d-flex align-items-center gap-1"
                  style={{fontWeight: 500}}
                  onClick={() => { logout(); toggleMenu(); }}
                  aria-label="Cerrar sesión"
                >
                  <FaSignOutAlt style={{fontSize: '1.1em'}} /> Salir
                </button>
              </li>
            )}
          </ul>
        </div>
      )}
    </header>
  );
};

export default Header;
