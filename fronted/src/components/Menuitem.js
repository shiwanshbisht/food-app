import React, { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { IoSearch } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuList } from "./MenuList";

export const Menuitem = () => {
  const [foodItems, setFoodItems] = useState([]);
  const [search, setSearch] = useState("");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  useEffect(() => {
    axios
      .get(`${backendurl}/menuitem`)
      .then((response) => {
        setFoodItems(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedSearch(search);
    }, 1000);

    return () => {
      clearTimeout(handler);
    };
  }, [search]);

  const handleAddItem = (foodItem) => {
    dispatch(addItem(foodItem));
  };

  const handleCheckboxChange = (event) => {
    setShowVegOnly(event.target.checked);
  };

  const filteredItems = showVegOnly
    ? foodItems.filter((item) => item.veg)
    : foodItems;

  return (
    <>
      <div id="menuItem" className="container mx-auto py-8">
        <div className="flex flex-row items-center justify-between mb-4">
          <div className="flex items-center p-2  bg-white text-black rounded shadow border border-gray-300">
            <label
              htmlFor="showVegOnly"
              className="flex items-center cursor-pointer"
            >
              <span className="p-2 mr-2 text-black font-bold">Veg only</span>
              <div className="relative">
                <input
                  type="checkbox"
                  id="showVegOnly"
                  checked={showVegOnly}
                  onChange={handleCheckboxChange}
                  className="sr-only"
                />
                <div
                  className={`block w-10 h-6 rounded-full transition ${
                    showVegOnly ? "bg-green-200" : "bg-gray-300"
                  }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${
                    showVegOnly ? "translate-x-full bg-green-500" : "bg-black"
                  }`}
                ></div>
              </div>
            </label>
          </div>

          <div className="w-1/2 flex items-center  rounded  p-2 bg-white text-black rounded shadow border border-gray-300">
            <IoSearch className="text-gray-300 " size={20} />
            <input
              className="p-2 outline-none w-full"
              type="text"
              placeholder="Search for items..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
        </div>

        <div className="bg-white rounded">
          <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py-24 lg:max-w-7xl lg:px-8">
            <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 xl:gap-x-8">
              {Array.isArray(filteredItems) &&
                filteredItems
                  .filter((foodItem) => {
                    return debouncedSearch.toLocaleLowerCase() === ""
                      ? foodItem
                      : foodItem.name
                          .toLocaleLowerCase()
                          .includes(debouncedSearch.toLocaleLowerCase());
                  })
                  .map((foodItem) => (
                    <div
                      key={foodItem.id}
                      className="p-3"
                      style={{ borderBottom: "1px solid rgb(0 0 0 / 19%)" }}
                    >
                      <div className="flex justify-between mb-2">
                        {foodItem.bestsellers && (
                          <span className="inline-flex items-center rounded-md bg-yellow-500 px-2 py-1 text-sm font-medium text-black">
                            BestSellers
                          </span>
                        )}
                        {foodItem.veg && (
                          <div className="w-5 h-5">
                            <img
                              src="https://img.icons8.com/?size=64&id=119426&format=png"
                              alt="Veg Icon"
                              className="w-full h-full"
                            />
                          </div>
                        )}
                      </div>
                      <div className="flex items-center justify-between">
                        <div className="w-20 h-20 flex-shrink-0">
                          <img
                            src={foodItem.image}
                            className="w-full h-full object-cover rounded-[2.5rem]"
                          />
                        </div>

                        <div className="ml-4 flex-1">
                          <div className="w-100">
                            <span className="text-base font-bold leading-tight">
                              {foodItem.name}
                            </span>
                            <p className="title md-text16 md-f700 md-lh16">
                              ₹ {foodItem.price}
                            </p>
                          </div>
                        </div>
                        <div className=" flex items-center justify-between">
                          <button
                            className={`pl-6 pr-6 pt-2 pb-2 bg-white text-black rounded shadow border border-gray-300; ${
                              foodItem.quantity === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "hover:bg-blue-600 transition"
                            }`}
                            onClick={() => handleAddItem(foodItem)}
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>
        <ToastContainer />
      </div>
    </>
  );
};

export default Menuitem;
