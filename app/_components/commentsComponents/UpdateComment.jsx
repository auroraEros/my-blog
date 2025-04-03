"use client";
import { useActionState, useEffect } from "react";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { updateComment } from "@/app/_lib/actions";
import RHFSelect from "@/app/_ui/RHFSelect";
import SubmitButton from "@/app/_ui/SubmitButton";

const statusOptions = [
  {
    id: 1,
    label: "رد شده",
    value: 0,
  },
  {
    id: 2,
    label: "در انتظار تایید",
    value: 1,
  },
  {
    id: 3,
    label: "قبول",
    value: 2,
  },
];

function UpdateComment({ comment, onClose, onConfirm }) {
  const [state, formAction] = useActionState(updateComment, {
    error: "",
    message: "",
  });

  const { register } = useForm({
    defaultValues: { status: comment.status },
  });

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      onClose();
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <form
      className="form"
      action={async (formData) => {
        await formAction({ formData, commentId: comment._id });
      }}
    >
      <RHFSelect
        label="تغییر وضعیت"
        required
        name="status"
        register={register}
        options={statusOptions}
      />
      <SubmitButton type="submit" variant="primary" className="w-full">
        تایید
      </SubmitButton>
    </form>
  );
}

export default UpdateComment;
