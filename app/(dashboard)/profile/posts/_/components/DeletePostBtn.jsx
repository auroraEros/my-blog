"use client";
import { useDeletePost } from "@/app/_hooks/useDeletePost";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import ConfirmDelete from "@/app/_ui/ConfirmDelete";
import Modal from "@/app/_ui/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import { useState } from "react";

function DeletePostBtn({ id, postTitle }) {
  const [open, setOpen] = useState(false);
  const { isDeleting, deletePost } = useDeletePost();
  const router = useRouter();
  return (
    <>
      <ButtonIcon variant="outline" onClick={() => setOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>
      <Modal
        title={`حذف ${postTitle}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={postTitle}
          onClose={() => setOpen(false)}
          onConfirm={() =>
            deletePost(id, {
              onSuccess: () => {
                router.refresh();
              },
            })
          }
          disabled={isDeleting}
        />
      </Modal>

      {/* {open && (
        <div>
          <p>are u sure?</p>
          <div className="flex gap-x-6">
            <button
              onClick={() => {
                deletePost(id, {
                  onSuccess: () => {
                    setOpen(false);
                    router.refresh();
                  },
                });
              }}
            >
              {isDeleting ? "deleting post...." : "yes"}
            </button>
            <button
              onClick={() => {
                setOpen(false);
              }}
            >
              no
            </button>
          </div>
        </div>
      )} */}
    </>
  );
}

export default DeletePostBtn;
