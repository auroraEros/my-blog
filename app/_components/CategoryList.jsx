import Link from "next/link";
import { getCategories } from "@/app/_lib/postService";

async function CategoryList() {
  try {
    const {
      data: { categories },
    } = await getCategories();

    return (
      <ul className="space-y-4">
        <Link href="/blogs">همه</Link>
        {categories.map((category) => (
          <li key={category._id}>
            <Link href={`/blogs/category/${category.slug}`}>
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    );
  } catch (error) {
    console.error("Error fetching categories:", error);
    return <p className="text-red-500">خطا در بارگذاری دسته‌بندی‌ها</p>;
  }
}

export default CategoryList;
