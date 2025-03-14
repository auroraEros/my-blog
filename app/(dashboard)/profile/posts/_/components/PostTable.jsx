import { getPosts } from "@/app/_lib/postService";
import Empty from "@/app/_ui/Empty";
import Table from "@/app/_ui/Table";
import PostRow from "./PostRow";

async function PostTable({query=""}) {
  const { data } = await getPosts(query);
  const posts = data?.posts ?? [];
  
  if (!posts.length) return <Empty resourceName="پستی" />;
  return (
    <Table>
      <Table.Header>
        <th>#</th>
        <th>عنوان</th>
        <th>دسته‌بندی</th>
        <th>نویسنده</th>
        <th>تاریخ ایجاد</th>
        <th>نوع</th>
        <th>عملیات</th>
      </Table.Header>
      <Table.Body>
        {posts.map((post, index) => (
          <PostRow post={post} key={post._id} index={index} />
        ))}
      </Table.Body>
    </Table>
  );
}

export default PostTable;
