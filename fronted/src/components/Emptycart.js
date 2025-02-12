import React from "react";
import { Link } from "react-router-dom";

const Emptycart = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-300 px-4">
      <div className="mb-5">
        <img
          src="/Assets/Cart/emptycart.png"
          alt="Empty Cart"
          className="w-48 h-48 object-contain"
        />
      </div>

      <div className="text-center">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">
          Your cart is empty
        </h2>
        <p className="text-lg text-gray-600">
          Looks like you haven't added anything to your cart yet.
        </p>
      </div>

      {/* Button Section */}
      <div className="mt-8">
        <Link
          to="/"
          className="bg-orange-500 text-white font-bold no-underline px-8 py-3 rounded-full hover:bg-orange-600 transition duration-300 ease-in-out transform hover:scale-105"
        >
          Browse Menu
        </Link>
      </div>
    </div>
  );
};

export default Emptycart;
