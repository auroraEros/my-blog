"use client";

import { useDeleteCategory } from "@/app/_hooks/useDeleteCategory";
import { deleteCategoryApi } from "@/app/_lib/categoryService";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import ConfirmDelete from "@/app/_ui/ConfirmDelete";
import Modal from "@/app/_ui/Modal";
import { TrashIcon } from "@heroicons/react/24/outline";
import { useRouter } from "next/navigation";
import {  useState } from "react";

function DeleteCategoryBtn({ id, title }) {
  const { isDeleting, deleteCategory } = useDeleteCategory();

  const [open, setOpen] = useState(false);
  const router = useRouter();

  

  return (
    <>
      <ButtonIcon variant="outline" onClick={() => setOpen(true)}>
        <TrashIcon className="text-error" />
      </ButtonIcon>
      <Modal
        title={`حذف ${title}`}
        open={open}
        onClose={() => setOpen(false)}
      >
        <ConfirmDelete
          resourceName={title}
          onClose={() => setOpen(false)}
          onConfirm={() =>
            deleteCategory(id, {
              onSuccess: () => {
                router.refresh();
              },
            })
          }
          disabled={isDeleting}
        />
      </Modal>
    </>
  );
}

export default DeleteCategoryBtn;
