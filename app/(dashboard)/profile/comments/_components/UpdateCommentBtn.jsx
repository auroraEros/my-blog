"use client"

import ButtonIcon from "@/app/_ui/ButtonIcon";
import Modal from "@/app/_ui/Modal";
import { PencilIcon } from "@heroicons/react/24/outline";
import UpdateComment from "./UpdateComment";
import { useState } from "react";

function UpdateCommentBtn({comment}) {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const onClose = () => setIsEditOpen(false);
  return (
    <>
      <ButtonIcon variant="outline"
       onClick={() => setIsEditOpen(true)}
       >
        <PencilIcon className="text-error" />
      </ButtonIcon>

      <Modal title={`ویرایش نظر`} 
      open={isEditOpen} 
      onClose={onClose}
      >
        <UpdateComment onClose={onClose} comment={comment} />
      </Modal>
    </>
  );
}

export default UpdateCommentBtn;
