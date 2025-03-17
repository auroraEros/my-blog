"use server";

import { cookies } from "next/headers";
import { createCommentApi } from "./commentService";
import { setCookiesOnReq } from "../_utils/setCookiesOnReq";
import { revalidatePath } from "next/cache";



export async function createComment(prevState, { formData, postId, parentId }) {
  const cookieStore = await cookies();
  const rawFormData = {
    parentId,
    postId,
    text: formData.get("text"),
  };
  try {
    const options = setCookiesOnReq(cookieStore);
    const {
      data: { message },
    } = await createCommentApi(rawFormData, options);
    revalidatePath("/blogs");
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


