
import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { deleteCategoryApi } from "../_lib/categoryService";

export function useDeleteCategory() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deleteCategory } = useMutation({
    mutationFn: deleteCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isDeleting, deleteCategory };
}
