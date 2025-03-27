"use client";
import { yupResolver } from "@hookform/resolvers/yup";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { useCreateCategory } from "@/app/_hooks/useCreateCategory";
import { useEditCategory } from "@/app/_hooks/useEditCategory";
import Button from "@/app/_ui/Button";
import RHFTextField from "@/app/_ui/RHFTextField";

const schema = yup.object({
  title: yup
    .string()
    .trim()
    .min(5, "حداقل ۵ کاراکتر را وارد کنید")
    .required("عنوان ضروری است"),
  englishTitle: yup
    .string()
    .trim()
    .notRequired()
    .matches(/^[a-zA-Z\s]+$/, "فقط حروف انگلیسی مجاز هستند.")
    .min(3, "عنوان انگلیسی باید حداقل ۳ کاراکتر باشد.")
    .max(50, "عنوان انگلیسی نباید بیش از ۵۰ کاراکتر باشد.")
    .nullable(),

  description: yup
    .string()
    .trim()
    .nullable()
    .transform((value) => (value === null ? "" : value))
    .min(10, "حداقل ۱۰ کاراکتر را وارد کنید")
    .max(200, "توضیحات نباید بیش از ۲۰۰ کاراکتر باشد.")
    .required("توضیحات ضروری است"),
});
function CreateCategoryForm({ categoryToEdit = {} }) {
  console.log(categoryToEdit);
  const {
    _id: editId,
    title,
    description,
    englishTitle,
  } = categoryToEdit;

  const isEditSession = Boolean(editId);

  const { isEditting, editCategory } = useEditCategory();
  const router = useRouter();

  const {
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
  });
  const { isCreating, createCategory } = useCreateCategory();

  useEffect(() => {
    if (Object.keys(categoryToEdit).length > 0) {
      setValue("title", title);
      setValue("englishTitle", englishTitle);
      setValue("description", description);
    }
  }, [isEditSession, setValue]);
  function onSubmit(data) {
    if (isEditSession) {
      editCategory(
        { id: editId, data },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/categories");
          },
        }
      );
    } else {
      createCategory(data, {
        onSuccess: () => router.push("/profile/categories"),
      });
    }
  }
  return (
    <form className="form" onSubmit={handleSubmit(onSubmit)}>
      <RHFTextField
        label="عنوان"
        name="title"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="عنوان انگلیسی"
        name="englishTitle"
        register={register}
        errors={errors}
      />
      <RHFTextField
        label="متن کوتاه"
        name="description"
        register={register}
        required
        errors={errors}
      />


      <Button type="submit" variant="primary" className="w-full">
        {isCreating
          ? "در حال ایجاد..."
          : isEditting
            ? "در حال به‌روز رسانی..."
            : "تایید"}
      </Button>
    </form>
  );
}

export default CreateCategoryForm;
