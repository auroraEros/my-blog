import PostCard from "@/app/_components/PostCard";
import PostList from "@/app/_components/PostList";
import { getPostBySlug, getPosts } from "@/app/_lib/postService";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import queryString from "query-string";

export async function generateMetadata({ params }) {
  const { slug } = params;
  const post = await getPostBySlug(slug);

  return { title: Object.keys(post).length > 0 ? post.title : "پست یافت نشد" };
}

export async function generateStaticParams() {
  const {
    data: { posts },
  } = await getPosts();
  const slugs = posts.map((post) => ({
    slug: post.slug,
  }));
  return slugs;
}

async function Page({ params, searchParams }) {
  const queries = queryString.stringify(searchParams);
  const {
    data: { posts },
  } = await getPosts(queries);
  const post = await getPostBySlug(params.slug);
  const { search } = searchParams;
  return (
    <div>
      {Object.keys(post).length === 0 ? (
        <p>پستی با این مشخصات یافت نشد</p>
      ) : search ? (
        <>
          <p className="mb-4 text-secondary-700">
            {posts.length === 0
              ? " هیچ پستی با این مشخصات پیدا نشد "
              : `نشان دادن ${toPersianDigits(posts.length)} نتیجه برای`}
            <span className="font-bold">&quot;{search}&quot;</span>
          </p>
          <PostList posts={posts} />
        </>
      ) : (
        <div className="grid grid-cols-12 gap-8">
          <div className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-300 p-2 rounded-lg ">
            <PostCard post={post} />
          </div>
        </div>
      )}
    </div>
  );
}

export default Page;
