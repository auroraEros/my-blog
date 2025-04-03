import Link from "next/link";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import { PencilIcon } from "@heroicons/react/24/outline";

function UpdatePostBtn({id}) {
  return (
    <Link href={`/profile/posts/${id}/edit`}>
      <ButtonIcon>
        <PencilIcon />
      </ButtonIcon>
    </Link>
  );
}

export default UpdatePostBtn;
