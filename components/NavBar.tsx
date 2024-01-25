import Link from "next/link"

import { navLinks } from "@/config/navLinks"

const NavBar = () => {
  return (
    <div className="flex gap-8 text-xl  ">
      {navLinks.map((element, index) => (
        <div className=" capitalize">
          {element.name == "overview" ? (
            <Link key={index} href="/">
              {element.name}
            </Link>
          ) : (
            <Link key={index} href={`/${element.name}`}>
              {element.name}
            </Link>
          )}
        </div>
      ))}
    </div>
  )
}

export default NavBar
