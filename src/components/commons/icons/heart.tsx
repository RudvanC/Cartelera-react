import { FaHeart, FaRegHeart } from "react-icons/fa";
import { useAuthContext } from "../../../pages/auth/AuthContext";



import "./icons-styles.module.css";

interface FavoriteButtonProps {
  movieId: string;
  size?: number;
  className?: string;
}

const FavoriteButton = ({ movieId, size = 24, className = "" }: FavoriteButtonProps) => {
  const { isAuthenticated, favorites, toggleFavorite } = useAuthContext();

  if (!isAuthenticated) return null; // Solo para usuarios logueados

  const isFav = favorites.includes(movieId);

  return (
    <button
      onClick={(e) => {
        e.stopPropagation();
        toggleFavorite(movieId);
      }}
      title="Añadir a favoritos"
      className={`favorite-button ${className}`}
    >
      {isFav ? <FaHeart color="red" size={size} /> : <FaRegHeart size={size} />}
    </button>
  );
};

export default FavoriteButton;
