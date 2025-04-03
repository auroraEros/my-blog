import ButtonIcon from "@/app/_ui/ButtonIcon";
import { PencilIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function UpdateCategoryBtn({id}) {

  return (
    <Link href={`/profile/categories/${id}/edit`}>
      <ButtonIcon>
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
}

export default UpdateCategoryBtn;
