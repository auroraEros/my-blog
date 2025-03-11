"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import RHFTextField from "@/app/_ui/RHFTextField";
import Button from "@/app/_ui/Button";

import toast from "react-hot-toast";
import { signupApi } from "@/app/_lib/authService";
import { useAuth } from "@/app/_context/AuthContext";

const schema = yup.object({
  name: yup
    .string()
    .min(3, "نام نباید کمتر از 3 کاراکتر باشذ")
    .required("این فیلد اجباری است"),
  email: yup
    .string()
    .email("ایمیل نامعتبر است")
    .required("این فیلد اجباری است"),
  password: yup.string().required("این فیلد اجباری است"),
});

function Page() {
  const {
    register,
    handleSubmit,
    formState: { isLoading, errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signup } = useAuth();
  async function onSubmit(values) {
    await signup(values);
    reset();
  }
  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ثبت نام
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
        <RHFTextField
          name="name"
          label="نام"
          register={register}
          errors={errors}
          isRequired
        />
        <RHFTextField
          name="email"
          label="ایمیل"
          register={register}
          errors={errors}
          isRequired
          type="email"
          dir="ltr"
        />
        <RHFTextField
          name="password"
          label="رمز عبور "
          register={register}
          errors={errors}
          isRequired
          type="password"
          dir="ltr"
        />
        <Button type="submit" variant="primary" className="w-full">
          تایید
        </Button>
      </form>
      <Link href="/signin" className="text-secondary-500 mt-6 text-center">
        ورود
      </Link>
    </div>
  );
}

export default Page;
