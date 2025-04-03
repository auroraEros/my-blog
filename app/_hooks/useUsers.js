import {  useQuery } from "@tanstack/react-query";

import { getAllUsersApi } from "../_lib/authService";

export function useUsers() {

  const { data, error, isLoading } = useQuery({
    queryKey: ["users"],
    queryFn: getAllUsersApi,
  });
  return { data, error, isLoading };
}
