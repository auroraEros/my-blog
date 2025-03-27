"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";

const sortOptions = [
  { value: "latest", label: "تاریخ ایجاد (جدید ترین)" },
  { value: "oldest", label: "تاریخ ایجاد (قدیمی ترین)" },
  { value: "popular", label: "محبوبیت" },
  { value: "time_desc", label: "زمان مطالعه (نزولی)" },
  { value: "time_asc", label: "زمان مطالعه (صعودی)" }
];

function SortPosts() {
  const searchParams = useSearchParams();
  const [sort, setSort] = useState(searchParams.get("sort") || "newest");
  const pathname = usePathname();
  const router = useRouter();

  function handleSortChange(e) {
    const sort = e.target.value;
    console.log(sort);
    setSort(sort);
    const newParams = new URLSearchParams(searchParams.toString());

    newParams.set("sort", sort);
    router.push(`${pathname}?${newParams.toString()}`, { scroll: false });
  }

  return (
    <select
      onChange={handleSortChange}
      className="textField__input py-2.5 text-xs bg-secondary-0"
    >
      {sortOptions.map((option) => (
        <option value={option.value} key={option.value}>
          {option.label}
        </option>
      ))}
    </select>
  );
}

export default SortPosts;
