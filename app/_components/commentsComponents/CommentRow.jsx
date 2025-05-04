import Table from "@/app/_ui/Table";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { truncateText } from "@/app/_utils/truncateText";
import { toLocalDateShort } from "@/app/_utils/dateFormatter";
import UpdateCommentBtn from "./UpdateCommentBtn";
import DeleteCommentBtn from "./DeleteCommentBtn";


function CommentRow({ comment, index }) {

  const { content, _id, user, status, createdAt } = comment;
  const commentStatus = [
    {
      label: "رد شده",
      className: "badge--danger",
    },
    {
      label: "در انتظار تایید",
      className: "badge--secondary",
    },
    {
      label: "تایید شده",
      className: "badge--success",
    },
  ];

  return (
    <Table.Row>
      <td>{toPersianDigits(index + 1)}</td>
      <td>{truncateText(content.text, 30)}</td>
      <td>{user.name || "user"}</td>
      <td>{toLocalDateShort(createdAt)}</td>
      <td>
        <span className={`badge ${commentStatus[status].className}`}>
          {`${commentStatus[status].label}`}
        </span>
      </td>
      <td>
        <div className="flex items-center gap-x-3">
          <UpdateCommentBtn comment={comment} />
          <DeleteCommentBtn id={_id} />
        </div>
      </td>
    </Table.Row>
  );
}

export default CommentRow;
