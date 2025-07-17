
export default function WIP() {
  return (
    <div style={{ minHeight: '60vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
      <svg width="96" height="96" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth="1.5" style={{ color: '#008cba', marginBottom: 16 }}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 7.5a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 19.5a7.5 7.5 0 1115 0v.75A2.25 2.25 0 0117.25 22.5h-10.5A2.25 2.25 0 014.5 20.25V19.5z" />
      </svg>
      <h1 style={{ fontWeight: 700, fontSize: 32, marginBottom: 12 }}>WIP</h1>
      <p style={{ color: '#888', fontSize: 18 }}>Esta funcionalidad estará disponible próximamente.</p>
    </div>
  );
}
