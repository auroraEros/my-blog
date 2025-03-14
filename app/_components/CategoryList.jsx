import Link from "next/link";
import { getCategories } from "@/app/_lib/postService";

async function CategoryList() {
  const {
    data: { categories },
  } = await getCategories();

  return (
    <ul className="space-y-4">
      <Link href="/blogs">همه</Link>
      {categories.map((category) => {
        return (
          <li key={category._id}>
            <Link href={`/blogs/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}

export default CategoryList;
