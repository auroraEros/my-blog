import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import CreateCategoryForm from "./_components/CreateCategoryForm";

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
