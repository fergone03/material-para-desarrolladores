import { useState } from 'react';
import { Link } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import api from '../utils/api';

export default function ForgotPassword() {
  const [email, setEmail] = useState('');
  const [sending, setSending] = useState(false);
  const [sent, setSent] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    const { error } = await api.auth.resetPasswordForEmail(email.trim(), {
      redirectTo: `${window.location.origin}${import.meta.env.BASE_URL}reset-password`,
    });
    setSending(false);
    if (error) toast.error(error.message);
    else setSent(true);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f7fa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card shadow p-4" style={{ maxWidth: 370, width: '100%', borderRadius: 18 }}>
        <h2 className="fw-bold mb-3 text-center" style={{ color: '#008cba', fontFamily: 'Dancing Script, cursive', letterSpacing: '0.03em' }}>
          Recuperar contraseña
        </h2>
        {sent ? (
          <p className="text-center mb-0">
            Si <strong>{email}</strong> tiene una cuenta, recibirás un correo con un enlace para crear una contraseña nueva.
            Revisa también la carpeta de spam.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <p className="text-muted small">Escribe tu correo y te enviaremos un enlace para restablecer la contraseña.</p>
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoFocus
              className="form-control rounded-pill px-3 py-2 mb-3"
              style={{ borderColor: '#b2ebf2', boxShadow: 'none' }}
            />
            <button
              type="submit"
              disabled={sending}
              className="btn w-100 py-2 fw-bold text-white"
              style={{ background: '#008cba', border: 'none', borderRadius: 50, fontSize: 18 }}
            >
              {sending ? 'Enviando…' : 'Enviar enlace'}
            </button>
          </form>
        )}
        <div className="text-center mt-3">
          <Link to="/login" style={{ color: '#008cba', fontWeight: 500, textDecoration: 'none' }}>Volver a iniciar sesión</Link>
        </div>
        <ToastContainer position="top-center" autoClose={3500} hideProgressBar closeOnClick pauseOnHover draggable theme="colored" />
      </div>
    </div>
  );
}
