import { usePaginatedQuery, useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetMovies = (initialLimit: number = 10) => {
  const { results, status, loadMore } = usePaginatedQuery(
    api.movies.getMovies,
    {},
    { initialNumItems: initialLimit }
  );


  return {
    movies: results,
    isLoading: status === "LoadingFirstPage",
    isDone: status === "Exhausted",
    loadMore,
  }
}