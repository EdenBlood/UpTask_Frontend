import type { PropsWithChildren } from "react";
import { Link } from "react-router-dom";

interface INavButtonProps {
  path: string
}

export default function NavButton({children, path}: PropsWithChildren<INavButtonProps>) {
  return (
    <>
      <nav className="mt-5">
        <Link
          className="block w-max bg-purple-400 hover:bg-purple-600 px-6 py-2.5 text-white text-lg font-semibold cursor-pointer transition-tranform hover:scale-105 duration-300"
          to={path}
        >
          {children}
        </Link>
      </nav> 
    </>
  )
}
