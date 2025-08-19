import { useQuery } from "convex/react"
import { api } from "../../../../../convex/_generated/api"

export const useCurrentUser = () => {
  const userData = useQuery(api.users.current);
  const isCurrentUserLoading = userData === undefined;

  return {userData, isCurrentUserLoading}
}