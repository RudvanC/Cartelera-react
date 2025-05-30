export const mockMovieData = {
  id: 1,
  title: "Test Movie",
  poster_path: "/test-poster.jpg",
  backdrop_path: "/test-backdrop.jpg",
  release_date: "2024-01-01",
  vote_average: 8.5,
  overview: "This is a test movie overview",
  runtime: 120,
  genres: [
    { id: 1, name: "Action" },
    { id: 2, name: "Adventure" },
  ],
};

export const mockVideoData = {
  results: [
    {
      key: "test-video-key",
      type: "Trailer",
      site: "YouTube",
    },
  ],
};

export const mockCreditsData = {
  cast: [
    {
      id: 1,
      name: "Test Actor",
      character: "Test Character",
      profile_path: "/test-profile.jpg",
    },
  ],
};
