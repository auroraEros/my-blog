import { notFound } from "next/navigation";
import React from "react";
import { getAllCommentsApi } from "@/app/_lib/commentService";
import Table from "@/app/_ui/Table";
import CommentRow from "./CommentRow";

async function CommentsTable() {
  try {
    const response = await getAllCommentsApi();
    if (!response || !response.comments) {
      console.error("پاسخ نامعتبر از سرور:", response);
      notFound();
    }

    const { comments } = response;

    if (!comments.length) {
      return (
        <div className="text-center py-8">
          <p className="text-secondary-500">هیچ نظری یافت نشد</p>
        </div>
      );
    }

    let counter = 0;
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
            const rowIndex = counter++;

            return (
              <React.Fragment key={`comment-${comment._id}`}>
                <CommentRow comment={comment} index={rowIndex} />
                {comment.answers?.length > 0 &&
                  comment.answers.map((answer) => (
                    <CommentRow
                      key={`answer-${answer._id}`}
                      comment={answer}
                      index={counter++}
                    />
                  ))}
              </React.Fragment>
            );
          })}
        </Table.Body>
      </Table>
    );
  } catch (error) {
    console.error("خطا در دریافت نظرات:", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    if (error instanceof TypeError) {
      return (
        <div className="text-center py-8 text-red-500">
          <p>خطا در ارتباط با سرور</p>
        </div>
      );
    }
    notFound();
  }
}





export default CommentsTable;
