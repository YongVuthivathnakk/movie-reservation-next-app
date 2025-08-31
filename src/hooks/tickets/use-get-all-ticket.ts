import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useGetAllTickets = () =>{

  const tickets = useQuery(api.tickets.getAllTickets);
  const isLoading = tickets === undefined;
  return {
    tickets,
    isLoading,
  }

}