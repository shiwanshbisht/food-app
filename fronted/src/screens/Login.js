import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const Login = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  let navigate = useNavigate();
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
        const token = result.token;
        Cookies.set("jwt", token);

        const decoded = jwtDecode(token);
        console.log("Decoded token:", decoded);

        if (decoded.role === "admin") {
          navigate("/order");
        } else {
          navigate("/");
        }
      }
    } catch (error) {
      console.error("Error logging in:", error);
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
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
                className="block text-sm font-medium text-gray-700 dark:text-gray-200 mb-2"
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
                className="ml-3 text-sm text-gray-600 dark:text-gray-400"
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
            <button
              type="submit"
              className="w-full text-white text-lg-Bold bg-black hover:bg-primary-600 focus:ring-primary-500 focus:outline-none font-medium rounded-lg text-sm px-4 py-3 transition-colors duration-300"
            >
              Log in
            </button>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-4">
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
    </>
  );
};

export default Login;
