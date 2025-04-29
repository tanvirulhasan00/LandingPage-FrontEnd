import { Bars3Icon, XMarkIcon } from "@heroicons/react/24/outline";
import { useState, type MouseEventHandler } from "react";
import { Link } from "react-router";
import Button from "./button";

interface HeaderProps {
  token: any;
  handleLogout: React.MouseEventHandler;
  userRole: string;
}

const Header: React.FC<HeaderProps> = ({ token, handleLogout, userRole }) => {
  const [open, setOpen] = useState(true);
  return (
    <div className="w-full h-10 bg-gradient-to-br from-indigo-100 dark:from-black to-white dark:to-gray-800 border-b-1 border-b-gray-400 dark:border-b-cyan-50 p-8 sm:p-12">
      <div className="flex items-center justify-between h-full">
        <div className="">
          <Link to={"/dashboard"}>
            <h1>Dashboard</h1>
          </Link>
        </div>
        {/* menu items */}
        <div
          className={`hidden md:block ${
            !open
              ? "max-md:block max-md:bg-gray-200 max-md:text-gray-600 max-md:p-3  max-md:w-full max-md:text-center max-md:fixed max-md:top-[6rem] max-sm:top-[4rem] max-md:right-[0rem]"
              : ""
          }`}
        >
          <ul className="flex gap-4 max-md:flex-col">
            <li className="hover:underline">
              <Link to={"/dashboard"} onClick={() => setOpen(!open)}>
                Home
              </Link>
            </li>
            {userRole === "admin" ? (
              <li className="hover:underline">
                <Link to={"/dashboard/user"} onClick={() => setOpen(!open)}>
                  User
                </Link>
              </li>
            ) : null}

            <li className="hover:underline">
              <Link to={"/dashboard/product"} onClick={() => setOpen(!open)}>
                Products
              </Link>
            </li>
            <li className="hover:underline">
              <Link to={"/dashboard/order"} onClick={() => setOpen(!open)}>
                Order
              </Link>
            </li>
            <li>
              <Link to={"/dashboard/payment"} onClick={() => setOpen(!open)}>
                Payment
              </Link>
            </li>
            {token ? (
              <li>
                <Link to={"/login"} onClick={handleLogout}>
                  Logout
                </Link>
              </li>
            ) : (
              ""
            )}
          </ul>
        </div>
        {/* menu icon */}
        <div className="block md:hidden ">
          {open ? (
            <button onClick={() => setOpen(!open)} className="cursor-pointer">
              <Bars3Icon aria-hidden="true" className="size-8 " />
            </button>
          ) : (
            <button onClick={() => setOpen(!open)} className="cursor-pointer">
              <XMarkIcon aria-hidden="true" className="size-8" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default Header;
