import { useQuery } from "convex/react"
import { api } from "../../../convex/_generated/api"

export const useGetAllRooms = () => {
  const rooms = useQuery(api.rooms.getAllRooms);
  const isLoading = rooms === undefined;
  return {
    rooms,
    isLoading
  }
}