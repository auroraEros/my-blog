import Table from "@/app/_ui/Table";
import { toLocalDateShort } from "@/app/_utils/dateFormatter";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { truncateText } from "@/app/_utils/truncateText";
import UpdatePostBtn from "./UpdatePostBtn";
import DeletePostBtn from "./DeletePostBtn";

function PostRow({ index, post }) {
  const { title, createdAt, author, category, type,_id } = post;
  const PostType = {
    free: { className: "badge--success", label: "رایگان" },
    premium: { className: "badge--secondary", label: "پریمیوم" },
  };
  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(title, 30)}</td>
      <td>{category.title}</td>
      <td>{author.name}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${PostType[type].className}`}>{PostType[type].label}</span>
      </td>
      <td>
        <div className="flex items-center gap-x-3">
          <UpdatePostBtn id={_id}/>
          <DeletePostBtn id={_id}/>
        </div>
      </td>
    </Table.Row>
  );
}

export default PostRow;
