import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const [showPopup, setShowPopup] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [user, setUser] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", // Default role
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      const url = backendurl ? `${backendurl}/signup` : "http://localhost:4000/signup";
      await axios.post(
        url,
        {
          name: user.name,
          email: user.email,
          password: user.password,
          role: user.role,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setShowPopup(true);
    } catch (error) {
      console.error("Error registering user:", error);
      if (error.response && error.response.data && error.response.data.errors) {
        setErrorMessage(error.response.data.errors.map(err => err.msg).join(", "));
      } else if (error.response && error.response.data && error.response.data.message) {
        setErrorMessage(error.response.data.message);
      } else {
        setErrorMessage("An error occurred during signup.");
      }
    }
  };

  return (
    <>
      <Header />

      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="max-w-lg w-full bg-white dark:bg-gray-800 p-8 rounded-lg shadow-lg">
          <h1 className="text-2xl font-bold leading-tight text-gray-900 dark:text-white mb-6">
            Create an Account
          </h1>
          {errorMessage && (
            <div className="mb-4 text-sm text-red-600 bg-red-100 border border-red-400 rounded-lg p-3 dark:bg-red-900 dark:text-red-200 dark:border-red-800">
              {errorMessage}
            </div>
          )}
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="name"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="Name"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="name@company.com"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="••••••••"
                required
                onChange={handleChange}
              />
            </div>

            {/* Role Selection */}
            <div className="flex items-center space-x-6">
              <span className="text-sm font-medium text-gray-900 dark:text-white">Account Type:</span>
              <div className="flex items-center">
                <input
                  id="role-user"
                  type="radio"
                  name="role"
                  value="customer"
                  checked={user.role === "customer"}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="role-user" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  User
                </label>
              </div>
              <div className="flex items-center">
                <input
                  id="role-admin"
                  type="radio"
                  name="role"
                  value="admin"
                  checked={user.role === "admin"}
                  onChange={handleChange}
                  className="w-4 h-4 text-primary-600 bg-gray-100 border-gray-300 focus:ring-primary-500 dark:focus:ring-primary-600 dark:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                />
                <label htmlFor="role-admin" className="ml-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                  Admin
                </label>
              </div>
            </div>
            <div className="flex items-start mb-6">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                required
              />
              <label
                htmlFor="terms"
                className="ml-3 text-sm font-light text-gray-500 dark:text-gray-300"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            <button
              type="submit"
              className="w-full text-white bg-black hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Create an Account
            </button>
            <p className="text-sm font-light text-gray-500 dark:text-gray-400">
              Already have an account?{" "}
              <Link
                to="/login"
                className="font-medium text-primary-600 hover:underline dark:text-primary-500"
              >
                Log In
              </Link>
            </p>
          </form>
        </div>
      </div>

      {showPopup && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 px-4">
          <div className="bg-white dark:bg-gray-800 p-8 rounded-lg shadow-xl max-w-sm w-full text-center">
            <div className="w-16 h-16 bg-green-100 dark:bg-green-900 rounded-full flex items-center justify-center mx-auto mb-4">
              <svg className="w-8 h-8 text-green-500 dark:text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">Success!</h2>
            <p className="text-gray-600 dark:text-gray-400 mb-6">Your account has been created successfully.</p>
            <button
              onClick={() => navigate("/login")}
              className="w-full text-white bg-black hover:bg-gray-800 focus:ring-4 focus:outline-none focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-3 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
            >
              Go to Login
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Signup;
