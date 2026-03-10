import React from "react";
import { Link } from "react-router-dom";

function Header() {
  return (
    <>
      <header className="px-4 shadow bg-black z-50">
        <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center text-xl font-semibold no-underline gap-3"
          >
            <span className="w-12 h-12 ">
              <img src="/Assets/Hero/logo.png" alt="Logo" />
            </span>
            <span
              style={{
                fontFamily: "'Shadows Into Light', cursive",
                fontWeight: 900,
                fontStyle: "normal",
                color: "white",
              }}
            >
              The Night Manager{" "}
            </span>
          </Link>

          <label
            className="absolute right-0 mt-1 cursor-pointer text-xl sm:hidden"
            htmlFor="navbar-open"
          >
            <span className="sr-only">Toggle Navigation</span>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-menu"><line x1="4" x2="20" y1="12" y2="12" /><line x1="4" x2="20" y1="6" y2="6" /><line x1="4" x2="20" y1="18" y2="18" /></svg>
          </label>

          <input type="checkbox" className="peer hidden" id="navbar-open" />

          <nav
            aria-label="Header Navigation"
            className="hidden sm:block peer-checked:block pl-2 py-6 sm:py-0"
          >
            <div className="flex flex-col sm:flex-row items-center space-y-4 sm:space-y-0 sm:space-x-6">
              <Link
                to="/menu"
                className="text-white font-bold no-underline px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Menu
              </Link>
              <Link
                to="/addmenu"
                className="text-white font-bold no-underline px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Add Item
              </Link>
              <Link
                to="/order"
                className="text-white font-bold no-underline px-4 py-2 rounded-full hover:bg-orange-600 transition-colors"
              >
                Order
              </Link>
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
