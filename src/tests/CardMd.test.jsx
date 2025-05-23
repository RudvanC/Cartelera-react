import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import CardMd from '@components/commons/card/CardMd';
import { BrowserRouter } from 'react-router-dom'; // Necesario para el contexto de navigate

// Mock de react-router-dom
const mockNavigate = vi.fn();
vi.mock('react-router-dom', async (importOriginal) => {
  const actual = await importOriginal();
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

// Mock del componente Button para aislar CardMd si fuera necesario,
// pero dado que Button ya está testeado, nos enfocaremos en la interacción.
// Si Button tuviera lógica compleja, sería bueno mockearlo.
// vi.mock('@components/commons/Button/Button', () => ({
//   default: ({ children, onClick, className }) => (
//     <button onClick={onClick} className={className}>{children}</button>
//   )
// }));

const mockMovie = {
  id: 1,
  title: 'Test Movie Title',
  poster_path: '/testposter.jpg',
  vote_average: 8.5,
  overview: 'This is a test movie overview.',
};

const IMAGE_BASE_URL = 'https://image.tmdb.org/t/p/w185';

describe('CardMd component', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  it('renders null if no movie prop is provided', () => {
    const { container } = render(<CardMd movie={null} />, { wrapper: BrowserRouter });
    expect(container.firstChild).toBeNull();
  });

  it('renders movie details correctly', () => {
    render(<CardMd movie={mockMovie} />, { wrapper: BrowserRouter });

    expect(screen.getByRole('heading', { name: mockMovie.title })).toBeInTheDocument();
    const poster = screen.getByRole('img', { name: mockMovie.title });
    expect(poster).toBeInTheDocument();
    expect(poster).toHaveAttribute('src', `${IMAGE_BASE_URL}${mockMovie.poster_path}`);
    expect(screen.getByText(`⭐ ${mockMovie.vote_average.toFixed(1)} / 10`)).toBeInTheDocument();
    expect(screen.getByText(mockMovie.overview)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /ver más/i })).toBeInTheDocument();
  });

  it('renders placeholder image if poster_path is missing', () => {
    const movieWithoutPoster = { ...mockMovie, poster_path: null };
    render(<CardMd movie={movieWithoutPoster} />, { wrapper: BrowserRouter });
    const poster = screen.getByRole('img', { name: movieWithoutPoster.title });
    expect(poster).toHaveAttribute('src', 'https://via.placeholder.com/92x138?text=No+Image');
  });

  it('renders "N/A" for vote_average if missing', () => {
    const movieWithoutVote = { ...mockMovie, vote_average: null };
    render(<CardMd movie={movieWithoutVote} />, { wrapper: BrowserRouter });
    expect(screen.getByText('⭐ N/A / 10')).toBeInTheDocument();
  });

  it('renders default overview if overview is missing', () => {
    const movieWithoutOverview = { ...mockMovie, overview: '' }; // o null
    render(<CardMd movie={movieWithoutOverview} />, { wrapper: BrowserRouter });
    expect(screen.getByText('Sin descripción disponible.')).toBeInTheDocument();
  });

  it('calls navigate with correct URL when "Ver Más" button is clicked', () => {
    render(<CardMd movie={mockMovie} />, { wrapper: BrowserRouter });
    const button = screen.getByRole('button', { name: /ver más/i });
    fireEvent.click(button);
    expect(mockNavigate).toHaveBeenCalledTimes(1);
    expect(mockNavigate).toHaveBeenCalledWith(`/movie/${mockMovie.id}`);
  });
});
