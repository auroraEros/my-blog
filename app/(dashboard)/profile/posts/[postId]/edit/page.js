import { getPostById } from "@/app/_lib/postService";
import CreatePostForm from "../../create/_/components/CreatePostForm";
import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import { notFound } from "next/navigation";

async function Page({ params }) {
  const { postId } = await params;
  const data = await getPostById(postId);
  const post = data?.post ?? {};

  if (!post || Object.keys(post).length === 0) notFound();
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست‌ها", href: "/profile/posts" },
          {
            label: "ویرایش پست",
            href: `/profile/posts/${postId}/edit`,
            active: true,
          },
        ]}
      />
      <CreatePostForm  postToEdit={post}/>
    </div>
  );
}

export default Page;
