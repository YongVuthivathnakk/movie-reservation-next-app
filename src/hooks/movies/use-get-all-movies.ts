import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetAllMovies = () => {
  const movies = useQuery(api.movies.getAllMovies);
  const isLoading = movies === undefined;
  return {
    movies,
    isLoading
  } 
}