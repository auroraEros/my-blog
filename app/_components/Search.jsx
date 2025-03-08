"use client";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { searchPosts } from "@/app/_lib/actions";
import { useSearchParams } from "next/navigation";

function Search() {
  const {searchParams}=useSearchParams();
  const query = searchParams?.search || "";
  return (
    <form action={searchPosts}  className="relative">
      <input
        key={query}
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        defaultValue={query}
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
