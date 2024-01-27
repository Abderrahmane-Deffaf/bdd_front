"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"

import { navLinks } from "@/config/navLinks"

const NavBar = () => {
  const pathname = usePathname()
  console.log(pathname)

  return (
    <div className="flex gap-8 text-xl  ">
      {navLinks.map((element, index) => (
        <div key={index} className=" capitalize text-gray-400">
          {element.name == "overview" ? (
            <Link
              className={`${pathname == "/" && "text-white"}`}
              key={index}
              href="/"
            >
              {element.name}
            </Link>
          ) : (
            <Link
              className={`${pathname == `/${element.name}` && "text-white "}`}
              key={index}
              href={`/${element.name}`}
            >
              {element.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default NavBar
