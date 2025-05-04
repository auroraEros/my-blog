import { Suspense } from "react";
import { notFound } from "next/navigation";
import queryString from "query-string";

import Spinner from "@/app/_components/Spinner";
import Search from "@/app/_components/Search";
import Pagination from "@/app/_ui/Pagination";
import CreatePost from "@/app/_components/postsComponents/CreatePost";
import PostTable from "@/app/_components/postsComponents/PostTable";
import { getAllPostsApi } from "@/app/_lib/postService";

async function Page({ searchParams }) {
  try {
    const query = queryString.stringify(searchParams);

  const { totalPages } = await getAllPostsApi(query);

    return (
      <div>
        <div className="grid grid-cols-1 items-center lg:grid-cols-3 gap-8 mb-12 text-secondary-700">
          <h1 className="text-xl font-bold">لیست پست‌ها</h1>
          <Search />
          <CreatePost />
        </div>
        <div>
          <Suspense fallback={<Spinner />} key={query}>
            <PostTable query={query} />
          </Suspense>

          {totalPages > 1 && (
            <div className="flex justify-center mt-5 w-full">
              <Pagination totalPages={totalPages} />
            </div>
          )}
        </div>
      </div>
    );
  } catch (error) {
    console.error("خطا در دریافت پست‌ها:", {
      error: error.message,
      stack: error.stack,
      timestamp: new Date().toISOString(),
    });

    if (error instanceof TypeError) {
      return (
        <div className="text-center py-8 text-red-500">
          <p>خطا در ارتباط با سرور</p>
        </div>
      );
    }
    notFound();
  }
}

export default Page;
