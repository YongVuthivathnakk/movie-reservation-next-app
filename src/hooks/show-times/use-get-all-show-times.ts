import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetAllShowtimes = () => {
  const showtimes = useQuery(api.showTimes.getAllShowtimes);
  const isLoading = showtimes === undefined; 
  return {
    showtimes,
    isLoading
  }
}