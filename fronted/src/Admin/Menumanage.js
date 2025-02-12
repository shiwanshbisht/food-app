import { useState } from "react";
import React from "react";
import Header from "./Header";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export const Menumanage = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setMenu((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const [menu, setMenu] = useState({
    image: file,
    name: "",
    price: "",
    description: "",
    veg: "",
    bestsellers: false,
  });

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     await axios.post("http://localhost:4000/menuitem", menu, {
  //       headers: {
  //         "Content-Type": "application/json",
  //       },
  //     });
  //     console.log("Menu item added", menu);
  //     navigate("/");
  //   } catch (error) {
  //     console.error("Error adding menu item:", error);
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    try {
      const response = await axios.post(`${backendurl}/menuitem`, menu, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log("menu updated", menu);
      if (response) {
        navigate("/");
      }
    } catch (error) {
      setMessage("Error uploading image");
      console.error("Error uploading image:", error);
    }
  };

  return (
    <>
      <Header />
      <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-800 mb-6">New Menu Item</h1>
        <form className="space-y-6" onSubmit={handleSubmit}>
          <div>
            <label
              htmlFor="file-upload"
              className="block text-sm font-medium text-gray-700"
            >
              Image
            </label>
            <div className="mt-1 flex items-center">
              <label
                htmlFor="file-upload"
                className="cursor-pointer bg-white rounded-md font-medium text-indigo-600 hover:text-indigo-500"
              >
                <span>Upload a file</span>
                <input
                  id="file-upload"
                  name="file-upload"
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name
            </label>
            <input
              type="text"
              name="name"
              id="name"
              className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Name"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="price"
              className="block text-sm font-medium text-gray-700"
            >
              Price
            </label>
            <input
              type="number"
              name="price"
              id="price"
              className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Price"
              required
              onChange={handleChange}
            />
          </div>
          <div>
            <label
              htmlFor="description"
              className="block text-sm font-medium text-gray-700"
            >
              Description
            </label>
            <textarea
              name="description"
              id="description"
              className="block w-full mt-1 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none focus:ring-primary-500 focus:border-primary-500"
              placeholder="Description"
              rows="3"
              required
              onChange={handleChange}
            />
          </div>
          <div className="flex items-center space-x-4">
            <span className="text-sm font-medium text-gray-700">Type:</span>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <input
                  id="veg"
                  type="radio"
                  name="veg"
                  value="veg"
                  checked={menu.veg === "veg"}
                  onChange={handleChange}
                  className="w-4 h-4 text-green-600 bg-gray-100 border-gray-300 focus:ring-green-500"
                />
                <label
                  htmlFor="veg"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Veg
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="nonveg"
                  type="radio"
                  name="veg"
                  value="nonveg"
                  checked={menu.veg === "nonveg"}
                  onChange={handleChange}
                  className="w-4 h-4 text-red-600 bg-gray-100 border-gray-300 focus:ring-red-500"
                />
                <label
                  htmlFor="nonveg"
                  className="ml-2 text-sm font-medium text-gray-700"
                >
                  Non-Veg
                </label>
              </div>
            </div>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              name="bestsellers"
              id="bestsellers"
              checked={menu.bestsellers}
              onChange={handleChange}
              className="w-4 h-4 text-yellow-600 bg-gray-100 border-gray-300 rounded focus:ring-yellow-500"
            />
            <label
              htmlFor="bestsellers"
              className="ml-2 text-sm font-medium text-gray-700"
            >
              Best Sellers
            </label>
          </div>
          <button
            type="submit"
            className="w-full py-2 px-4 text-white bg-black hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 rounded-lg text-sm font-medium"
          >
            Add Item
          </button>
        </form>
      </div>
    </>
  );
};
