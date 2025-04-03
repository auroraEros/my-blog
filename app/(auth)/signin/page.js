"use client";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";

import RHFTextField from "@/app/_ui/RHFTextField";
import Button from "@/app/_ui/Button";

import { useAuth } from "@/app/_context/AuthContext";

const schema = yup.object({
  email: yup
    .string()
    .email("ایمیل نامعتبر است")
    .required("این فیلد الازامی است"),
  password: yup.string().required("این فیلد الازامی است"),
});

function Page() {
  const {
    register,
    handleSubmit,
    formState: { errors, isLoading },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });

  const { signin } = useAuth();

  async function onSubmit(values) {
    await signin(values);
    reset();
  }
  return (
    <div>
      <h1 className="text-xl font-bold text-secondary-500 text-center mb-6">
        ورود به حساب کاربری
      </h1>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-10">
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
          {isLoading ? "در حال ورود..." : "ورود"}
        </Button>
      </form>
      <Link href="/signup" className="text-secondary-500 mt-6 text-center">
        ثبت نام
      </Link>
    </div>
  );
}

export default Page;
