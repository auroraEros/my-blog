import { notFound } from "next/navigation";
import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import { getCategoryById } from "@/app/_lib/categoryService";
import CreateCategoryForm from "@/app/_components/categoriesComponents/CreateCategoryForm";

async function Page({ params }) {
  const { categoryId } = await params;
  
  const category=await getCategoryById(categoryId);
  if(!category) notFound();
  

  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "دسته‌بندی‌ها", href: "/profile/categories" },
          {
            label: "ویرایش دسته‌بندی",
            href: `/profile/categories/${categoryId}/edit`,
            active: true,
          },
        ]}
      />
      <CreateCategoryForm categoryToEdit={category}/>
    </div>
  );
}

export default Page;
