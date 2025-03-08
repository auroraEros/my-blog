"use server";

import { getPosts } from "./data-service";

export async function searchPosts(formData) {
  const search = formData.get("search");
  if (!search || search.length < 3) return;

  const {
    data
  } = getPosts();
  console.log(data)
  const filteredPost = posts.filter((post) => post.title.includes(search));
  return filteredPost;
}
