import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetAllSeats = () => {
  const seats = useQuery(api.seats.getAllSeats);
  const isLoading = seats === undefined;
  return {
    seats,
    isLoading,
  }
}