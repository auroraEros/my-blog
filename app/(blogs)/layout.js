import { Suspense } from "react";
import Loading from "../loading";
import Header from "@/app/_components/Header";

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
