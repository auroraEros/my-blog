/////////////
// GET

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

export async function getPosts() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/post/list`);
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

  const {data}  = await res.json();
  const post = data?.post ?? {};
  
  return post;
}
