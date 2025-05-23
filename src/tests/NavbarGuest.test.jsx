import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import NavbarGuest from '@components/navbar/guest/NavbarGuest.jsx';

//Estructura básica del test
describe('NavbarGuest', () => {
  it('debería renderizarse correctamente', () => {
    render(<NavbarGuest />);
    const linkElement = screen.getByText(/Iniciar sesión/i); 
    expect(linkElement).toBeInTheDocument();
  });
});