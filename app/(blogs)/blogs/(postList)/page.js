// import Image from "next/image";
import { getPosts } from "@/app/_lib/postService";
import PostList from "@/app/_components/PostList";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { setCookiesOnReq } from "@/app/_utils/setCookiesOnReq";
import { cookies } from "next/headers";
import { searchPosts } from "@/app/_lib/actions";
import queryString from "query-string";

async function Page({ searchParams }) {
  const queries = queryString.stringify(searchParams);
  const cookieStore = cookies();
  const option = setCookiesOnReq(cookieStore);
  const {
    data: { posts },
  } = await getPosts(queries, option);
  // const filteredPost = searchParams?.search ? searchPosts : posts;

  return (
    <>
      {searchParams.search ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? " هیچ پستی با این مشخصات پیدا نشد "
            : `نشان دادن ${toPersianDigits(posts.length)} نتیجه برای`}
          {/* <span className="font-bold">&quot;{search}&quot;</span> */}
        </p>
      ) : null}

      <PostList posts={posts} />
    </>
  );
}

export default Page;
