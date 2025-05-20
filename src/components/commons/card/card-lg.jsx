const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

function CardMovie({ movie }) {
  if (!movie) return null;

  return (
    <div className="flex text-red-500 bg-white shadow-md rounded-lg overflow-hidden max-w-4xl mx-auto">
      Hola
    </div>
  );
}

export default CardMovie;
