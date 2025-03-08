"use client";
import NavLink from "./NavLink";

const navLinks = [
  { path: "/", children: "خانه", id: 1 },
  { path: "/blogs", children: "بلاگ‌ها", id: 2 },
];

function Header() {
  // const {isLoading,uder}=useAuth()
  const user = false;
  return (
    <header className="z-10 shadow-md bg-inherit mb-10 sticky top-0 border-b border-b-secondary-300 ">
      <nav className="container xl:max-w-screen-xl">
        <ul className="flex justify-between items-center text-secondary-400  py-2">
          <div className="flex justify-between gap-x-10 ">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink path={link.path}>{link.children}</NavLink>
              </li>
            ))}
          </div>
          <li>
            {user ? (
              <NavLink path="/profile">"پروفایل"</NavLink>
            ) : (
              <NavLink path="/signin">ورود</NavLink>
            )}
          </li>
        </ul>
      </nav>
    </header>
  );
}

export default Header;
