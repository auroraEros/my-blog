import { Suspense } from "react";
import Loading from "../loading";
import Header from "@/app/_components/Header";

export const metadata = {
  title: "Blog",
  description: "Blogs",
};
function Layout({ children }) {
  return (
    <>
      <Header />
      <main className="container xl:max-w-screen-xl">
        <Suspense fallback={<Loading />}>{children}</Suspense>
      </main>
    </>
  );
}

export default Layout;
