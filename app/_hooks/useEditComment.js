import { useMutation, useQueryClient } from "@tanstack/react-query";
import UpdateComment from "../(dashboard)/profile/comments/_components/UpdateComment";
import toast from "react-hot-toast";

export function useEditComment() {
  const queryClient = useQueryClient();

  const { isPending: isEditting, mutate: editComment } = useMutation({
    mutationFn: UpdateComment,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["comments"]);
    },
    onError: (error) => toast.error(error?.response?.data?.message),
  });
  return { isEditting, editComment };

}
