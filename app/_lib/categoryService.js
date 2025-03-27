import http from "./httpService";

export async function getCategoriesApi(options = {}) {
  return http.get("/category/list", options).then(({ data }) => data.data);
}

export async function deleteCategoryApi(id, options = {}) {
  return http
    .delete(`/category/remove/${id}`, options)
    .then(({ data }) => data.data);
}

export async function editCategoryApi({ data, id }) {
  return await http
    .patch(`/category/update/${id}`, data)
    .then(({ data }) => data.data);
}


export async function createCategoryApi(data) {
  return await http.post("/category/add", data).then(({ data }) => data.data);
}


export async function getCategoryById(id) {
  try {
    const { categories } = await getCategoriesApi();
    const category = categories.find((category) => category._id === id);
    return category;
  } catch (error) {
    console.error("خطا در یافتن دسته‌بندی:", error);
    return false;
  }
}

export async function checkSlugExists(slug) {
  try {
    const { categories } = await getCategoriesApi();
    const existedSlug = categories.find((category) => category.slug === slug);
    return existedSlug;
  } catch (error) {
    console.error("خطا در بررسی اسلاگ:", error);
    return false;
  }
}
