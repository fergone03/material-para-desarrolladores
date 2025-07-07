import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { FaBars, FaSignOutAlt } from "react-icons/fa";

const Header: React.FC = () => {
  const { user, isAdmin, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header style={{background: '#fff', borderBottom: '1px solid #eaeaea', position: 'sticky', top: 0, zIndex: 1100, fontFamily: 'Inter, Segoe UI, Arial, sans-serif'}}>
      <nav className="container d-flex align-items-center justify-content-between py-2" style={{minHeight: 64}}>
        <Link
          to="/dashboard"
          className="fw-bold text-decoration-none"
          style={{
            color: '#008cba',
            fontFamily: "'Dancing Script', cursive",
            fontWeight: 700,
            fontSize: '2.2rem',
            letterSpacing: '0.03em',
            lineHeight: 1.1
          }}
        >
          Material para Desarrolladores
        </Link>
        <button
          className="d-lg-none border-0 bg-transparent p-2"
          type="button"
          onClick={toggleMenu}
          aria-label="Menú"
          style={{fontSize: '1.75rem', color: '#333'}}
        >
          <FaBars />
        </button>
        <ul className="d-none d-lg-flex align-items-center gap-3 mb-0" style={{listStyle: 'none'}}>
          <li><Link to="/" className="nav-link px-2" style={{ color: '#008cba' }}>Inicio</Link></li>
          <li><Link to="/dashboard" className="nav-link px-2" style={{ color: '#008cba' }}>Recursos</Link></li>
          <li><Link to="/about" className="nav-link px-2" style={{ color: '#008cba' }}>Sobre nosotros</Link></li>
          {!user ? (
            <>
              <li><Link to="/login" className="nav-link px-2" style={{ color: '#008cba' }}>Login</Link></li>
              <li><Link to="/register" className="nav-link px-2" style={{ color: '#008cba' }}>Registro</Link></li>
            </>
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
              <>
                <li><Link to="/login" className="nav-link" onClick={toggleMenu}>Login</Link></li>
                <li><Link to="/register" className="nav-link" onClick={toggleMenu}>Registro</Link></li>
              </>
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
