import { useQuery } from "convex/react";
import { api } from "../../../convex/_generated/api";

export const useGetAllUsers = () => {
  const users = useQuery(api.users.getAllUsers);
  const isLoading = users === undefined;

  return {
    users,
    isLoading,
  };
};
