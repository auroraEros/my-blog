import PostCard from "@/app/_components/PostCard";
import { getPostBySlug, getPosts } from "@/app/_lib/data-service";

export async function generateMetadata({ params }) {
  const post = await getPostBySlug(params.slug);

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

async function Page({ params }) {
  const post = await getPostBySlug(params.slug);

  return (
    <div>
      {Object.keys(post).length === 0 ? (
        <p>پستی با این مشخصات یافت نشد</p>
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
