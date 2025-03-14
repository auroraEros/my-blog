"use client"
import ButtonIcon from "@/app/_ui/ButtonIcon";
import { TrashIcon } from "@heroicons/react/24/outline";

function DeletePostBtn({id}) {
  return (
    <ButtonIcon variant="outline" onClick={()=>console.log(id)}>
      <TrashIcon className="text-error"/>
    </ButtonIcon>
  );
}

export default DeletePostBtn;
