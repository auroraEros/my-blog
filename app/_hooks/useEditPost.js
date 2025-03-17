import { useMutation, useQueryClient } from "@tanstack/react-query";
import { editPostApi } from "@/app/_lib/postService";
import toast from "react-hot-toast";

export function useEditPost() {
  const queryClient = useQueryClient();
  const { isPending: isEditting, mutate: editPost } = useMutation({
    mutationFn: editPostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isEditting, editPost };
}
