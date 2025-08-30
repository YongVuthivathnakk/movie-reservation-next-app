"use client";

import React from "react";
import { DataTable } from "../components/table/data-table";
import { columns } from "../components/table/columns/movies";
import { useGetMovies } from "@/hooks/movies/use-get-movies";
import { Button } from "@/components/ui/button";
import { AddMovieButton } from "./components/add-movie-button";
import { sampleData } from "./sample-data";
import { useAddMovie } from "@/hooks/movies/use-add-movies";
import { toast } from "sonner";
import { Loader2 } from "lucide-react";
import { useMutation } from "convex/react";
import { api } from "../../../../convex/_generated/api";
import { LoadingData } from "../components/loading-data";
import { useGetAllMovies } from "@/hooks/movies/use-get-all-movies";


function MoviesDashboard() {
  // const {movies, isLoading, isDone, loadMore} = useGetMovies(10);

  const { movies, isLoading } = useGetAllMovies();
  const { handleAddMovies } = useAddMovie();
  const deleteData = useMutation(api.movies.deleteOnId);


  const handleGenerateData = async () => {
    try {
      for(const movie of sampleData) {
        await handleAddMovies(movie);
      }
      toast.success("All 10 data have been inserted");
    } catch (err) {
      console.error("Error seeding movies: ", err);
      toast.error("Error seeding movies!");
    }
  }


  return (
    <div className="p-6">
      <h1 className="text-xl font-semibold mb-4">Movie Table</h1>
        <DataTable columns={columns} data={movies || []} handleDelete={deleteData}>
          <AddMovieButton />
          <Button onClick={handleGenerateData}>
            Generate 10 Data
          </Button>
        </DataTable>
    </div>
  );
}

export default MoviesDashboard;
