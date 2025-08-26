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


function MoviesDashboard() {
  const { movieData, isLoading } = useGetMovies();
  const { handleAddMovies } = useAddMovie();

  if (isLoading) return <p>Loading Data ...</p>;

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
      <div className="mb-4 flex gap-4 justify-end">
        <AddMovieButton />
        <Button onClick={handleGenerateData}>
          Generate 10 Data
        </Button>
      </div>
      <DataTable columns={columns} data={movieData || []} />
      
    </div>
  );
}

export default MoviesDashboard;
