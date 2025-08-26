import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetMovies = () => {
  const movieData = useQuery(api.movies.getMovies);
  const isLoading = movieData === undefined;
  return { movieData, isLoading};
}