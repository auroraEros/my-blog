import { PlusIcon } from "@heroicons/react/24/outline";
import Link from "next/link";

function CreateCategory() {
  return (
    <Link
      href="/profile/categories/create"
      className="justify-self-end flex gap-x-4 py-3 items-center rounded-lg bg-primary-900 px-4 text-sm font-medium text-secondary-0 
    transition-colors hover:bg-primary-700"
    >
      <span className="hidden md:block">ایجاد دسته‌بندی</span>
      <PlusIcon className="w-5" />
    </Link>
  );
}

export default CreateCategory;
