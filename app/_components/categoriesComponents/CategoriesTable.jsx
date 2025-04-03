import Table from "@/app/_ui/Table";
import CategoryRow from "./CategoryRow";
import { getCategoriesApi } from "@/app/_lib/categoryService";

async function CategoriesTable() {
  try {
    const { categories } = await getCategoriesApi();

    if (!categories.length) {
      return (
        <div className="text-center py-8 text-gray-500">
          هیچ دسته‌بندی یافت نشد
        </div>
      );
    }

    return (
      <Table>
        <Table.Header>
          <th>#</th>
          <th>عنوان</th>
          <th>توضیحات</th>
          <th>اسلاگ</th>
          <th>تاریخ ایجاد</th>
          <th>عملیات</th>
        </Table.Header>
        <Table.Body>
          {categories.map((category, index) => (
            <CategoryRow category={category} key={category._id} index={index} />
          ))}
        </Table.Body>
      </Table>
    );
  } catch (error) {
    return (
      <div className="text-center py-8 text-red-500">
        خطا در دریافت دسته‌بندی‌ها: {error.message}
      </div>
    );
  }
}

export default CategoriesTable;
