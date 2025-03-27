import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { editCategoryApi } from "@/app/_lib/categoryService";

export function useEditCategory() {
  const queryClient = useQueryClient();
  const { isPending: isEditting, mutate: editCategory } = useMutation({
    mutationFn: editCategoryApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["categories"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isEditting, editCategory };
}
