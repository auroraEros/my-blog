import { Suspense } from "react";
import PostTable from "./_/components/PostTable";
import Spinner from "@/app/_components/Spinner";
import Search from "@/app/_components/Search";
import CreatePost from "./_/CreatePost";
import queryString from "query-string";
import Pagination from "@/app/_ui/Pagination";
import { getPosts } from "@/app/_lib/postService";

async function Page({ searchParams }) {
  const query = queryString.stringify(searchParams);
  const {
    data:{totalPages}
  } = await getPosts(query);
  console.log(totalPages);

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
        <div className="flex justify-center mt-5 w-full">
          <Pagination totalPages={totalPages} />
        </div>
      </div>
    </div>
  );
}

export default Page;
