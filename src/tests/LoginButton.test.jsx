// Importar dependencias necesarias
import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import LoginButton from '../components/navbar/guest/LoginButton/LoginButton.jsx';
import userEvent from '@testing-library/user-event';

// Mock de useAuth0 para controlar loginWithRedirect
/*
El componente LoginButton usa el hook useAuth0 de @auth0/auth0-react. Para testearlo, necesitamos hacer un mock de este hook para controlar su comportamiento y evitar redirecciones reales.
*//*
- Usamos vi.mock para reemplazar el módulo @auth0/auth0-react por una versión controlada.
- Así, cuando el componente use useAuth0, recibirá un objeto con una función loginWithRedirect que podemos espiar y verificar en los tests.
*/
// Creamos una variable para el mock
const loginWithRedirect = vi.fn();

// Mockeamos useAuth0 para que siempre devuelva nuestro mock
vi.mock('@auth0/auth0-react', () => ({
  useAuth0: () => ({
    loginWithRedirect,
  }),
}));

beforeEach(() => {
  // Limpiamos el mock antes de cada test
  loginWithRedirect.mockClear();
});

//Estructura del test
/*
- describe agrupa los tests relacionados con LoginButton.
- it define un caso de prueba: que el botón se renderiza.
- render(<LoginButton />) monta el componente en un DOM virtual.
- screen.getByRole('button') busca el botón en el DOM.
- expect(...).toBeInTheDocument() verifica que el botón está presente.
*/
describe('LoginButton', () => {
  //TEST1
  it('debe renderizar el botón de login', () => {
    render(<LoginButton />);
    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    expect(button).toBeInTheDocument();
  });

  //TEST2
  //Al hacer click en el botón "Iniciar sesión", se llama a la función loginWithRedirect. Para esto, necesitamos un mock de loginWithRedirect y simular el click.
  it('debe llamar a loginWithRedirect al hacer click', async () => {
  // Creamos un mock para loginWithRedirect

  render(<LoginButton />);
    const button = screen.getByRole('button', { name: /iniciar sesión/i });
    //simular el click real del usuario.
    await userEvent.click(button);
    //Mockeamos loginWithRedirect y lo verificamos con toHaveBeenCalled().
    expect(loginWithRedirect).toHaveBeenCalled();
  });
});