import Header from "@/app/_components/Header";

function Layout({children}) {
  return (
    <>
      <Header />
      <main className="container xl:max-w-screen-xl">{children}</main>
    </>
  );
}

export default Layout;
