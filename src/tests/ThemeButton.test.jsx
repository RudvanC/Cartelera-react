import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import ThemeToggle from '@components/commons/theme-button/ThemeButton'; // Asumiendo que el default export es ThemeToggle

// Mock de react-icons para evitar problemas de renderizado en tests si fueran complejos
// En este caso, FaSun y FaMoon son simples, pero es una buena práctica si se vuelven complejos.
vi.mock('react-icons/fa', () => ({
  FaSun: () => <svg data-testid="sun-icon" />,
  FaMoon: () => <svg data-testid="moon-icon" />,
}));

describe('ThemeToggle component', () => {
  let getItemSpy;
  let setItemSpy;

  beforeEach(() => {
    // Mock localStorage
    getItemSpy = vi.spyOn(Storage.prototype, 'getItem');
    setItemSpy = vi.spyOn(Storage.prototype, 'setItem');
    // Asegurarse de que la clase 'dark' no esté presente al inicio de cada test
    document.documentElement.classList.remove('dark');
    // Limpiar mocks
    getItemSpy.mockClear();
    setItemSpy.mockClear();
  });

  afterEach(() => {
    // Restaurar mocks
    getItemSpy.mockRestore();
    setItemSpy.mockRestore();
  });

  it('renders with moon icon (light theme) by default', () => {
    getItemSpy.mockReturnValueOnce(null); // Simula que no hay tema en localStorage
    render(<ThemeToggle />);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);
    expect(getItemSpy).toHaveBeenCalledWith('theme');
  });

  it('renders with sun icon if localStorage has dark theme', () => {
    getItemSpy.mockReturnValueOnce('dark');
    render(<ThemeToggle />);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    expect(getItemSpy).toHaveBeenCalledWith('theme');
  });

  it('toggles to dark theme on click, updates localStorage and html class', () => {
    getItemSpy.mockReturnValueOnce('light');
    render(<ThemeToggle />);
    
    // Estado inicial: light, moon icon
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(document.documentElement.classList.contains('dark')).toBe(false);

    const button = screen.getByRole('button', { name: /cambiar tema/i });
    fireEvent.click(button);

    // Estado después del clic: dark, sun icon
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
  });

  it('toggles back to light theme on second click, updates localStorage and html class', () => {
    getItemSpy.mockReturnValueOnce('light'); // o null
    render(<ThemeToggle />);
    const button = screen.getByRole('button', { name: /cambiar tema/i });

    // Primer clic (light -> dark)
    fireEvent.click(button);
    expect(screen.getByTestId('sun-icon')).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'dark');
    expect(document.documentElement.classList.contains('dark')).toBe(true);
    setItemSpy.mockClear(); // Limpiar para la siguiente aserción

    // Segundo clic (dark -> light)
    fireEvent.click(button);
    expect(screen.getByTestId('moon-icon')).toBeInTheDocument();
    expect(setItemSpy).toHaveBeenCalledWith('theme', 'light');
    expect(document.documentElement.classList.contains('dark')).toBe(false);
  });

  it('has correct aria-label', () => {
    render(<ThemeToggle />);
    expect(screen.getByRole('button', { name: /cambiar tema/i })).toBeInTheDocument();
  });
});
