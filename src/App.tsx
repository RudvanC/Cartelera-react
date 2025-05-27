import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Landing from "@pages/guest/Landing";
import Home from "@pages/auth/Home";
import FilmInfo from "@pages/auth/FilmInfo";
import { useAuth0 } from "@auth0/auth0-react";
import NavbarGuest from "./components/navbar/guest/NavbarGuest.jsx";
import NavbarAuth from "./components/navbar/auth/NavbarAuth/NavbarAuth.jsx";
import { useEffect } from "react";
import ProtectedRoute from "./components/Auth0/ProtectedRoute.jsx";
import Search from "@pages/auth/Search";
import Footer from "@components/footer/footer";
import UserProfile from "@pages/auth/userpage/userprofile.js";
import "@styles/index.css";
import { AuthProvider } from "@pages/auth/userpage/AuthContext.js";

export default function App() {
  const { user: auth0User, isAuthenticated, isLoading } = useAuth0();
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    // Only redirect to /home if authenticated and currently on the root path.
    if (isAuthenticated && location.pathname === "/") {
      navigate("/home");
    }
  }, [isAuthenticated, location.pathname, navigate]);

  if (isLoading) return null;

  return (
    <AuthProvider>
      <div className="app-container">
      {/* Navbar siempre visible, cambia según autenticación */}
      {isAuthenticated ? <NavbarAuth /> : <NavbarGuest />}
      
        <div className="app-content">
          <Routes>
            {/* Página pública */}
            <Route path="/" element={<Landing />} />

            {/* Páginas protegidas (logueado) */}
            <Route
              path="/home"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/movie/:id"
              element={
                <ProtectedRoute>
                  <FilmInfo />
                </ProtectedRoute>
              }
            />

            <Route
              path="/user"
              element={
                <ProtectedRoute>
                  <UserProfile />
                </ProtectedRoute>
              }
            />
            <Route
              path="/search"
              element={
                <ProtectedRoute>
                  <Search />
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
        <Footer />
      </div>
    </AuthProvider>
  );
}
