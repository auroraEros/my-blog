"use client";
import { useAuth } from "../_context/AuthContext";
import DarkModeToggle from "../_ui/DarkModeToggle";
import NavLink from "./NavLink";

const navLinks = [
  { path: "/", children: "خانه", id: 1 },
  { path: "/blogs", children: "بلاگ‌ها", id: 2 },
];

function Header() {
  const { user, isLoading } = useAuth();
  const isLogin =user && Object.keys(user).length > 0 ? true : false;
  return (
    <header
      className={`z-10 shadow-md bg-inherit mb-10 sticky top-0
      transition-all duration-200 border-b border-b-secondary-300 
      ${isLoading ? "blur-sm opacity-70" : "opacity-100 blur-0"}
   `}
    >
      <nav className="container xl:max-w-screen-xl">
        <ul className="flex justify-between items-center text-secondary-400  py-2">
          <div className="flex justify-between gap-x-10 items-center">
            {navLinks.map((link) => (
              <li key={link.id}>
                <NavLink path={link.path}>{link.children}</NavLink>
              </li>
            ))}
            <li className=" flex justify-between  items-center">
              <DarkModeToggle />
            </li>
          </div>

          <li>
            {isLogin ? (
              <NavLink path="/profile">پروفایل</NavLink>
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
