import { cookies } from "next/headers";
import queryString from "query-string";
import PostList from "@/app/_components/PostList";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";
import { setCookiesOnReq } from "@/app/_utils/setCookiesOnReq";
import Pagination from "@/app/_ui/Pagination";
import { getAllPostsApi } from "@/app/_lib/postService";

async function Page({ searchParams }) {
  const queries = queryString.stringify(searchParams);
  const cookieStore = cookies();
  const options = setCookiesOnReq(cookieStore);
  const { posts, totalPages } = await getAllPostsApi(queries, options);

  const { q: searchValue } = searchParams;

  const resultsText = posts.length > 1 ? "نتایج" : "نتیجه";

  return (
    <>
      {searchValue ? (
        <p className="mb-4 text-secondary-700">
          {posts.length === 0
            ? "هیچ پستی با این مشخصات یافت نشد"
            : `نشان دادن ${toPersianDigits(posts.length)} ${resultsText} برای `}
          <span className="font-bold">&quot;{searchValue}&quot;</span>
        </p>
      ) : null}

      {posts.length > 0 ? <PostList posts={posts} /> : null}
      <div className="mt-5 flex w-full justify-center">
        <Pagination totalPages={totalPages} />
      </div>
    </>
  );
}

export default Page;
