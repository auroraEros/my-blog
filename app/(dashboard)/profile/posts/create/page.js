import Breadcrumbs from "@/app/_ui/Breadcrumbs";
import CreatePostForm from "./_/components/CreatePostForm";

async function Page() {
  return (
    <div>
      <Breadcrumbs
        breadcrumbs={[
          { label: "پست‌ها", href: "/profile/posts" },
          { label: "ایجاد پست", href: "/profile/posts/create", active: true },
        ]}
      />
      <CreatePostForm />
    </div>
  );
}

export default Page;
