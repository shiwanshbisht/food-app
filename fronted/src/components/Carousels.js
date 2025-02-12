import React from "react";
import Carousel from "react-bootstrap/Carousel";
import TextRotator from "./TextRotator";
import Type from "./Type";

export const Carousels = () => {
  return (
    <>
      <div
        className=""
        style={{
          backgroundImage: "url('/Assets/Hero/background.jpg')",
        }}
      >
        <div className="mx-auto h-full px-4 py-28 md:py-40 sm:max-w-xl md:max-w-full md:px-24 lg:max-w-screen-xl lg:px-8">
          <div className="flex flex-col items-center justify-between lg:flex-row">
            <div className="">
              <div className="lg:max-w-xl lg:pr-5">
                <p className="flex text-sm uppercase text-gray-300">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="mr-1 inline h-5 w-5"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fill-rule="evenodd"
                      d="M5 2a1 1 0 011 1v1h1a1 1 0 010 2H6v1a1 1 0 01-2 0V6H3a1 1 0 010-2h1V3a1 1 0 011-1zm0 10a1 1 0 011 1v1h1a1 1 0 110 2H6v1a1 1 0 11-2 0v-1H3a1 1 0 110-2h1v-1a1 1 0 011-1zM12 2a1 1 0 01.967.744L14.146 7.2 17.5 9.134a1 1 0 010 1.732l-3.354 1.935-1.18 4.455a1 1 0 01-1.933 0L9.854 12.8 6.5 10.866a1 1 0 010-1.732l3.354-1.935 1.18-4.455A1 1 0 0112 2z"
                      clip-rule="evenodd"
                    />
                  </svg>
                  FAST FOOD BURGERS
                </p>
                <h2 className="mb-6 max-w-lg text-5xl font-bold leading-snug tracking-tight text-white sm:text-7xl sm:leading-snug">
                  We make you look &nbsp;
                  <span className="my-1 inline-block border-b-8 border-white bg-orange-500 px-4 font-bold text-white">
                    <Type />
                  </span>
                </h2>
              </div>
              <div className="mt-10 flex flex-col items-center md:flex-row">
                <a
                  href="#menuItem"
                  className="mb-3 inline-flex h-12 w-full items-center justify-center rounded bg-red-400 px-6 font-medium tracking-wide text-white shadow-md transition md:mr-4 md:mb-0 md:w-auto focus:outline-none hover:bg-blue-800"
                >
                  Order Now
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};
