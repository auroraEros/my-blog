import Table from "@/app/_ui/Table";
import UpdateCategoryBtn from "./UpdateCategoryBtn";
import DeleteCategoryBtn from "./DeleteCategoryBtn";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { truncateText } from "@/app/_utils/truncateText";
import { toLocalDateShort } from "@/app/_utils/dateFormatter";

function CategoryRow({ category, index }) {
  const { title, _id, description, slug, createdAt } = category;
  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{title}</td>
      <td>{truncateText(description, 30)}</td>
      <td>{slug}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <div className="flex items-center gap-x-3">
          <UpdateCategoryBtn id={_id}/>
          <DeleteCategoryBtn id={_id} title={title}/>
        </div>
      </td>
    </Table.Row>
  );
}

export default CategoryRow;
