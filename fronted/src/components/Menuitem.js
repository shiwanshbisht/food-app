import React, { useState, useEffect } from "react";
import Cookies from "js-cookie";
import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { addItem } from "../utils/cartSlice";
import { IoSearch } from "react-icons/io5";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { MenuList } from "./MenuList";
import menuItemAction from "../utils/menuItems/menuItemAction";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";

export const Menuitem = () => {
  const [search, setSearch] = useState("");
  const [showVegOnly, setShowVegOnly] = useState(false);
  const [debouncedSearch, setDebouncedSearch] = useState(search);
  const { user } = React.useContext(UserContext);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartItems = useSelector((store) => store.cart.items);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  // Edit modal state
  const [editModal, setEditModal] = useState(false);
  const [editItem, setEditItem] = useState(null);
  const [editFile, setEditFile] = useState(null);
  const [editPreview, setEditPreview] = useState(null);
  const [saving, setSaving] = useState(false);

  const [currentPage, setCurrentPage] = useState(1);
  const { data: foodItems = [], totalPages = 1 } = useSelector((store) => store.menuItems);

  useEffect(() => {
    dispatch(menuItemAction(currentPage, 15));
  }, [dispatch, currentPage]);

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

  // --- Edit Modal Handlers ---
  const openEditModal = (foodItem) => {
    setEditItem({
      _id: foodItem._id,
      name: foodItem.name,
      price: foodItem.price,
      description: foodItem.description,
      veg: foodItem.veg ? "veg" : "nonveg",
      bestsellers: foodItem.bestsellers || false,
      Avlqunatity: foodItem.Avlqunatity ?? foodItem.qunatity ?? "",
    });
    setEditFile(null);
    setEditPreview(foodItem.image);
    setEditModal(true);
  };

  const closeEditModal = () => {
    setEditModal(false);
    setEditItem(null);
    setEditFile(null);
    setEditPreview(null);
  };

  const handleEditFieldChange = (e) => {
    const { name, value, type, checked } = e.target;
    setEditItem((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleEditFileChange = (e) => {
    const f = e.target.files[0];
    if (f) {
      setEditFile(f);
      setEditPreview(URL.createObjectURL(f));
    }
  };

  const handleDelete = (id) => {
    const token = Cookies.get("jwt");
    axios.delete(`${backendurl}/menuitem/${id}/delete`, {
      headers: { "auth-token": token },
    })
      .then((res) => {
        toast.success("Item deleted successfully!");
        dispatch(menuItemAction(currentPage, 15));
        closeEditModal();
      })
      .catch((err) => {
        toast.error("Failed to delete item.");
      });
  };


  const handleEditSubmit = async (e) => {
    e.preventDefault();
    setSaving(true);
    try {
      const formData = new FormData();
      if (editFile) {
        formData.append("files", editFile);
      }
      formData.append("name", editItem.name);
      formData.append("price", editItem.price);
      formData.append("description", editItem.description);
      formData.append("veg", editItem.veg === "veg" ? true : false);
      formData.append("bestsellers", editItem.bestsellers);
      formData.append("Avlqunatity", editItem.Avlqunatity);

      const token = Cookies.get("jwt");
      await axios.put(
        `${backendurl}/menuitem/${editItem._id}/edit`,
        formData,
        { headers: { "auth-token": token } }
      );

      toast.success("Item updated successfully!");
      dispatch(menuItemAction(currentPage, 15));
      closeEditModal();
    } catch (error) {
      console.error("Error updating item:", error);
      toast.error("Failed to update item.");
    } finally {
      setSaving(false);
    }
  };

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
                  className={`block w-10 h-6 rounded-full transition ${showVegOnly ? "bg-green-200" : "bg-gray-300"
                    }`}
                ></div>
                <div
                  className={`dot absolute left-1 top-1 w-4 h-4 rounded-full transition transform ${showVegOnly ? "translate-x-full bg-green-500" : "bg-black"
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
                      key={foodItem._id}
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
                          <div className="w-5 h-5 ml-auto">
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
                            alt={foodItem.name}
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
                            {foodItem.Avlqunatity !== undefined && (
                              <p className="text-sm font-medium text-gray-500 mt-1">
                                Available: {foodItem.Avlqunatity}
                              </p>
                            )}
                          </div>
                        </div>
                        <div className=" flex items-center justify-between">
                          {user?.role === "admin" ? (
                            <button
                              className="pl-6 pr-6 pt-2 pb-2 bg-white text-black rounded shadow border border-gray-300 hover:bg-orange-600 hover:text-white transition"
                              onClick={() => openEditModal(foodItem)}
                            >
                              Edit
                            </button>
                          ) : (
                            <button
                              className={`pl-6 pr-6 pt-2 pb-2 bg-white text-black rounded shadow border border-gray-300; ${foodItem.quantity === 0
                                ? "bg-gray-400 cursor-not-allowed"
                                : "hover:bg-blue-600 transition"
                                }`}
                              onClick={() => handleAddItem(foodItem)}
                            >
                              Add
                            </button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
            </div>
          </div>
        </div>

        {/* Pagination Controls */}
        <div className="flex items-center justify-center space-x-4 mt-8 mb-4">
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.max(prev - 1, 1));
              document.getElementById("menuItem")?.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === 1}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            &larr; Prev
          </button>
          <span className="text-sm font-medium text-gray-700">
            Page {currentPage} of {totalPages === 0 ? 1 : totalPages}
          </span>
          <button
            onClick={() => {
              setCurrentPage((prev) => Math.min(prev + 1, totalPages));
              document.getElementById("menuItem")?.scrollIntoView({ behavior: "smooth" });
            }}
            disabled={currentPage === totalPages || totalPages === 0}
            className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-orange-500 disabled:opacity-50 disabled:cursor-not-allowed transition"
          >
            Next &rarr;
          </button>
        </div>

        <ToastContainer />
      </div>
      {editModal && editItem && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center"
          style={{ backgroundColor: "rgba(0,0,0,0.55)" }}
          onClick={(e) => {
            if (e.target === e.currentTarget) closeEditModal();
          }}
        >
          <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg mx-4 p-6 relative max-h-[90vh] overflow-y-auto">
            {/* Close button */}
            <button
              onClick={closeEditModal}
              className="absolute top-4 right-4 text-gray-100 hover:text-gray-700 text-2xl font-bold leading-none"
              aria-label="Close"
            >
              &times;
            </button>

            <div className="bg-orange-600 rounded-t-2xl -mx-6 -mt-6 px-4 py-3 mb-6">
              <h2 className="text-center text-2xl font-bold text-white">
                Edit
              </h2>
            </div>

            <form onSubmit={handleEditSubmit} className="space-y-5">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Image
                </label>
                <div className="flex flex-row items-center gap-4">
                  {editPreview && (
                    <img
                      src={editPreview}
                      alt="Preview"
                      className="w-24 h-24 object-cover rounded-xl border border-gray-200"
                    />
                  )}
                  <div className="flex flex-col gap-1">
                    <label
                      htmlFor="edit-file-upload"
                      className="cursor-pointer inline-block bg-gray-100 hover:bg-gray-200 text-gray-700 text-sm font-medium px-4 py-2 rounded-lg border border-gray-300 transition"
                    >
                      {editFile ? "Change Image" : "Upload New Image"}
                      <input
                        id="edit-file-upload"
                        type="file"
                        accept="image/*"
                        className="hidden"
                        onChange={handleEditFileChange}
                      />
                    </label>
                    {editFile && (
                      <span className="text-xs text-gray-500">
                        {editFile.name}
                      </span>
                    )}
                  </div>
                </div>
              </div>

              {/* Name */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={editItem.name}
                  onChange={handleEditFieldChange}
                  required
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Item name"
                />
              </div>

              {/* Price */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Price (₹)
                </label>
                <input
                  type="number"
                  name="price"
                  value={editItem.price}
                  onChange={handleEditFieldChange}
                  required
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Price"
                />
              </div>

              {/* Description */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  name="description"
                  value={editItem.description}
                  onChange={handleEditFieldChange}
                  rows="3"
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Description"
                />
              </div>

              {/* Veg / Non-Veg */}
              <div>
                <span className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </span>
                <div className="flex items-center space-x-6">
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="veg"
                      value="veg"
                      checked={editItem.veg === "veg"}
                      onChange={handleEditFieldChange}
                      className="w-4 h-4 text-green-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Veg</span>
                  </label>
                  <label className="flex items-center cursor-pointer">
                    <input
                      type="radio"
                      name="veg"
                      value="nonveg"
                      checked={editItem.veg === "nonveg"}
                      onChange={handleEditFieldChange}
                      className="w-4 h-4 text-red-600"
                    />
                    <span className="ml-2 text-sm text-gray-700">Non-Veg</span>
                  </label>
                </div>
              </div>

              {/* Bestsellers */}
              <div className="flex items-center">
                <input
                  type="checkbox"
                  name="bestsellers"
                  id="edit-bestsellers"
                  checked={editItem.bestsellers}
                  onChange={handleEditFieldChange}
                  className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded"
                />
                <label
                  htmlFor="edit-bestsellers"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Best Seller
                </label>
              </div>

              {/* Available Quantity */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Available Quantity
                </label>
                <input
                  type="number"
                  name="Avlqunatity"
                  value={editItem.Avlqunatity}
                  onChange={handleEditFieldChange}
                  className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-orange-400"
                  placeholder="Available quantity"
                  min="0"
                />
              </div>

              {/* Buttons */}
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={() => handleDelete(editItem._id)}
                  className="w-full py-2 px-4 bg-red-500 hover:bg-red-600 text-white rounded-lg text-sm font-medium transition"
                >
                  Delete
                </button>
              </div>
              <div className="flex gap-3 pt-2">
                <button
                  type="button"
                  onClick={closeEditModal}
                  className="flex-1 py-2 px-4 border border-gray-300 rounded-lg text-gray-700 text-sm font-medium hover:bg-gray-100 transition"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={saving}
                  className="flex-1 py-2 px-4 bg-orange-500 hover:bg-orange-600 text-white rounded-lg text-sm font-medium transition disabled:opacity-60"
                >
                  {saving ? "Saving..." : "Save Changes"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
};

export default Menuitem;
