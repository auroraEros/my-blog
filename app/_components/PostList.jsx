import PostCard from "./PostCard";

function PostList({ posts }) {
  if (posts.length === 0) return null;
  return (
    <div className="grid grid-cols-12 gap-8">
      {posts.map((post) => (
        <div
          className="col-span-12 sm:col-span-6 lg:col-span-4 border border-secondary-300 p-2 rounded-lg "
          key={post.id}
        >
          <PostCard post={post} />
        </div>
      ))}
    </div>
  );
}

export default PostList;
