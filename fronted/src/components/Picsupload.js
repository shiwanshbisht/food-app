import React, { useState } from "react";
import axios from "axios";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import BottomNavBar from "./BottamNavbar";
import Footer from "./Footer";

const Picsupload = () => {
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  const [preview, setPreview] = useState(null);
  const [message, setMessage] = useState("");
  const [insta, setInsta] = useState("");
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  const handleInstaChange = (e) => {
    setInsta(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setPreview(URL.createObjectURL(e.target.files[0]));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file) {
      setMessage("Please select a file first");
      return;
    }

    const formData = new FormData();
    formData.append("files", file);

    const data = {
      formData,
      insta,
    };
    try {
      const response = await axios.post(`${backendurl}/pics`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      setMessage("Image uploaded successfully!");
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
      <div className="container mx-auto my-8 px-4 pt-24">
        <form onSubmit={handleSubmit} className="flex flex-col items-center">
          <input
            id="file-upload"
            name="file-upload"
            type="file"
            className="hidden"
            onChange={handleFileChange}
          />
          <label
            htmlFor="file-upload"
            className="flex flex-col items-center gap-4 p-6 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer hover:border-gray-400 transition"
          >
            <div className="flex items-center justify-center w-12 h-12 bg-gray-100 rounded-full">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                aria-label="File input icon"
                role="img"
                viewBox="0 0 24 24"
                className="w-6 h-6 text-gray-500"
              >
                <path
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M12 16.5V9.75m0 0 3 3m-3-3-3 3M6.75 19.5a4.5 4.5 0 0 1-1.41-8.775 5.25 5.25 0 0 1 10.233-2.33 3 3 0 0 1 3.758 3.848A3.752 3.752 0 0 1 18 19.5H6.75Z"
                />
              </svg>
            </div>
            <span className="text-gray-500">
              Drag & drop or{" "}
              <span className="text-emerald-500 font-semibold">
                upload a file
              </span>
            </span>
          </label>

          <div className="mb-6">
            <label htmlFor="table" className="block py-2 text-gray-700">
              Do you want to share your insta handle ?*
            </label>
            <div className="flex items-center text-gray-700 border border-gray-300 rounded-md">
              <div className="px-3 py-2.5 bg-gray-50 border-r border-gray-300">
                Hey
              </div>
              <input
                type="text"
                placeholder="@Your insta handle"
                id="table"
                className="w-full p-2.5 bg-white outline-none"
                onChange={handleInstaChange}
                required="true"
              />
            </div>
          </div>
          {preview && (
            <img
              src={preview}
              alt="Preview"
              className="mt-6 w-40 h-40 object-cover rounded-lg shadow-lg"
            />
          )}
          <button
            type="submit"
            className="mt-6 px-8 py-2 bg-black text-white font-bold rounded-full hover:bg-emerald-600 transition"
          >
            Upload
          </button>
          {message && (
            <p
              className={`mt-4 text-lg font-semibold ${
                message.includes("successfully")
                  ? "text-emerald-500"
                  : "text-red-500"
              }`}
            >
              {message}
            </p>
          )}
        </form>
      </div>
      <div className="mt-20 sm:hidden">
        <BottomNavBar />
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </>
  );
};

export default Picsupload;
