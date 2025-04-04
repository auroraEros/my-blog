"use server";

import { cookies } from "next/headers";
import {
  createCommentApi,
  deleteCommentApi,
  UpdateCommentApi,
} from "./commentService";
import { setCookiesOnReq } from "../_utils/setCookiesOnReq";
import { revalidatePath } from "next/cache";
import { getUserApi } from "./authService";

export async function createComment(prevState, { formData, postId, parentId }) {
  const cookiesStore = cookies();
  const options = setCookiesOnReq(cookiesStore);

  const rawFormData = {
    postId,
    parentId,
    text: formData.get("text"),
  };

  try {
    const { message } = await createCommentApi(rawFormData, options);
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

export async function updateComment(prevState, { commentId, formData }) {
  const cookieStore =  cookies();

  const data = {
    status: formData.get("status"),
  };

  try {
    const options = setCookiesOnReq(cookieStore);
    const { message } = await UpdateCommentApi(
      { id: commentId, data },
      options
    );

    revalidatePath("/profile/comments");

    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;
    console.log({ error });

    return {
      error,
    };
  }
}

export async function deleteComment(prevState, { commentId }) {
  const cookieStore =  cookies();

  try {
    const options = setCookiesOnReq(cookieStore);
    const { message } = await deleteCommentApi(commentId, options);

    revalidatePath("/profile/comments");

    return {
      message,
    };
  } catch (err) {
    const error = err?.response?.data?.message;
    console.log({ error });

    return {
      error,
    };
  }
}


