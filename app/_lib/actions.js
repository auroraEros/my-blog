"use server";

import { cookies } from "next/headers";
import { createCommentApi } from "./commentService";
import { setCookiesOnReq } from "../_utils/setCookiesOnReq";
import toast from "react-hot-toast";
import { revalidatePath } from "next/cache";

export async function createComment(prevState, { formData, postId, parentId }) {
  const cookiesStore = cookies();
  const options = setCookiesOnReq(cookiesStore);
  const rawData = {
    parentId,
    postId,
    text: formData.get("text"),
  };

  try {
    const { message } = await createCommentApi(rawData, options);
    revalidatePath("/blogs/[slug]");
    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;
    return {
      error,
    };
  }
}
