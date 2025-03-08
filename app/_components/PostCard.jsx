import CoverImage from "@/app/_ui/CoverImage";
import ReadingTime from "@/app/_ui/ReadingTime";
import Author from "@/app/_ui/Author";
import PostInteractions from "./PostInteractions";
import Link from "next/link";

function PostCard({ post }) {
  return (
    <div>
      <CoverImage {...post} />
      <div>
        <Link href={`/blogs/${post.slug}`}>
          <h2 className="mb-4 font-bold text-secondary-700 hover:text-primary-900 transition-all ease-out">
            {post.title}
          </h2>
        </Link>
        <div className="flex items-center justify-between mb-4">
          <Author {...post.author} />
          <ReadingTime readingTime={post.readingTime} />
        </div>
        <PostInteractions post={post} />
      </div>
    </div>
  );
}

export default PostCard;
