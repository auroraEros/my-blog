import PostComment from "@/app/_components/PostComment";
import RelatedPost from "@/app/_components/RelatedPost";
import { getPostBySlug, getPosts } from "@/app/_lib/data-service";
import Image from "next/image";

export async function generateStaticParams() {
  const {
    data: { posts },
  } = await getPosts();
  const slugs = posts.map((post) => ({ slug: post.slug }));
  return slugs;
}

async function Page({ params }) {
  const post = await getPostBySlug(params.slug);
  console.log(post);
  return (
    <div className="text-secondary-600 max-w-screen-md mx-auto">
      <h1 className="text-secondary-700 text-2xl font-bold mb-8">
        {post.title}
      </h1>
      <p className="mb-4">{post.briefText}</p>
      <p className="mb-8">{post.text}</p>
      <div className="relative aspect-video overflow-hidden rounded-lg mb-10">
        <Image
          className="object-cover object-center hover:scale-110 transition-all ease-out duration-300"
          fill
          src={post.coverImageUrl}
        />
      </div>
      {post.related.length > 0 && <RelatedPost posts={post.related} />}
      <PostComment post={post} />
    </div>
  );
}

export default Page;
