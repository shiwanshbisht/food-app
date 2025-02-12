// import React, { useEffect, useState } from "react";
// import axios from "axios";
// import Header from "../components/Header";
// import { Link, useNavigate } from "react-router-dom";

// const Signup = () => {
//     let navigate = useNavigate();
//     const [user, setUser] = useState({
//         name: "",
//         email: "",
//         password: "",
//     });

//     const handleChange = (e) => {
//         setUser((prev) => ({
//             ...prev,
//             [e.target.name]: e.target.value,
//         }));
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         try {
//           await axios
//             .post(
//               "http://localhost:4000/signup",
//               {
//                 name : user.name,
//                 email: user.email,
//                 password: user.password,
//               },
//               {
//                 headers: {
//                   "Content-Type": "application/json",
//                 },
//               }
//             )
//             .then((rs) => {
//               console.log(rs.data);
//               navigate("/");
//             });
//         } catch (error) {
//           console.error("Error registering user:", error);
//         }
//       };

//     console.log(user);
//     return (
//         <>
//             <Header />

//             <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
//                 <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
//                     Create an account
//                 </h1>
//                 <form className="space-y-4 md:space-y-6" onSubmit={(e) => handleSubmit(e)}>
//                     {" "}
//                     {/* Changed onClick to onSubmit */}
//                     <div>
//                         <label
//                             htmlFor="name"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                         >
//                             Your Name
//                         </label>
//                         <input
//                             type="text"
//                             name="name"
//                             id="name"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="Name"
//                             required=""
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="email"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                         >
//                             Your email
//                         </label>
//                         <input
//                             type="email"
//                             name="email"
//                             id="email"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             placeholder="name@company.com"
//                             required=""
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div>
//                         <label
//                             htmlFor="password"
//                             className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
//                         >
//                             Password
//                         </label>
//                         <input
//                             type="password"
//                             name="password"
//                             id="password"
//                             placeholder="••••••••"
//                             className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                             required=""
//                             onChange={handleChange}
//                         />
//                     </div>
//                     <div className="flex items-start">
//                         <div className="flex items-center h-5">
//                             <input
//                                 id="terms"
//                                 aria-labelledby="termsLabel"
//                                 type="checkbox"
//                                 className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800"
//                                 required=""
//                             />
//                         </div>
//                         <div className="ml-3 text-sm">
//                             <label
//                                 id="termsLabel"
//                                 className="font-light text-gray-500 dark:text-gray-300"
//                             >
//                                 I accept the{" "}
//                                 <a
//                                     className="font-medium text-primary-600 hover:underline dark:text-primary-500"
//                                     href="#"
//                                 >
//                                     Terms and Conditions
//                                 </a>
//                             </label>
//                         </div>
//                     </div>
//                     <button
//                         type="submit"
//                         className="w-full text-black bg-primary-100 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
//                         onSubmit={handleSubmit}
//                     >
//                         Create an account
//                     </button>
//                     <p className="text-sm font-light text-gray-500 dark:text-gray-400">
//                         Already have an account?{" "}
//                         <Link to="/login" className="text-s font-bold text-blue-500">
//                             Log In
//                         </Link>
//                     </p>
//                 </form>
//             </div>

//         </>
//     );
// };

// export default Signup;

import React, { useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Link, useNavigate } from "react-router-dom";

const Signup = () => {
  let navigate = useNavigate();
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const [user, setUser] = useState({
    name: "",
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
      await axios.post(
        `${backendurl}/signup`,
        {
          name: user.name,
          email: user.email,
          password: user.password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      navigate("/");
    } catch (error) {
      console.error("Error registering user:", error);
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
    </>
  );
};

export default Signup;
