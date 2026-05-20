import { useEffect, useState } from "react";
import { useQuery, keepPreviousData } from "@tanstack/react-query";
import type { Movie } from "../../types/movie";

import toast, { Toaster } from "react-hot-toast";
import { fetchMovies } from "../../services/movieService";

import SearchBar from "../SearchBar/SearchBar";
import MovieGrid from "../MovieGrid/MovieGrid";
import Loader from "../Loader/Loader";
import ErrorMessage from "../ErrorMessage/ErrorMessage";
import MovieModal from "../MovieModal/MovieModal";

import css from "./App.module.css";
import Paginate from "../Paginate/Paginate";

export default function App() {
  const [topic, setTopic] = useState("");
  const [selectedMovie, setSelectedMovie] = useState<Movie | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [page, setPage] = useState(1);

  const { data, isLoading, isError } = useQuery({
    queryKey: ["movies", topic, page],
    queryFn: () => fetchMovies(topic, page),
    enabled: topic !== "",
    placeholderData: keepPreviousData,
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

  //Modal Window
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  const handleOpenModal = (movie: Movie) => {
    setSelectedMovie(movie);
    openModal();
  };
  //Modal Window

  const handleSearch = (valueFromSearchBar: string) => {
    setTopic(valueFromSearchBar);
    setPage(1);
  };

  return (
    <div className={css.app}>
      <SearchBar onSubmit={handleSearch} />
      {isLoading && <Loader />}
      {isError && <ErrorMessage />}

      {data && data.results.length > 0 && (
        <MovieGrid movies={data.results} onSelect={handleOpenModal} />
      )}
      <Toaster />
      {data && data.total_pages > 1 && (
        <Paginate
          totalPages={data.total_pages}
          page={page}
          onPageChange={setPage}
        />
      )}
      {isModalOpen && selectedMovie && (
        <MovieModal movie={selectedMovie} onClose={closeModal} />
      )}
    </div>
  );
}
