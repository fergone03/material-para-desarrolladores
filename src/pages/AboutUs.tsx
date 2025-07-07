import React, { useState } from 'react';

const AboutUs: React.FC = () => {
    const [form, setForm] = useState({ name: '', email: '', url: '', message: '' });
    const [submitted, setSubmitted] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setSubmitted(true);
    };

    return (
        <div style={{ maxWidth: 900, margin: '0 auto', padding: 24 }}>
            {/* HERO */}
            <section style={{
                display: 'flex',
                flexDirection: 'row',
                alignItems: 'center',
                gap: 32,
                background: 'linear-gradient(90deg, #f8fafc 60%, #e3f2fd 100%)',
                borderRadius: 16,
                padding: 32,
                marginBottom: 40,
                boxShadow: '0 4px 24px rgba(0,0,0,0.06)'
            }}>
                <img
                    src="https://placehold.co/220x220/"
                    alt="Equipo desarrollador"
                    style={{ width: 220, height: 220, borderRadius: '50%', objectFit: 'cover', boxShadow: '0 2px 16px #008cba33', border: '6px solid #fff' }}
                />
                <div>
                    <h1 style={{ fontSize: '2.5rem', marginBottom: 12 }}>Sobre nosotros</h1>
                    <p style={{ fontSize: '1.18rem', color: '#333', marginBottom: 0 }}>
                        Somos un equipo apasionado por el desarrollo de software y la creación de herramientas útiles para la comunidad. Nuestro objetivo es facilitar el acceso a recursos y materiales para desarrolladores de todos los niveles.
                    </p>
                </div>
            </section>

            {/* TEAM CARDS */}
            <section style={{ marginBottom: 48 }}>
                <h2 style={{ fontWeight: 600, color: '#1976d2', marginBottom: 24 }}>Conózcanos</h2>
                <div style={{ display: 'flex', gap: 32, flexWrap: 'wrap', justifyContent: 'center' }}>
                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #008cba14', padding: 24, width: 220, textAlign: 'center' }}>
                        <img src="./1737644497741.jpeg" alt="Avatar" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 12, border: '3px solid #e3f2fd' }} />
                        <h3 style={{ margin: '12px 0 4px', fontSize: '1.1rem', color: '#1976d2' }}>Esteban Fernández</h3>
                        <p style={{ fontSize: 14, color: '#555', margin: 0 }}>Junior FullStack Developer</p>
                        <div style={{ marginTop: 12 }}>
                            <a href="https://github.com/fergone03" target="_blank" rel="noopener noreferrer" style={{ color: '#333', margin: '0 8px' }}>GitHub</a>
                            <a href="https://linkedin.com/in/estebanfernandezgonzalez" target="_blank" rel="noopener noreferrer" style={{ color: '#1976d2', margin: '0 8px' }}>LinkedIn</a>
                        </div>
                    </div>
                    <div style={{ background: '#fff', borderRadius: 12, boxShadow: '0 2px 12px #008cba14', padding: 24, width: 220, textAlign: 'center' }}>
                        <img src="./1739831880360.jpeg" alt="Avatar" style={{ width: 80, height: 80, borderRadius: '50%', marginBottom: 12, border: '3px solid #e3f2fd' }} />
                        <h3 style={{ margin: '12px 0 4px', fontSize: '1.1rem', color: '#1976d2' }}>Raúl Labrador</h3>
                        <p style={{ fontSize: 14, color: '#555', margin: 0 }}>Student Developer</p>
                        <div style={{ marginTop: 12 }}>
                            <a href="https://github.com/Raul-Labrador" style={{ color: '#333', margin: '0 8px' }}>GitHub</a>
                            <a href="https://www.linkedin.com/in/ra%C3%BAl-labrador-p%C3%A9rez-b2159126a/" style={{ color: '#1976d2', margin: '0 8px' }}>LinkedIn</a>
                        </div>
                    </div>
                </div>
            </section>

            {/* CONTACTO */}
            <section style={{ background: '#f8fafc', borderRadius: 16, padding: 32, boxShadow: '0 2px 12px #008cba14', marginBottom: 24 }}>
                <h2 style={{ fontWeight: 600, color: '#1976d2', marginBottom: 16 }}>Contacto</h2>
                <p>Si conoces una página que puede aportar valor al resto de desarrolladores, ¡rellena el formulario y la valoraremos!</p>
                {submitted ? (
                    <div style={{ color: 'green', marginTop: 16 }}>¡Gracias por contactarnos! Te responderemos pronto.</div>
                ) : (
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 12, marginTop: 16 }}>
                        <input
                            type="text"
                            name="name"
                            placeholder="Tu nombre"
                            value={form.name}
                            onChange={handleChange}
                            required
                            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                        />
                        <input
                            type="email"
                            name="email"
                            placeholder="Tu email"
                            value={form.email}
                            onChange={handleChange}
                            required
                            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                        />
                        <input
                            type="text"
                            name="url"
                            placeholder="URL"
                            value={form.url}
                            onChange={handleChange}
                            required
                            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                        />
                        <textarea
                            name="message"
                            placeholder="Descripción de la página"
                            value={form.message}
                            onChange={handleChange}
                            required
                            rows={4}
                            style={{ padding: 8, borderRadius: 4, border: '1px solid #ccc' }}
                        />
                        <button type="submit" style={{ padding: 10, borderRadius: 4, background: '#1976d2', color: '#fff', border: 'none', cursor: 'pointer', width: '10%', margin: '0 auto' }}>
                            Enviar
                        </button>
                    </form>
                )}
            </section>
        </div>
    );
};

export default AboutUs;
