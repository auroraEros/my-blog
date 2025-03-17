import { useMutation, useQueryClient } from "@tanstack/react-query";
import { deletePostApi } from "@/app/_lib/postService";
import toast from "react-hot-toast";

export function useDeletePost() {
  const queryClient = useQueryClient();
  const { isPending: isDeleting, mutate: deletePost } = useMutation({
    mutationFn: deletePostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isDeleting, deletePost };
}
