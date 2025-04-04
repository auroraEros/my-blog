"use client";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { Controller, useForm } from "react-hook-form";
import { useAuth } from "@/app/_context/AuthContext";
import { useUploadAvatar } from "@/app/_hooks/useUploadAvatar";
import Avatar from "@/app/_ui/Avatar";
import Button from "@/app/_ui/Button";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import FileInput from "@/app/_ui/FileInput";
import Modal from "@/app/_ui/Modal";
import { imageUrlToFile } from "@/app/_utils/fileFormatter";
import { useEffect, useState } from "react";
import { XMarkIcon } from "@heroicons/react/24/outline";

function EditAvatar({ user }) {
  const { avatar, avatarUrl: prevAvatarUrl } = user;
  const { updateUser } = useAuth();
  const [avatarUrl, setAvatarUrl] = useState(prevAvatarUrl || null);
  const { isUploading, uploadAvatar } = useUploadAvatar();
  const router = useRouter();
  const [isHidden, setIsHidden] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const onClose = () => setOpenModal(false);

  let editVlaues = {
    avatar,
  };

  useEffect(() => {
    if (!prevAvatarUrl) return;

    let isMounted = true;
    const convertingUrlToFile = async () => {
      try {
        const file = await imageUrlToFile(prevAvatarUrl);
        if (isMounted) {
          setValue("avatar", file);
        }
      } catch (error) {
        console.error("Error converting image URL to file:", error);
      }
    };
    convertingUrlToFile();

    return () => {
      isMounted = false;
    };
  }, [prevAvatarUrl]);

  const {
    control,
    register,
    setValue,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    defaultValues: editVlaues,
  });

  function handleHoverIn() {
    setIsHidden(true);
  }
  function handleHoverOut() {
    setIsHidden(false);
  }
  function onSubmit(data) {
    if (!data.avatar) return;
    const formData = new FormData();
    formData.append("avatar", data.avatar);

    uploadAvatar(formData, {
      onSuccess: async (newUserData) => {
        await updateUser(newUserData);
        setAvatarUrl(newUserData.avatarUrl);
        router.refresh();
      },
    });
    router.refresh();
    setOpenModal(false);
  }
  return (
    <>
      <div
        className="w-40 h-40  transition duration-300 cursor-pointer"
        onMouseEnter={handleHoverIn}
        onMouseLeave={handleHoverOut}
        onClick={() => setOpenModal(true)}
      >
        <div className="flex flex-col items-center gap-y-2">
          <Avatar src={user?.avatarUrl} size={40} key={user?.avatarUrl} />

          {isHidden && (
            <p
              className={`bg-primary-900 text-primary-100 rounded-lg text-center px-3 py-1 
            transition-all duration-300 transform ${
              isHidden ? "opacity-100 scale-100" : "opacity-0 scale-95"
            }`}
            >
              تغییر آواتار
            </p>
          )}
        </div>
      </div>
      <Modal title="انتخاب تصویر" open={openModal} onClose={onClose}>
        <form className="form" onSubmit={handleSubmit(onSubmit)}>
          <Controller
            control={control}
            name="avatar"
            render={({ field: { value, onChange, ...field } }) => {
              return (
                <FileInput
                  {...field}
                  value={value?.fileName}
                  label="تصویر آواتار"
                  errors={errors}
                  isRequired
                  onChange={(e) => {
                    const file = e.target.files[0];
                    onChange(file);
                    setAvatarUrl(URL.createObjectURL(file));
                    e.target.value = null;
                  }}
                />
              );
            }}
          />
          {avatarUrl && (
            <div className="relative  aspect-video overflow-hidden rounded-lg">
              <Image
                className="object-cover object-center"
                fill
                alt="avatar-iamge"
                src={avatarUrl}
              />
              <ButtonIcon
                type="button"
                onClick={() => {
                  setAvatarUrl(null);
                  setValue("avatar", null);
                }}
                variant="red"
                className="w-6 h-6 absolute !left-2 !top-2"
              >
                <XMarkIcon />
              </ButtonIcon>
            </div>
          )}
          <Button type="submit" variant="primary" className="w-full">
            {isUploading ? "در حال ارسال..." : "تایید"}
          </Button>
        </form>
      </Modal>
    </>
  );
}

export default EditAvatar;
