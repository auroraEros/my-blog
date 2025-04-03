import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUserApi } from "../_lib/authService";

export function useEditUser() {
  const queryClient = useQueryClient();
  const { isPending: isEditting, mutate: editUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
    
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isEditting, editUser };
}