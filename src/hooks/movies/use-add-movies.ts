import { useMutation } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useAddMovie = () => {
  const addMovie = useMutation(api.movies.addMovies);
  const handleAddMovies = async (movieData: {
    title: string,
    description?: string,
    duration: number,
    genre: string,
    posterUrl: string,
    pricing: Record<string, number>,
    releaseDate: string,
    classification: string,
  }) => {
    try {
      await addMovie(movieData);
    } catch (err) {
      throw err;
    }
  };

  return { handleAddMovies };
};