import { test, expect, vi, beforeEach, afterEach } from "vitest";
import userEvent from "@testing-library/user-event";
import { render, screen, waitFor } from "@testing-library/react";
import CardLg from "@components/commons/card/CardLg";
import {
  mockMovieData,
  mockVideoData,
  mockCreditsData,
} from "./__mocks__/mockData";

// Mock del store de Zustand
vi.mock("@store/useMyListStore", () => ({
  useMyListStore: () => ({
    addMovie: vi.fn(),
    removeMovie: vi.fn(),
    isInList: () => false,
  }),
}));

beforeEach(() => {
  global.fetch = vi.fn();
});

afterEach(() => {
  vi.resetAllMocks();
});

test('muestra el botón "Ver Tráiler" y abre el modal al hacer clic', async () => {
  // Configuramos los mocks de fetch
  (global.fetch as ReturnType<typeof vi.fn>)
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockMovieData,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockVideoData,
    })
    .mockResolvedValueOnce({
      ok: true,
      json: async () => mockCreditsData,
    });

  render(<CardLg movieId={1} />);

  // Esperamos a que el componente termine de cargar
  await waitFor(
    () => {
      expect(screen.queryByText("Cargando...")).not.toBeInTheDocument();
    },
    { timeout: 3000 }
  );

  // Verificamos que el título de la película se muestre
  await waitFor(
    () => {
      expect(screen.getByText(mockMovieData.title)).toBeInTheDocument();
    },
    { timeout: 3000 }
  );

  // Buscamos el botón de tráiler
  const trailerButton = await screen.findByRole("button", {
    name: /Ver Tráilesar/i,
  });
  expect(trailerButton).toBeInTheDocument();

  // Hacemos clic en el botón
  await userEvent.click(trailerButton);

  // Verificamos que el modal se muestre
  await waitFor(
    () => {
      expect(screen.getByText(/Ocultar Tráiler/i)).toBeInTheDocument();
    },
    { timeout: 3000 }
  );
});
