// import Image from "next/image";
import { getPosts } from "@/app/_lib/data-service";
import PostList from "@/app/_components/PostList";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";


async function Page() {
 
  const {
    data: { posts },
  } = await getPosts();
  
  

  return (
    <>
      <p className="mb-4 text-secondary-700">
        {posts.length === 0
          ? " هیچ پستی با این مشخصات پیدا نشد "
          : `نشان دادن ${toPersianDigits(posts.length)} نتیجه برای`}
        {/* <span className="font-bold">&quot;{search}&quot;</span> */}
      </p>

      <PostList posts={posts} />
    </>
  );
}

export default Page;
