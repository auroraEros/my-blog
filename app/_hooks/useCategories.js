import { useQuery } from "@tanstack/react-query";
import { getCategoriesApi } from "../_lib/categoryService";

export function useCategories() {
  const { data, isPending } = useQuery({
    queryKey: ["categories"],
    queryFn: getCategoriesApi,
  });
  const { categories: rawCategories = [] } = data || {};
  const categories = rawCategories.map((cat) => ({
    label: cat.title,
    value: cat._id,
  }));
  const transformedCategories = rawCategories.map((cat) => ({
    label: cat.title,
    value: cat.englishTitle,
  }));

  return { isPending, categories, transformedCategories };
}
