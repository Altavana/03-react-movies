import axios from "axios";
import type { Movie } from "../types/movie";

export interface MoviesHttpResponse {
  results: Movie[];
}
const myKey = import.meta.env.VITE_API_KEY;

export const fetchMovies = async (query: string): Promise<Movie[]> => {
  const response = await axios.get<MoviesHttpResponse>(
    `https://api.themoviedb.org/3/search/movie`,
    {
      headers: {
        Authorization: `Bearer ${myKey}`,
      },
      params: {
        query,
      },
    },
  );
  return response.data.results;
};
