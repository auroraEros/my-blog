"use client";
import { useRef } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";

function Search() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();
  const searchInputRef = useRef();

  function handleSubmit(e) {
    e.preventDefault();
    const searchValue = searchInputRef.current.value;
    const newParams = new URLSearchParams(searchParams.toString());
    newParams.set("page", "1");

    if (searchValue) {
      newParams.set("search", searchValue);
    } else newParams.delete("search");
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
    searchInputRef.current.value = "";
  }

  return (
    <form onSubmit={handleSubmit} className="relative">
      <input
        type="text"
        name="search"
        placeholder="جستجو ..."
        autoComplete="off"
        className="textField__input py-3 text-xs bg-secondary-0"
        ref={searchInputRef}
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
