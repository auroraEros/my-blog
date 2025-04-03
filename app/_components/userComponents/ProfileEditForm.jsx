"use client";

import { useAuth } from "@/app/_context/AuthContext";
import { useEditUser } from "@/app/_hooks/useEditUser";
import Button from "@/app/_ui/Button";
import RHFTextField from "@/app/_ui/RHFTextField";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import EditAvatar from "./EditAvatar";

const profileSchema = yup.object({
  name: yup
    .string()
    .min(5, "حداقل ۵ کاراکتر را وارد کنید")
    .required("نام ضروری است"),
  email: yup
    .string()
    .trim()
    .email("فرمت ایمیل صحیح نیست")
    .required("ایمیل الزامی است"),
});

function ProfileEditForm({ user }) {
  const { name, email } = user;
  const { updateUser } = useAuth();
  const { isEditting, editUser } = useEditUser();
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isDirty },
  } = useForm({
    resolver: yupResolver(profileSchema),
    mode: "onTouched",
    defaultValues: {
      name: name,
      email: email,
    },
  });

  const onSubmit = (data) => {
    try {
      editUser(data, {
        onSuccess: () => {
          updateUser(data);
          router.replace("/profile");
        },
      });
    } catch (error) {
      console.error("خطا در ویرایش پروفایل:", error);
    }
  };
  return (
    <div className="flex flex-col gap-y-8 justify-between items-center">
      <EditAvatar user={user} />
      <form className="form" onSubmit={handleSubmit(onSubmit)}>
        <RHFTextField
          label="نام"
          name="name"
          register={register}
          required
          errors={errors}
        />
        <RHFTextField
          label="ایمیل"
          name="email"
          register={register}
          required
          errors={errors}
        />

        <Button type="submit" variant="primary" className="w-full">
          {isEditting ? "در حال ارسال..." : "تایید"}
        </Button>
      </form>
    </div>
  );
}

export default ProfileEditForm;
