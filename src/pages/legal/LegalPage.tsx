import type { ReactNode } from 'react';
import { Container } from 'react-bootstrap';

// Datos del titular, comunes a las tres páginas legales.
export const TITULAR = {
  nombre: 'Esteban Fernández González',
  email: '',
  sitio: 'https://consultorialocal.es/material-para-desarrolladores/',
  actualizado: '21 de septiembre de 2026',
};

export const Email = () => <a href={`mailto:${TITULAR.email}`}>{TITULAR.email}</a>;

export default function LegalPage({ title, children }: { title: string; children: ReactNode }) {
  return (
    <Container className="py-5" style={{ maxWidth: 820, lineHeight: 1.7 }}>
      <h1 className="mb-2">{title}</h1>
      <p className="text-muted small mb-4">Última actualización: {TITULAR.actualizado}</p>
      {children}
    </Container>
  );
}
