import React from "react";

export const Footer = () => {
  return (
    <footer className="bg-black text-white dark:bg-gray-900 border-t border-gray-200 rounded dark:border-gray-700 w-full">
      <div className="mx-auto max-w-screen-xl p-4 py-4 lg:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
          <div>
            <span className="text-lg sm:text-2xl text-white dark:text-gray-400 sm:text-center">
              The Night Manager
            </span>
          </div>

          <div className="flex mt-4 sm:mt-0 sm:justify-center">
            <a
              href="#"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mx-2 w-8 h-8 sm:w-10 sm:h-10"
            >
              <img
                src="/Assets/Footer/facebook.png"
                alt="Facebook"
                className="w-full h-full"
              />
              <span className="sr-only">Facebook</span>
            </a>
            <a
              href="https://www.instagram.com/_the_nightmanager_"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mx-2 w-8 h-8 sm:w-10 sm:h-10"
            >
              <img
                src="/Assets/Footer/instagram.png"
                alt="Instagram"
                className="w-full h-full"
              />
              <span className="sr-only">Instagram</span>
            </a>
            <a
              href="https://wa.me/<9368036696>"
              className="text-gray-500 hover:text-indigo-600 dark:hover:text-indigo-400 mx-2 w-8 h-8 sm:w-10 sm:h-10"
            >
              <img
                src="/Assets/Footer/whatsapp.png"
                alt="Whatsapp"
                className="w-full h-full"
              />
              <span className="sr-only">Whatsapp</span>
            </a>
          </div>
        </div>
        <hr className="my-4" />
        <div className="text-sm sm:text-base text-center">
          <p>
            Made With ❤ by
            <a href="https://www.instagram.com/mannu_story07">
              <span
                style={{
                  fontFamily: "'Shadows Into Light', cursive",
                  fontWeight: 900,
                  fontStyle: "normal",
                  color: "white",
                }}
                className="text-lg mb-4 no-underline"
              >
                {" "}
                Manish Kumar{" "}
              </span>
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
