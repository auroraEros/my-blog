import { getAllPostsApi, getPosts } from "@/app/_lib/postService";
import Empty from "@/app/_ui/Empty";
import Table from "@/app/_ui/Table";
import PostRow from "./PostRow";

async function PostTable({ query = "" }) {
  try {
    const { posts } = await getAllPostsApi(query);

    if (!posts.length) {
      return (
        <Empty
          resourceName="پستی"
          message="هیچ پستی با این فیلترها یافت نشد"
          className="mt-8"
        />
      );
    }
    return (
      <div className="overflow-x-auto">
        <Table className="min-w-full">
          <Table.Header className="bg-secondary-50">
            <th>#</th>
            <th>عنوان</th>
            <th>دسته‌بندی</th>
            <th>نویسنده</th>
            <th className="text-left">تاریخ ایجاد</th>
            <th>نوع</th>
            <th className="text-center">عملیات</th>
          </Table.Header>
          <Table.Body>
            {posts.map((post, index) => (
              <PostRow
                post={post}
                key={`post-${post._id}-${index}`}
                index={index + 1}
              />
            ))}
          </Table.Body>
        </Table>
      </div>
    );
  } catch (error) {
    console.error("خطا در دریافت پست‌ها:", {
      error: error.message,
      query,
      timestamp: new Date().toISOString(),
    });
  }
}
export default PostTable;
