import { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import supabase from '../utils/supabase';

// Destino del enlace del correo de recuperación: supabase-js lee el token del
// hash de la URL y abre una sesión temporal con la que se cambia la contraseña.
export default function ResetPassword() {
  const [password, setPassword] = useState('');
  const [repeat, setRepeat] = useState('');
  const [hasSession, setHasSession] = useState<boolean | null>(null);
  const [saving, setSaving] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => setHasSession(!!data.session));
    const { data } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'PASSWORD_RECOVERY' || session) setHasSession(true);
    });
    return () => data.subscription.unsubscribe();
  }, []);

  const rules = [
    { label: 'Mínimo 8 caracteres', test: (pw: string) => pw.length >= 8 },
    { label: 'Una mayúscula', test: (pw: string) => /[A-Z]/.test(pw) },
    { label: 'Un número', test: (pw: string) => /\d/.test(pw) },
    { label: 'Un símbolo', test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
  ];
  const valid = rules.every(r => r.test(password)) && password === repeat;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSaving(true);
    const { error } = await supabase.auth.updateUser({ password });
    setSaving(false);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success('Contraseña actualizada');
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f7fa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card shadow p-4" style={{ maxWidth: 370, width: '100%', borderRadius: 18 }}>
        <h2 className="fw-bold mb-3 text-center" style={{ color: '#008cba', fontFamily: 'Dancing Script, cursive', letterSpacing: '0.03em' }}>
          Nueva contraseña
        </h2>
        {hasSession === false ? (
          <p className="text-center">
            El enlace no es válido o ha caducado.{' '}
            <Link to="/forgot-password" style={{ color: '#008cba' }}>Pide uno nuevo</Link>.
          </p>
        ) : (
          <form onSubmit={handleSubmit}>
            <input
              type="password"
              placeholder="Contraseña nueva"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
              autoFocus
              className="form-control rounded-pill px-3 py-2 mb-2"
              style={{ borderColor: '#b2ebf2', boxShadow: 'none' }}
            />
            <input
              type="password"
              placeholder="Repite la contraseña"
              value={repeat}
              onChange={e => setRepeat(e.target.value)}
              required
              className="form-control rounded-pill px-3 py-2 mb-2"
              style={{ borderColor: repeat && repeat !== password ? '#e57373' : '#b2ebf2', boxShadow: 'none' }}
            />
            <ul className="mb-3 ps-3" style={{ fontSize: 14, listStyle: 'none' }}>
              {rules.map(r => (
                <li key={r.label} style={{ color: r.test(password) ? '#43a047' : '#bdbdbd' }}>
                  {r.test(password) ? '✔️' : '❌'} {r.label}
                </li>
              ))}
            </ul>
            <button
              type="submit"
              disabled={!valid || saving || !hasSession}
              className="btn w-100 py-2 fw-bold text-white"
              style={{ background: valid ? '#008cba' : '#bdbdbd', border: 'none', borderRadius: 50, fontSize: 18 }}
            >
              {saving ? 'Guardando…' : 'Guardar contraseña'}
            </button>
          </form>
        )}
        <ToastContainer position="top-center" autoClose={3500} hideProgressBar closeOnClick pauseOnHover draggable theme="colored" />
      </div>
    </div>
  );
}
