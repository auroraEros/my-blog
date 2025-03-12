"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchPosts } from "@/app/_lib/actions";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  function handleSubmit(e) {
    e.preventDefault();
    const search = e.target.search;
    const searchValue = search.value;
    const newParams = new URLSearchParams(searchParams.toString());

    if (searchValue) {
      newParams.set("search", searchValue);
    } else newParams.delete("search");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }
  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        className="textField__input py-3 text-xs bg-secondary-0"
      />
      <button
        type="submit"
        className="absolute left-0 top-0 ml-3 flex h-full items-center"
      >
        <MagnifyingGlassIcon className="h-4 text-secondary-400" />
      </button>
    </form>
  );
}

export default Search;
