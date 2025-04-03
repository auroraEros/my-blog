import CreateCategoryForm from "@/app/_components/categoriesComponents/CreateCategoryForm";
import Breadcrumbs from "@/app/_ui/Breadcrumbs";

async function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "دسته‌بندی‌ها", href: "/profile/categories" },
          {
            label: "ایجاد دسته‌بندی",
            href: "/profile/categories/create",
            active: true,
          },
        ]}
      />
      <CreateCategoryForm />
    </div>
  );
}

export default Page;
