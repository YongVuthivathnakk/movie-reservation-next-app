import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const getAllSeats = () => {
  const seats = useQuery(api.seats.getAllSeats);
  const isLoading = seats === undefined;
  return {
    seats,
    isLoading,
  }
}