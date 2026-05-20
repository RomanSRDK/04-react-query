import axios from "axios";
import { type Movie } from "../types/movie";

const token = import.meta.env.VITE_TMDB_TOKEN;

axios.defaults.baseURL = "https://api.themoviedb.org/3";
axios.defaults.headers.common["Authorization"] = `Bearer ${token}`;

interface GetMovieRes {
  page: number;
  results: Movie[];
  total_pages: number;
}

export const fetchMovies = async (
  topic: string,
  page: number,
): Promise<GetMovieRes> => {
  const { data } = await axios.get<GetMovieRes>(
    `/search/movie?query=${topic}&page=${page}`,
  );

  return data;
};
