import queryString from "query-string";
import PostList from "@/app/_components/PostList";

async function Page({ params, searchParams }) {
  const { categorySlug } =await params;
  console.log(categorySlug)
  const queries = queryString.stringify(searchParams);
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?categorySlug=${categorySlug}&${queries}`
  );
  const { data } = await res.json();
  const posts = data ? data.posts : [];
  return (
    <div>
      {posts.length === 0 ? (
        <p className="text-lg text-secondary-600">{`پستی در این دسته بندی یافت نشد`}</p>
      ) : (
        <PostList posts={posts} />
      )}
    </div>
  );
}

export default Page;
