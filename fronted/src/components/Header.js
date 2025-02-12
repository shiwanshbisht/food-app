import React, { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import UserContext from "../utils/UserContext";
import Announcementbar from "./Announcementbar";

function Header() {
  const { user, setUser } = useContext(UserContext);
  const cartItem = useSelector((store) => store.cart.items);
  const [bgColor, setBgColor] = useState("transparent");
  const [textColor, setTextColor] = useState("black");
  const [toppadding, setToppadding] = useState("20px");
  // useEffect(() => {
  //   const handleScroll = () => {
  //     if (window.pageYOffset > 100) {
  //       setToppadding("0px");
  //     } else {
  //       setToppadding("10px");
  //     }
  //   };

  //   window.addEventListener("scroll", handleScroll);

  //   return () => {
  //     window.removeEventListener("scroll", handleScroll);
  //   };
  // }, []);

  useEffect(() => {
    const jwtCookie = Cookies.get("jwt");
    if (jwtCookie) {
      try {
        const decoded = jwtDecode(jwtCookie);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token specified:", error);
      }
    } else {
      console.warn("JWT cookie is not available.");
    }
  }, [setUser]);

  console.log("user", user);

  return (
    <>
      <header className="px-4 shadow bg-black">
        <div className="relative mx-auto flex max-w-screen-lg flex-col py-4 sm:flex-row sm:items-center sm:justify-between">
          <Link
            to="/"
            className="flex items-center text-xl font-semibold no-underline gap-3"
          >
            <span className="w-12 h-12 ">
              <img src="/Assets/Hero/logo.png" />
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
          </label>

          <nav
            aria-label="Header Navigation"
            className="hidden sm:block peer-checked:block pl-2 py-6 sm:py-0"
          >
            <div className="hidden lg:flex lg:items-center lg:space-x-6">
              <div className="lg:flex lg:space-x-4">
                {user ? (
                  <>
                    <Link
                      to="/myorder"
                      className="text-white font-bold no-underline px-2 py-2 rounded-full hover:bg-orange-600"
                    >
                      My Order
                    </Link>
                    <Link
                      to="/pics"
                      className="text-white font-bold no-underline px-2 py-2 rounded-full hover:bg-orange-600"
                    >
                      Upload
                    </Link>
                  </>
                ) : (
                  <>
                    <Link
                      to="/login"
                      className="text-lg font-bold text-black hover:text-gray-400"
                    >
                      Login
                    </Link>
                    <Link
                      to="/signup"
                      className="text-lg font-bold text-white hover:text-gray-400"
                    >
                      Signup
                    </Link>
                  </>
                )}
              </div>
              <Link to="/cart" className="relative flex items-center">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-8 w-8 text-white"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="1.5"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M2.25 3h1.386c.51 0 .955.343 1.087.835l.383 1.437M7.5 14.25a3 3 0 00-3 3h15.75m-12.75-3h11.218c1.121-2.3 2.1-4.684 2.924-7.138a60.114 60.114 0 00-16.536-1.84M7.5 14.25L5.106 5.272M6 20.25a.75.75 0 11-1.5 0 .75.75 0 011.5 0zm12.75 0a.75.75 0 11-1.5 0 .75.75 0 011.5 0z"
                  />
                </svg>
                <span className="absolute -right-2 -top-2 inline-flex items-center justify-center gap-1 rounded-full border-2 border-white bg-pink-500 px-1.5 text-sm text-white">
                  {cartItem.length}
                </span>
              </Link>
              <div className="ml-4">
                <img
                  src="https://res.cloudinary.com/dqwgwb6gd/image/upload/v1723286343/bsz5loqfvnv6qg9ewiqc.png"
                  alt="User Avatar"
                  className="w-10 h-10 rounded-full"
                />
              </div>
              {user && (
                <span className="text-white font-bold no-underline px-0 py-2 text-sm sm:text-base text-center">
                  Hey, {user.name}
                </span>
              )}
            </div>
          </nav>
        </div>
      </header>
    </>
  );
}

export default Header;
