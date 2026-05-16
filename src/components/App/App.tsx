import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import "../../services/movieService";
import type { Movie } from "../../types/movie";

import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import css from "./App.module.css";

export default function App() {
  const [topic, setTopic] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", topic],
    queryFn: () => fetchMovies(topic),
    enabled: topic !== "",
  });

  useEffect(() => {
    if (data && !data.results.length) {
      toast.error("No movies found for your request", {
        style: {
          borderRadius: "10px",
          background: "#333",
          color: "#fff",
        },
      });
    }
  }, [data]);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };

  return (
    <div className={css.app}>
      <SearchBar
        onSubmit={(valueFromSearchBar) => setTopic(valueFromSearchBar)}
      />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data?.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleOpenModal} />
      )}
      <Toaster />
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
