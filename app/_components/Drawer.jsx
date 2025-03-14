"use client";

import { createPortal } from "react-dom";

function Drawer({ open, onClose, children }) {
  return createPortal(
    <>
      <div
        className={`backdrop-blur-sm fixed inset-0 w-full h-screen bg-secondary-800 bg-opacity-30 ${open ? "block" : "hidden pointer-events-none"}`}
      ></div>
      <div
        className={`fixed top-0 right-0 w-[250px] h-full transition-transform transform ${open ? "translate-x-0" : "translate-x-full"}`}
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        <div className="bg-secondary-0 max-h-full overflow-y-auto">
          {children}
        </div>
      </div>
    </>,
    document.body
  );
}

export default Drawer;
