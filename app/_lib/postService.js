/////////////
// GET

import http from "./httpService";

export async function getCategories() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/category/list`
    );
    if (!res.ok) throw new Error("Couldn't get categories");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getPosts(queries, option) {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_BASE_URL}/post/list?${queries}`,
      option
    );
    if (!res.ok) throw new Error("Couldn't get posts");
    const data = await res.json();
    return data;
  } catch (err) {
    console.log(err.message);
  }
}

export async function getPostBySlug(slug) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/slug/${slug}`
  );

  const { data } = await res.json();
  const post = data?.post ?? {};

  return post;
}

export async function createPostApi(data) {
  return await http.post("/post/create", data).then(({ data }) => data.data);
}

export async function editPostApi({ data, id }) {
  return await http
    .patch(`/post/update/${id}`, data)
    .then(({ data }) => data.data);
}

export async function getPostById(id) {
  try {
    const response = await http
      .get(`/post/${id}`)
      .then(({ data }) => data.data);
    return response || null;
  } catch (error) {
    if (error.response?.status === 400 || error.response?.status === 404) {
      return null;
    }
    throw error;
  }
}

export async function getPostsByCategory(categoryId) {
  const res = await fetch(
    `${process.env.NEXT_PUBLIC_BASE_URL}/post/category/${categoryId}`
  );

  const { data } = await res.json();

  return data;
}

export async function deletePostApi(id) {
  return await http.delete(`/post/remove/${id}`).then(({ data }) => data.data);
}
export async function likePostApi(postId) {
  return await http.post(`/post/like/${postId}`).then(({ data }) => data.data);
}

export async function bookmarkPostApi(postId) {
  return await http
    .post(`/post/bookmark/${postId}`)
    .then(({ data }) => data.data);
}
