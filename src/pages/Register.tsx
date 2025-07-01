// src/components/Register.tsx
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import supabase from "../utils/supabase";

export default function Register() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repeatPassword, setRepeatPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [message, setMessage] = useState("");
  const [passwordTouched, setPasswordTouched] = useState(false);
  const [repeatTouched, setRepeatTouched] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();

    // Crear usuario con supabase auth
    const { data: signUpData, error: signUpError } = await supabase.auth.signUp(
      {
        email,
        password,
      }
    );

    if (signUpError) {
      toast.error(signUpError.message);
      return;
    }

    // Insertar perfil con role 'user' en la tabla profiles
    if (signUpData?.user) {
      const { id } = signUpData.user;

      const { error: profileError } = await supabase
        .from("profiles")
        .insert([{ id, username: email, role: "user" }]);

      if (profileError) {
        toast.error("Error creando perfil: " + profileError.message);
        return;
      }
    }

    toast.success("Revisa tu correo para confirmar el registro");
    setTimeout(() => navigate('/dashboard'), 1000);
  };

  // Validación de contraseña
  const passwordRules = [
    { label: 'Mínimo 8 caracteres', test: (pw: string) => pw.length >= 8 },
    { label: 'Una mayúscula', test: (pw: string) => /[A-Z]/.test(pw) },
    { label: 'Un número', test: (pw: string) => /\d/.test(pw) },
    { label: 'Un símbolo', test: (pw: string) => /[^A-Za-z0-9]/.test(pw) },
  ];
  const isPasswordValid = passwordRules.every(rule => rule.test(password));
  const passwordsMatch = password === repeatPassword && password.length > 0;
  const showRepeatError = repeatTouched && !passwordsMatch;

  return (
    <div style={{ minHeight: '100vh', background: 'linear-gradient(135deg, #f8fafc 0%, #e0f7fa 100%)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div className="card shadow p-4" style={{ maxWidth: 400, width: '100%', borderRadius: 18 }}>
        <div className="text-center mb-4">
          <div style={{ fontSize: 46, color: '#008cba', marginBottom: 8 }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24" fill="none"><path fill="#008cba" d="M12 12c2.7 0 5-2.3 5-5s-2.3-5-5-5-5 2.3-5 5 2.3 5 5 5Zm0 2c-3.3 0-10 1.7-10 5v3h20v-3c0-3.3-6.7-5-10-5Z"/></svg>
          </div>
          <h2 className="fw-bold mb-2" style={{ color: '#008cba', fontFamily: 'Dancing Script, cursive', letterSpacing: '0.03em' }}>Crea tu cuenta</h2>
        </div>
        <form onSubmit={async e => {
          e.preventDefault();
          if (!isPasswordValid) {
            toast.error('La contraseña no cumple los requisitos');
            return;
          }
          if (!passwordsMatch) {
            setRepeatTouched(true);
            toast.error('Las contraseñas no coinciden');
            return;
          }
          if (!email) {
            toast.error('El correo es obligatorio');
            return;
          }
          await handleRegister(e);
        }}>
          <div className="mb-3">
            <input
              type="email"
              placeholder="Correo electrónico"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              className="form-control rounded-pill px-3 py-2"
              style={{ borderColor: '#b2ebf2', boxShadow: 'none' }}
              autoFocus
            />
          </div>
          <div className="mb-1 position-relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Contraseña"
              value={password}
              onChange={e => { setPassword(e.target.value); setPasswordTouched(true); }}
              required
              className="form-control rounded-pill px-3 py-2"
              style={{ borderColor: '#b2ebf2', boxShadow: 'none', paddingRight: 40 }}
            />
            <span
              onClick={() => setShowPassword(v => !v)}
              style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-55%)', cursor: 'pointer', color: '#008cba', fontSize: 20, display: 'flex', alignItems: 'center', height: 38 }}
              tabIndex={0}
              aria-label={showPassword ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showPassword ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#008cba" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#008cba" d="M12 7a5 5 0 0 1 5 5c0 .7-.1 1.4-.3 2.1l1.5 1.5C19.7 14.2 21 12 21 12s-3-7-9-7c-1.1 0-2.2.2-3.2.6l1.6 1.6C10.6 7.2 11.3 7 12 7Zm8.7 13.3-3.9-3.9C15.2 17.5 13.6 18 12 18c-7 0-10-7-10-7s2.3-4.7 7.1-6.6L2.7 2.7a1 1 0 0 1 1.4-1.4l18 18a1 1 0 0 1-1.4 1.4ZM12 16c-2.2 0-4-1.8-4-4 0-.7.2-1.4.5-2l1.6 1.6c-.1.1-.1.3-.1.4a2 2 0 0 0 2 2c.1 0 .3 0 .4-.1l1.6 1.6c-.6.3-1.3.5-2 .5Z"/></svg>
              )}
            </span>
          </div>
          <div className="mb-1 position-relative">
            <input
              type={showRepeat ? "text" : "password"}
              placeholder="Repite la contraseña"
              value={repeatPassword}
              onChange={e => { setRepeatPassword(e.target.value); setRepeatTouched(true); }}
              required
              className="form-control rounded-pill px-3 py-2"
              style={{ borderColor: showRepeatError ? '#e57373' : '#b2ebf2', boxShadow: 'none', paddingRight: 40 }}
            />
            <span
              onClick={() => setShowRepeat(v => !v)}
              style={{ position: 'absolute', right: 16, top: '50%', transform: 'translateY(-55%)', cursor: 'pointer', color: '#008cba', fontSize: 20, display: 'flex', alignItems: 'center', height: 38 }}
              tabIndex={0}
              aria-label={showRepeat ? 'Ocultar contraseña' : 'Mostrar contraseña'}
            >
              {showRepeat ? (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#008cba" d="M12 5c-7 0-10 7-10 7s3 7 10 7 10-7 10-7-3-7-10-7Zm0 12c-3.3 0-6-2.7-6-6s2.7-6 6-6 6 2.7 6 6-2.7 6-6 6Zm0-10a4 4 0 1 0 0 8 4 4 0 0 0 0-8Z"/></svg>
              ) : (
                <svg width="22" height="22" fill="none" viewBox="0 0 24 24"><path fill="#008cba" d="M12 7a5 5 0 0 1 5 5c0 .7-.1 1.4-.3 2.1l1.5 1.5C19.7 14.2 21 12 21 12s-3-7-9-7c-1.1 0-2.2.2-3.2.6l1.6 1.6C10.6 7.2 11.3 7 12 7Zm8.7 13.3-3.9-3.9C15.2 17.5 13.6 18 12 18c-7 0-10-7-10-7s2.3-4.7 7.1-6.6L2.7 2.7a1 1 0 0 1 1.4-1.4l18 18a1 1 0 0 1-1.4 1.4ZM12 16c-2.2 0-4-1.8-4-4 0-.7.2-1.4.5-2l1.6 1.6c-.1.1-.1.3-.1.4a2 2 0 0 0 2 2c.1 0 .3 0 .4-.1l1.6 1.6c-.6.3-1.3.5-2 .5Z"/></svg>
              )}
            </span>
            {showRepeatError && (
              <div className="text-danger mt-1" style={{ fontSize: 13 }}>
                Las contraseñas no coinciden
              </div>
            )}
          </div>
          <ul className="mb-2 ps-3" style={{ fontSize: 14, color: '#008cba', listStyle: 'none' }}>
            {passwordRules.map(rule => (
              <li key={rule.label} className="d-flex align-items-center gap-1" style={{ color: rule.test(password) ? '#43a047' : '#bdbdbd' }}>
                <span style={{ fontSize: 18 }}>{rule.test(password) ? '✔️' : '❌'}</span>
                {rule.label}
              </li>
            ))}
          </ul>
          <button
            type="submit"
            className="btn w-100 py-2 fw-bold text-white"
            style={{ background: isPasswordValid && passwordsMatch ? '#008cba' : '#bdbdbd', border: 'none', borderRadius: 50, fontSize: 18, letterSpacing: '0.02em', transition: 'background 0.2s' }}
            disabled={!(isPasswordValid && passwordsMatch)}
            onMouseOver={e => { if (isPasswordValid && passwordsMatch) e.currentTarget.style.background = '#0077a3'; }}
            onMouseOut={e => { if (isPasswordValid && passwordsMatch) e.currentTarget.style.background = '#008cba'; }}
          >
            Registrarse
          </button>
        </form>
        <div className="text-center mt-3">
          <span className="text-muted">¿Ya tienes cuenta? </span>
          <Link to="/login" style={{ color: '#008cba', fontWeight: 500, textDecoration: 'none' }}>Inicia sesión</Link>
        </div>
        <ToastContainer position="top-center" autoClose={3500} hideProgressBar closeOnClick pauseOnHover draggable theme="colored" />
      </div>
    </div>
  );
}
