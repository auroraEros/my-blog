import { getAllCommentsApi } from "@/app/_lib/commentService";
import Table from "@/app/_ui/Table";
import CommentRow from "./CommentRow";

async function CommentsTable() {
  const { comments } = await getAllCommentsApi();
  console.log(comments[0]);
  let counter = 0; // شمارنده‌ی مستقل
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>متن</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>وضعیت</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {comments.map((comment) => {
          const rowIndex = counter++; // شماره‌ی این کامنت

          return (
            <>
              <CommentRow comment={comment} index={rowIndex} />
              {comment.answers.length > 0 &&
                comment.answers.map((answer) => {
                  const answerIndex = counter++; // شماره‌ی این جواب
                  return (
                    <CommentRow
                      comment={answer}
                      key={answer._id}
                      index={answerIndex}
                    />
                  );
                })}
            </>
          );
        })}
      </Table.Body>
    </Table>
  );
}

export default CommentsTable;
