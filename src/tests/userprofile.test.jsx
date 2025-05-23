import { render, screen, fireEvent } from '@testing-library/react';
import UserProfile from '@pages/auth/userprofile';
import { AuthContext } from '@pages/auth/AuthContext';
import React from 'react';

describe('UserProfile component', () => {
  it('muestra "Cargando perfil..." si isLoading es true', () => {
    render(
      <AuthContext.Provider value={{ isLoading: true }}>
        <UserProfile />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/cargando perfil/i)).toBeInTheDocument();
  });

  it('muestra mensaje si no está autenticado o no hay usuario', () => {
    render(
      <AuthContext.Provider value={{ isAuthenticated: false, user: null, isLoading: false }}>
        <UserProfile />
      </AuthContext.Provider>
    );
    expect(screen.getByText(/no estás logueado/i)).toBeInTheDocument();
  });

  it('muestra datos del usuario y botón de logout', () => {
    const mockUser = {
      name: 'Leire',
      email: 'leire@example.com',
      picture: 'https://example.com/foto.jpg',
      nickname: 'lei',
    };
    const mockLogout = vi.fn();

    render(
      <AuthContext.Provider
        value={{ user: mockUser, logout: mockLogout, isAuthenticated: true, isLoading: false }}
      >
        <UserProfile />
      </AuthContext.Provider>
    );

    expect(screen.getByText('Leire')).toBeInTheDocument();
    expect(screen.getByText('leire@example.com')).toBeInTheDocument();
    expect(screen.getByText(/nickname: lei/i)).toBeInTheDocument();

    const logoutButton = screen.getByText(/cerrar sesión/i);
    fireEvent.click(logoutButton);
    expect(mockLogout).toHaveBeenCalled();
  });
});
