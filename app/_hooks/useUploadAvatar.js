import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import {  uploadAvatarApi } from "../_lib/authService";

export function useUploadAvatar() {
  const queryClient = useQueryClient();
  const { isPending: isUploading, mutate: uploadAvatar } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["user"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  return { isUploading, uploadAvatar };
}