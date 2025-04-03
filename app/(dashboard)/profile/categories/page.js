import CategoriesTable from "@/app/_components/categoriesComponents/CategoriesTable";
import CreateCategory from "@/app/_components/categoriesComponents/CreateCategory";
import Fallback from "@/app/_ui/Fallback";
import { Suspense } from "react";

function Page() {
  return (
    <div>
      <div className="flex justify-between items-center mb-12 text-secondary-700">
        <h1 className="text-xl font-bold">لیست دسته‌بندی‌ها</h1>
        <CreateCategory />
      </div>
      <div>
        <Suspense fallback={<Fallback />}>
          <CategoriesTable />
        </Suspense>
      </div>
    </div>
  );
}

export default Page;
