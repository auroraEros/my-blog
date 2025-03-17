import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createPostApi } from "@/app/_lib/postService";
import toast from "react-hot-toast";

export function useCreatePost() {
  const queryClient = useQueryClient();
  const { isPending: isCreating, mutate: createPost } = useMutation({
    mutationFn: createPostApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["posts"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isCreating, createPost };
}
