"use client";

import { useCategories } from "@/app/_hooks/useCategories";
import { useCreatePost } from "@/app/_hooks/useCreatePost";
import { useEditPost } from "@/app/_hooks/useEditPost";
import Button from "@/app/_ui/Button";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import FileInput from "@/app/_ui/FileInput";
import RHFSelect from "@/app/_ui/RHFSelect";
import RHFTextField from "@/app/_ui/RHFTextField";
import { imageUrlToFile } from "@/app/_utils/fileFormatter";
import { XMarkIcon } from "@heroicons/react/24/outline";
import { yupResolver } from "@hookform/resolvers/yup";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Controller, useForm } from "react-hook-form";

import * as yup from "yup";

const schema = yup
  .object({
    title: yup
      .string()
      .min(5, "حداقل ۵ کاراکتر را وارد کنید")
      .required("عنوان ضروری است"),
    briefText: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    text: yup
      .string()
      .min(5, "حداقل ۱۰ کاراکتر را وارد کنید")
      .required("توضیحات ضروری است"),
    slug: yup.string().required("اسلاگ ضروری است"),
    readingTime: yup
      .number()
      .positive()
      .integer()
      .required("زمان مطالعه ضروری است")
      .typeError("یک عدد را وارد کنید"),
    category: yup.string().required("دسته بندی ضروری است"),
  })
  .required();

function CreatePostForm({ postToEdit = {} }) {
  const {
    _id: editId,
    title,
    briefText,
    text,
    slug,
    readingTime,
    category,
    coverImage,
    coverImageUrl: prevCoverImageUrl,
  } = postToEdit;

  const isEditSession = Boolean(editId);
  const { categories } = useCategories();
  const [coverImageUrl, setCoverImageUrl] = useState(prevCoverImageUrl || null);
  const { isEditting, editPost } = useEditPost();
  const router = useRouter();

  let editVlaues = {};
  if (isEditSession)
    editVlaues = {
      _id: editId,
      title,
      briefText,
      text,
      slug,
      readingTime,
      category: category._id,
      coverImage,
    };

  useEffect(() => {
    if (!prevCoverImageUrl) return;

    let isMounted = true;
    const convertingUrlToFile = async () => {
      try {
        const file = await imageUrlToFile(prevCoverImageUrl);
        if (isMounted) {
          setValue("coverImage", file);
        }
      } catch (error) {
        console.error("Error converting image URL to file:", error);
      }
    };
    convertingUrlToFile();

    return () => {
      isMounted = false;
    };
  }, [prevCoverImageUrl]);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    mode: "onTouched",
    defaultValues: editVlaues,
  });
  const { isCreating, createPost } = useCreatePost();
  function onSubmit(data) {
    const formData = new FormData();

    for (const key in data) {
      formData.append(key, data[key]);
    }

    if (isEditSession) {
      editPost(
        { id: editId, data: formData },
        {
          onSuccess: () => {
            reset();
            router.push("/profile/posts");
          },
        }
      );
    } else {
      createPost(formData, {
        onSuccess: () => router.push("/profile/posts"),
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
        label="متن کوتاه"
        name="briefText"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="متن"
        name="text"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="اسلاگ"
        name="slug"
        register={register}
        required
        errors={errors}
      />
      <RHFTextField
        label="زمان مطالعه"
        name="readingTime"
        register={register}
        required
        errors={errors}
      />
      <RHFSelect
        label="دسته بندی"
        required
        name="category"
        register={register}
        options={categories}
      />
      <Controller
        control={control}
        name="coverImage"
        rules={{ required: "عکس کاور پست الزامی است" }}
        render={({ field: { value, onChange, ...field } }) => {
          return (
            <FileInput
              {...field}
              value={value?.fileName}
              label="کاور پست"
              errors={errors}
              isRequired
              onChange={(e) => {
                const file = e.target.files[0];
                onChange(file);
                setCoverImageUrl(URL.createObjectURL(file));
                e.target.value = null;
              }}
            />
          );
        }}
      />

      {coverImageUrl && (
        <div className="relative  aspect-video overflow-hidden rounded-lg">
          <Image
            className="object-cover object-center"
            fill
            alt="cover-iamge"
            src={coverImageUrl}
          />
          <ButtonIcon
            type="button"
            onClick={() => {
              setCoverImageUrl(null);
              setValue("coverImage", null);
            }}
            variant="red"
            className="w-6 h-6 absolute !left-2 !top-2"
          >
            <XMarkIcon />
          </ButtonIcon>
        </div>
      )}

      <Button type="submit" variant="primary" className="w-full">
        {isCreating ? "در حال ارسال..." : "تایید"}
      </Button>
    </form>
  );
}

export default CreatePostForm;
