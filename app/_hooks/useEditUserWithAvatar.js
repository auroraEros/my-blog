import toast from 'react-hot-toast';
import { updateUserApi, uploadAvatarApi } from '../_lib/authService';
import { useMutation, useQueryClient } from '@tanstack/react-query';

export function useEditUserWithAvatar() {
  const queryClient = useQueryClient();
  
  const { isPending: isEditting, mutate: editUser } = useMutation({
    mutationFn: updateUserApi,
    onSuccess: () => {
     
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  
  const { isPending: isUploading, mutate: uploadAvatar } = useMutation({
    mutationFn: uploadAvatarApi,
    onSuccess: (data) => {
      toast.success(data.message);
      queryClient.invalidateQueries(["users"]);
    },
    onError: (err) => toast.error(err?.response?.data?.message),
  });
  
  const isPending = isEditting || isUploading;

  const executeMutations = async (userData, avatarData) => {
    try {
      const userMutationPromise = editUser(userData);  // ابتدا ویرایش کاربر
      const avatarMutationPromise = uploadAvatar(avatarData);  // سپس آپلود آواتار

      // منتظر می‌مانیم که هر دو عملیات به پایان برسند
      await Promise.all([userMutationPromise, avatarMutationPromise]);

      // اگر هر دو موفق بودند
      toast.success('اطلاعات با موفقیت به‌روزرسانی شد');
    } catch (err) {
      // اگر یکی از عملیات‌ها با خطا مواجه شد
      toast.error('خطایی در به‌روزرسانی پروفایل رخ داد');
    }
  };

  return { isPending, executeMutations };
}
