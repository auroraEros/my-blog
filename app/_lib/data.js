import { cookies } from "next/headers";
import { getAllUsersApi } from "./authService";
import { setCookiesOnReq } from "../_utils/setCookiesOnReq";
import { getAllCommentsApi } from "./commentService";
import { getPosts } from "./postService";

export async function fetchCardsData() {
  const cookieStore = await cookies();
  const options = setCookiesOnReq(cookieStore);
  try {
    const data = await Promise.all([
      getAllUsersApi(options),
      getAllCommentsApi(options),
      getPosts(),
    ]);
    if (!data) throw new Error("خطا در بارگذاری اطلاعات");
    const posts = data[2]?.data?.posts || [];
    const numOfUsers = Number(data[0].users.length ?? "0");
    const numOfComments = Number(data[1].commentsCount ?? "0");
    const numOfPosts = Number(posts.length);
    return {
      numOfUsers,
      numOfComments,
      numOfPosts,
    };
  } catch (err) {
    console.log(err?.response?.data?.message);
  }
}
