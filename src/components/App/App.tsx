import "./App.module.css";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../Loader/Loader";
import SearchBar from "../SearchBar/SearchBar";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieGrid from "../MovieGrid/MovieGrid";
import MovieModal from "../MovieModal/MovieModal";
import type { Movie } from "../../types/movie.ts";
import { fetchMovies } from "../../services/movieServise.ts";

export default function App() {
  const [movies, setMovies] = useState<Movie[]>([]);
  const [isLoader, setIsLoader] = useState(false);
  const [isError, setIsError] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedMovie(null);
  };

  const handleSearch = async (query: string) => {
    try {
      setMovies([]);
      setIsLoader(true);
      setIsError(false);
      const result = await fetchMovies(query);
      if (result.length === 0) {
        toast.error("No movies found for your request.");
      }
      setMovies(result);
    } catch (error) {
      setIsError(true);
    } finally {
      setIsLoader(false);
    }
  };
  const handleSelect = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <>
      <SearchBar onSubmit={handleSearch} />
      {movies.length > 0 && (
        <MovieGrid movies={movies} onSelect={handleSelect} />
      )}
      {isLoader && <Loader />}
      <Toaster position="top-center" reverseOrder={false} />
      {isError && <ErrorMessage />}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </>
  );
}
