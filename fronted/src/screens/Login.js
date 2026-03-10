import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  let navigate = useNavigate();
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [error, setError] = useState(null);
  const [user, setUser] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setUser((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous errors
    try {
      const response = await axios.post(
        `${backendurl}/login`,
        {
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      const result = response.data;

      if (result.success) {
        setIsLoggingIn(true);
        const token = result.token;
        Cookies.set("jwt", token);

        setTimeout(() => {
          const decoded = jwtDecode(token);
          console.log("Decoded token:", decoded);

          if (decoded.role === "admin") {
            navigate("/order");
          } else {
            navigate("/");
          }
        }, 800);
      }
    } catch (err) {
      console.error("Error logging in:", err);
      if (err.response && err.response.data) {
        if (err.response.data.error) {
          setError(err.response.data.error); // "Incorrect password", "Email is not valid"
        } else if (err.response.data.errors) {
          setError(err.response.data.errors[0].msg); // Validation array errors
        } else {
          setError("Failed to login. Please try again.");
        }
      } else {
        setError("Network error. Please check your connection.");
      }
    }
  };

  return (
    <>
      <Header />
      <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900">
        <div className="max-w-md w-full bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8">
          <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Log In
          </h3>
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label
                htmlFor="email"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Your Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="example@gmail.com"
                required
                onChange={handleChange}
              />
            </div>
            <div>
              <label
                htmlFor="password"
                className="block text-sm font-medium text-black dark:text-white mb-2"
              >
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="w-full bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block p-3 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500"
                placeholder="••••••••"
                required
                onChange={handleChange}
              />
            </div>
            <div className="flex items-start mb-4">
              <input
                id="terms"
                type="checkbox"
                className="w-4 h-4 text-primary-500 border-gray-300 rounded focus:ring-primary-500 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600"
                required
              />
              <label
                htmlFor="terms"
                className="ml-3 text-sm text-black dark:text-white"
              >
                I accept the{" "}
                <a
                  href="#"
                  className="font-medium text-primary-500 hover:underline dark:text-primary-500"
                >
                  Terms and Conditions
                </a>
              </label>
            </div>
            {error && (
              <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded-md text-sm">
                {error}
              </div>
            )}
            <button
              type="submit"
              className="w-full text-white text-lg-Bold bg-black hover:bg-primary-600 focus:ring-primary-500 focus:outline-none font-medium rounded-lg text-sm px-4 py-3 transition-colors duration-300"
            >
              Log in
            </button>
            <p className="text-sm text-black dark:text-white mt-4">
              Don't have an account?{" "}
              <Link
                to="/signup"
                className="font-medium text-primary-500 hover:underline dark:text-primary-500"
              >
                Create an Account
              </Link>
            </p>
          </form>
        </div>
      </div>

      {/* Full-Screen Login Loading Overlay */}
      {isLoggingIn && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center bg-white dark:bg-gray-900 bg-opacity-50 dark:bg-opacity-50 transition-opacity">
          <div className="flex flex-col items-center justify-center bg-white dark:bg-gray-800 p-8 rounded-2xl shadow-2xl border border-gray-100 dark:border-gray-700">
            <svg className="animate-spin h-12 w-12 text-black dark:text-white mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <p className="text-xl font-semibold text-black dark:text-white">Logging in...</p>
          </div>
        </div>
      )}
    </>
  );
};

export default Login;
