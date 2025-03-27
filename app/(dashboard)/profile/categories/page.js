
import CategoriesTable from "./_components/CategoriesTable";
import CreateCategory from "./_components/CreateCategory";

function Page() {
  return (
    <div>
      <div className="flex justify-between items-center mb-12 text-secondary-700">
        <h1 className="text-xl font-bold">لیست دسته‌بندی‌ها</h1>
        <CreateCategory />
      </div>
      <div>
        <CategoriesTable />
      </div>
    </div>
  );
}

export default Page;
