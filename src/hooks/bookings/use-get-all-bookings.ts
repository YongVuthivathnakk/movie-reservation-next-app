import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetAllBookings = () => {
  const bookings = useQuery(api.bookings.getAllBookings);
  const isLoading = bookings === undefined;
  return {
    bookings,
    isLoading,
  }
}