// src/__mocks__/mockData.ts

export const mockMovieData = {
  id: 1,
  title: "Película de Prueba",
  poster_path: "/poster.jpg",
  backdrop_path: "/backdrop.jpg",
  overview: "Una película de prueba con mucha acción y drama.",
  genres: [
    { id: 28, name: "Acción" },
    { id: 18, name: "Drama" },
  ],
  runtime: 125,
  release_date: "2024-01-01",
  vote_average: 8.5,
};

export const mockVideoData = {
  results: [
    {
      id: "abc123",
      key: "y6Sxv-sUYtM",
      name: "Official Trailer",
      site: "YouTube",
      type: "Trailer",
    },
  ],
};

export const mockCreditsData = {
  cast: [
    { id: 1, name: "Actor Protagonista", character: "Héroe" },
    { id: 2, name: "Actriz Secundaria", character: "Aliada" },
  ],
  crew: [
    { id: 3, name: "Director Famoso", job: "Director" },
    { id: 4, name: "Compositor Legendario", job: "Music" },
  ],
};
