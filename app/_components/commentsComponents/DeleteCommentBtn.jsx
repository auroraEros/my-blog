"use client";
import { deleteComment } from "@/app/_lib/actions";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import ConfirmDelete from "@/app/_ui/ConfirmDelete";
import Modal from "@/app/_ui/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { startTransition, useActionState, useEffect, useState } from "react";
import toast from "react-hot-toast";

function DeleteCommentBtn({ id: commentId }) {
  const [state, formAction] = useActionState(deleteComment, {
    error: "",
    message: "",
  });
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  useEffect(() => {
    if (state?.message) {
      toast.success(state.message);
      setIsDeleteOpen(false);
    }
    if (state?.error) {
      toast.error(state.error);
    }
  }, [state]);

  return (
    <>
      <ButtonIcon variant="outline" onClick={() => setIsDeleteOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>
      <Modal
        title={`حذف نظر`}
        open={isDeleteOpen}
        onClose={() => setIsDeleteOpen(false)}
      >
        <ConfirmDelete
          title={`حذف نظر`}
          onClose={() => setIsDeleteOpen(false)}
          onConfirm={(formData) => {
            startTransition(() => {
              formAction({ formData, commentId });
            });
          }}
        />
      </Modal>
    </>
  );
}

export default DeleteCommentBtn;
