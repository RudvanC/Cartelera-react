# Cartelera React App

[![Ask DeepWiki](https://deepwiki.com/badge.svg)](https://deepwiki.com/RudvanC/Cartelera-react)

A modern React application built with Vite, featuring user authentication, dynamic content display, and a light/dark theme. This application serves as a boilerplate or starting point for a feature-rich web app, potentially a movie billboard or a similar content-driven platform.

## Features

*   **User Authentication**: Secure login and registration using Auth0.
*   **Role-based Views**: Different experiences for authenticated (`/auth`) and guest (`/guest`) users.
*   **Dynamic Routing**: Utilizes React Router for seamless navigation.
*   **API Integration**: Uses Axios for fetching data from a backend (mockable with `json-server`).
*   **Global State Management**: Employs Zustand for efficient state handling across components.
*   **Theme Customization**: Light and Dark mode support, managed via React Context and persisted in localStorage.
*   **Modern Styling**: Styled with TailwindCSS for a utility-first approach.
*   **Component-Based Architecture**: Organized into reusable React components.
*   **Comprehensive Testing**: Unit and component tests written with Vitest and React Testing Library.

## Tech Stack

*   **Frontend Library/Framework**: React 19, Vite
*   **Routing**: React Router DOM v7
*   **Authentication**: Auth0 React SDK
*   **HTTP Client**: Axios
*   **State Management**: Zustand, React Context API
*   **Styling**: TailwindCSS, PostCSS, Autoprefixer
*   **Testing**: Vitest, React Testing Library, JSDOM
*   **Linting**: ESLint
*   **Mock API**: JSON Server
*   **Build Tool**: Vite

## Getting Started

Follow these instructions to get a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

*   Node.js (v18 or newer recommended)
*   npm or yarn

### Installation

1.  Clone the repository:
    ```bash
    git clone <your-repository-url>
    cd Cartelera-react
    ```
2.  Install dependencies:
    ```bash
    npm install
    # or
    # yarn install
    ```

### Running the Development Server

To start the Vite development server:

```bash
npm run dev
```

This will typically start the application on `http://localhost:5173`.

### Running the Mock API (Optional)

If your application relies on a mock backend for development, you can start the `json-server`:

```bash
npm run mock-api
```

This will start a mock API server, usually on `http://localhost:3001`, serving data from `db.json`.

### Running Tests

To run the test suite:

```bash
npm run test
```

To run tests with a UI:

```bash
npm run test:ui
```

To generate a coverage report:

```bash
npm run coverage
```

## Project Structure

The `src` directory contains the core application code:

```
src/
├── App.jsx           # Main application component, router setup
├── assets/           # Static assets (images, fonts, etc.)
├── components/       # Reusable UI components
├── context/          # React Context providers (e.g., ThemeContext)
├── main.jsx          # Application entry point
├── pages/            # Page-level components (routed views)
│   ├── auth/         # Pages accessible to authenticated users
│   └── guest/        # Pages accessible to guest users
├── styles/           # Global styles, TailwindCSS configuration
├── tests/            # Test files and setup
└── zustand/          # Zustand store definitions
```

## Application Flow and Component Overview

The application initializes in `src/main.jsx`, setting up essential context providers and routing.

1.  **Initialization (`src/main.jsx`):**
    *   The `Auth0Provider` wraps the application to handle user authentication with Auth0.
    *   The `ThemeProvider` manages the light/dark theme switching.
    *   `BrowserRouter` from `react-router-dom` enables client-side navigation.
    *   The root `App` component is rendered.

2.  **Main Application Layout (`src/App.jsx`):**
    *   The `App` component defines the overall structure.
    *   It includes a custom `AuthProvider` (likely for user-specific application data post-login).
    *   **Navigation Bar**:
        *   `NavbarGuest` (`src/components/navbar/guest/NavbarGuest.jsx`) is displayed for unauthenticated users.
        *   `NavbarAuth` (`src/components/navbar/auth/NavbarAuth/NavbarAuth.jsx`) is displayed for authenticated users.
    *   **Content Area**: The main content of each page is rendered here based on the current route.
    *   **Footer**: A persistent `Footer` (`src/components/footer/footer.jsx`) is displayed at the bottom of all pages.

3.  **Routing and Page Structure (`src/App.jsx`):**
    *   **Public Access**:
        *   `/`: The `Landing` page (`src/pages/guest/Landing.jsx`) is the initial page for all users. Authenticated users are automatically redirected to `/home`.
    *   **Protected Routes** (require authentication, managed by `src/components/Auth0/ProtectedRoute.jsx`):
        *   `/home`: The `Home` page (`src/pages/auth/Home.jsx`), serving as the main dashboard for logged-in users.
        *   `/movie/:id`: The `FilmInfo` page (`src/pages/auth/FilmInfo.jsx`), displaying detailed information about a specific item (e.g., a movie).
        *   `/user`: The `UserProfile` page (`src/pages/auth/userprofile.jsx`), allowing users to view or manage their profile.
        *   `/search`: The `Search` page (`src/pages/auth/Search.jsx`), enabling users to search for content within the application.

4.  **Core Component Interaction:**
    *   Users typically start on the `Landing` page.
    *   They can log in via Auth0, which redirects them (often back to the app, then to `/home`).
    *   Authenticated users interact with protected pages like `Home`, `FilmInfo`, `UserProfile`, and `Search`.
    *   The `NavbarAuth` provides navigation links relevant to authenticated users.
    *   The `ThemeContext` allows users to toggle between light and dark themes, with changes reflected globally.
    *   Data fetching for pages like `Home` and `FilmInfo` likely occurs within these page components or custom hooks, using Axios.
    *   Zustand stores manage global application state that might be shared across these pages and components.

## Authentication

User authentication is handled by the `@auth0/auth0-react` SDK. Configuration for Auth0 (Domain, Client ID) should be set up in your environment variables and utilized by the `Auth0Provider` typically found in `main.jsx` or `App.jsx`.

## State Management

*   **Zustand**: Used for managing global application state. Store modules are typically located in the `src/zustand/` directory.
*   **React Context**: Used for more localized state management, such as the theme. The `ThemeContext` in `src/context/ThemeContext.jsx` manages the light/dark theme.

## Styling

The project uses TailwindCSS for utility-first CSS.
*   Global styles and TailwindCSS base/component/utility layers are defined in `src/styles/global.css`.
*   Theme-specific styles (light/dark mode) are also managed in `src/styles/global.css` using CSS variables and a `.dark` class on the `<html>` element.

## Testing

Testing is set up with Vitest, React Testing Library, and JSDOM.
*   Test files are co-located with components or in the `src/tests/` directory, typically with a `.test.jsx` extension.
*   Setup for testing, including `jest-dom` matchers, is configured in `setupTests.js` and `vite.config.js`.

---

This README provides a comprehensive overview of the Cartelera React application.
