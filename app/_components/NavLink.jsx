"use client"
import Link from "next/link"
import { usePathname } from "next/navigation"

function NavLink({path,children}) {
  const pathName=usePathname();
  return (
    <Link href={path} className={`${pathName===path?"text-primary-900":""}`}>
      {children}
    </Link>
  )
}

export default NavLink
