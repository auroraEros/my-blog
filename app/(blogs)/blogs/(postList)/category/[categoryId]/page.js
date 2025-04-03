import { cookies } from "next/headers";
import { notFound } from "next/navigation";
import queryString from "query-string";
import PostList from "@/app/_components/PostList";
import { getPosts } from "@/app/_lib/postService";
import Pagination from "@/app/_ui/Pagination";
import { setCookiesOnReq } from "@/app/_utils/setCookiesOnReq";
import { getCategoriesApi } from "@/app/_lib/categoryService";
import { toPersianDigits } from "@/app/_utils/persianDigitsFormater";

export async function generateMetadata({ params }) {
  const { categoryId } = params;

  try {
    const response = await getCategoriesApi();
    const category = response?.categories?.find((c) => c._id === categoryId);

    return {
      title: category?.title || "دسته‌بندی یافت نشد",
      description: category?.description || "",
    };
  } catch (error) {
    return {
      title: "خطا در دریافت اطلاعات",
      description: "",
    };
  }
}

export async function generateStaticParams() {
  try {
    const response = await getPosts();
    if (!response?.data?.posts) return [];

    return response.data.posts
      .filter((post) => post?.category?._id)
      .map((post) => ({
        categoryId: post.category._id,
      }));
  } catch (error) {
    console.error("Error in generateStaticParams:", error);
    return [];
  }
}

async function Page({ params, searchParams }) {
  const { categoryId } = params;
  try {
    const cookieStore = cookies();
    const option = setCookiesOnReq(cookieStore);

    const queries = queryString.stringify({ ...searchParams, categoryId });
    const response = await getPosts(queries, option);

    if (!response || !response.data || !response.data.posts) {
      return notFound();
    }

    const { data } = response;
    const posts = data.posts;
    const totalPages = data.totalPages || 1;

    const search = searchParams?.search || "";
    const resultsText = posts.length > 1 ? "نتایج" : "نتیجه";

    return (
      <>
        {search ? (
          <p className="mb-4 text-secondary-700">
            {posts.length === 0
              ? "هیچ پستی با این مشخصات یافت نشد"
              : `نشان دادن ${toPersianDigits(posts.length)} ${resultsText} برای `}
            <span className="font-bold">&quot;{search}&quot;</span>
          </p>
        ) : null}

        {posts.length > 0 ? (
          <>
            <PostList posts={posts} />
            {totalPages > 1 && (
              <div className="mt-5 flex w-full justify-center">
                <Pagination totalPages={totalPages} />
              </div>
            )}
          </>
        ) : (
          <p className="mb-4 text-secondary-700">
            هیچ پستی برای این دسته‌بندی یافت نشد!
          </p>
        )}
      </>
    );
  } catch (error) {
    console.error("Error fetching posts:", error);
    notFound();
  }
}

export default Page;
