"use client";
import Link from "next/link";
import { useState } from "react";
import {
  ArrowLeftStartOnRectangleIcon,
  HomeIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";

import SideBarNavs from "./sidebarNavs";
import ButtonIcon from "@/app/_ui/ButtonIcon";
import Modal from "@/app/_ui/Modal";
import ConfirmLogout from "@/app/_components/logout/ConfirmLogout";

function Sidebar({ onClose }) {
  const [open, setOpen] = useState(false);

  return (
    <div className="overflow-y-auto flex flex-col p-5 h-screen pt-10 lg:pt-8">
      {/* Drawer header */}
      <div className="flex items-center justify-between w-full mb-5 pb-2 border-b border-b-secondary-200">
        <Link
          href="/"
          className="flex items-center gap-x-4 justify-center text-secondary-700 border-b  border-b-secondary-200 
        pb-2 mb-6"
        >
          <HomeIcon className="w-6 h-6" />
          <span> نکست بلاگ</span>
        </Link>

        <ButtonIcon
          onClick={onClose}
          className="block lg:hidden border-none"
          variant="outline"
        >
          <XMarkIcon />
        </ButtonIcon>
      </div>

      {/* Drawer content */}
      <div className="overflow-y-auto flex-auto">
        <SideBarNavs />
        <div
          onClick={() => setOpen(true)}
          className="flex items-center gap-x-2 rounded-2xl font-medium transition-all duration-200 text-secondary-700 py-3 px-4 hover:text-red-400 cursor-pointer"
        >
          <ArrowLeftStartOnRectangleIcon className="ml-4 h-5 w-5" />
          <span>خروج</span>
        </div>
      </div>
      <Modal title="خروج از حساب" open={open} onClose={() => setOpen(false)}>
        <ConfirmLogout onClose={() => setOpen(false)} />
      </Modal>
    </div>
  );
}

export default Sidebar;
