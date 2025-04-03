import Image from "next/image";
import { notFound } from "next/navigation";
import PostComment from "@/app/_components/PostComment";
import RelatedPost from "@/app/_components/RelatedPost";
import { getPostBySlug, getPosts } from "@/app/_lib/postService";

export async function generateStaticParams() {
  const {
    data: { posts },
  } = await getPosts();
  const slugs = posts.map((post) => ({ slug: post.slug }));
  return slugs;
}

export async function generateMetadata({ params }) {
  const slug = await params.slug;
  const post = await getPostBySlug(slug);
  return {
    title: `پست ${post.title}`,
  };
}

async function Page({ params }) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post || Object.keys(post).length === 0) notFound();

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
          alt={`coverImage of the ${post.title}'s post `}
        />
      </div>
      {post.related.length > 0 && <RelatedPost posts={post.related} />}
      <PostComment post={post} />
    </div>
  );
}

export default Page;
