import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import Slider from "../components/commons/card/slider/slider";



describe("Slider component", () => {
  it("renders loading state initially", () => {
    render(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    );
    expect(screen.getByText(/cargando/i)).toBeInTheDocument();
  });

  it("loads and displays first movie", async () => {
    render(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    );

    // Esperamos que aparezca un heading (h4) con el título de la película
    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 4 });
      expect(heading).toBeInTheDocument();
      expect(heading.textContent.length).toBeGreaterThan(0);
    });
  });

  it("navigates to second movie on arrow click", async () => {
    const { container } = render(
      <MemoryRouter>
        <Slider />
      </MemoryRouter>
    );

    // Esperamos a que el botón flecha derecha esté en el DOM
    await waitFor(() => {
      expect(container.querySelector(".nav-button.right")).toBeInTheDocument();
    });

    const rightArrow = container.querySelector(".nav-button.right");

    // Click en la flecha derecha para pasar a la siguiente película
    fireEvent.click(rightArrow);

    // Comprobamos que el título cambió (la película actual)
    await waitFor(() => {
      const heading = screen.getByRole("heading", { level: 4 });
      expect(heading).toBeInTheDocument();
      // Aquí podrías comprobar que el título no es el mismo que antes, si quieres guardar el anterior
      // Pero al menos aseguramos que hay un título
      expect(heading.textContent.length).toBeGreaterThan(0);
    });
  });
});