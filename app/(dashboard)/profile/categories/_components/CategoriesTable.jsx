import Table from "@/app/_ui/Table";
import CategoryRow from "./CategoryRow";
import UpdateCategoryBtn from "./UpdateCategoryBtn";
import DeleteCategoryBtn from "./DeleteCategoryBtn";
import { getCategoriesApi } from "@/app/_lib/categoryService";

async function CategoriesTable() {
  const { categories } = await getCategoriesApi();

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
        {categories.map((category,index) => (
          <CategoryRow category={category} key={category._id} index={index}/>
        ))}
      </Table.Body>
    </Table>
  );
}

export default CategoriesTable;
