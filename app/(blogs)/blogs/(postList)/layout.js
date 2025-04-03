
import CategoryList from "@/app/_components/CategoryList";
import Search from "@/app/_components/Search";
import SortPosts from "@/app/_components/SortPosts";

export const metadata = {
  title: { default: "بلاگ‌ها", template: "%s | بلاگ‌ها" },
};

async function Layout({ children }) {
  return (
    <div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 text-secondary-700 mb-12 items-center">
        <h1 className="text-lg font-bold">لیست بلاگ ها</h1>
        <Search />
        <SortPosts />
      </div>

      <div className="grid grid-cols-12 gap-8">
        <aside className="col-span-12 lg:col-span-4 xl:col-span-3 text-secondary-500 space-y-4">
          <CategoryList />
        </aside>
        <div className="col-span-12 lg:col-span-4 xl:col-span-9">
          {children}
        </div>
      </div>
    </div>
  );
}

export default Layout;
