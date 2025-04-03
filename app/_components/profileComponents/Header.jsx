"use client";
import Link from "next/link";
import { useState } from "react";
import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import Drawer from "@/app/_components/Drawer";
import { useAuth } from "@/app/_context/AuthContext";
import Avatar from "@/app/_ui/Avatar";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import DarkModeToggle from "@/app/_ui/DarkModeToggle";
import Sidebar from "./Sidebar";

function Header() {
  const { user, isLoading } = useAuth();
  const [isOpenDrawer, setIsOpenDrawer] = useState(false);
  return (
    <header
      className={`bg-secondary-0 ${isLoading ? "bg-opacity-30 blur-md" : ""}`}
    >
      <div className="flex items-center justify-between py-5 px-4 lg:px-8">
        <ButtonIcon
          className="block lg:hidden border-none"
          variant="outline"
          onClick={() => setIsOpenDrawer(!isOpenDrawer)}
        >
          {isOpenDrawer ? <XMarkIcon /> : <Bars3Icon />}
        </ButtonIcon>

        <span className="text-sm lg:text-lg font-bold text-secondary-700">
          سلام؛ {user?.name}
        </span>
        <div className=" flex justify-between gap-x-3 items-center">
          <DarkModeToggle />

          <Link href="/profile/user">
            <Avatar src={user?.avatarUrl} size={10} key={user?.avatarUrl} />
          </Link>
        </div>
        <Drawer open={isOpenDrawer} onClose={() => setIsOpenDrawer(false)}>
          <Sidebar onClose={() => setIsOpenDrawer(false)} />
        </Drawer>
      </div>
    </header>
  );
}

export default Header;
