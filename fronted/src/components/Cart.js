import React, { useState, useContext, useEffect } from "react";
import axios from "axios";
import Counter from "./Counter";

import { useDispatch, useSelector } from "react-redux";
import { addItem, removeItem, clearCart } from "../utils/cartSlice";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import UserContext from "../utils/UserContext";
import { useNavigate } from "react-router-dom";
import Emptycart from "./Emptycart";
import Offer from "./Offer";
import { BiMessageDetail } from "react-icons/bi";
import { RiArrowDropRightLine } from "react-icons/ri";

import Layout from "./Layout";

export const Cart = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const cartItems = useSelector((store) => store.cart.items);
  const dispatch = useDispatch();
  const [table, setTable] = useState("");
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem("cart");
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cartItems));
  }, [cartItems]);
  console.log("this is cartItems", cartItems);
  console.log("this is cart", cart);

  const handleChange = (e) => {
    setTable(e.target.value);
  };

  const total = cartItems.reduce(
    (sum, foodItem) => sum + foodItem.price * foodItem.quantity,
    0
  );

  let finalTotal = total;
  let deliveryFee = 0;

  if (total < 100 && cartItems.length !== 0) {
    deliveryFee = 80;
    finalTotal += deliveryFee;
  } else if (total < 200 && cartItems.length !== 0) {
    deliveryFee = 30;
    finalTotal += deliveryFee;
  }

  const handleRemove = (id) => {
    dispatch(removeItem({ _id: id }));
  };

  const handleCash = () => {
    const adminOrderEndpoint = `${backendurl}/order`;
    const orderData = {
      name: user.name,
      phone: user.phone,
      table: table,
      cartItems,
      user_Id: user._id,
      amount: total,
    };

    axios
      .post(adminOrderEndpoint, orderData)
      .then((response) => {
        console.log(response.data);
        dispatch(clearCart());
        navigate("/myorder");
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const getProgressWidth = () => {
    const x = (total / 200) * 100;
    if (x >= 100) {
      return 100;
    }
    return x;
  };

  const handlePlace = async () => {
    try {
      const { data } = await axios.post(`${backendurl}/payment`, {
        amount: finalTotal,
      });
      initPayment(data.data);
    } catch (err) {
      console.log(err);
    }
  };

  const initPayment = (data) => {
    const options = {
      key_id: "rzp_test_y2KlnwPCrKqlwr",
      amount: data.amount,
      currency: "INR",
      name: "The Night Manager",
      description: "Test Transaction",
      image: "/Assets/Hero/logo.png",
      order_id: data.id,
      handler: async (response) => {
        try {
          const verify = `${backendurl}/verify`;
          const { data } = await axios.post(verify, {
            ...response,
            cartItems,
            user,
          });
          const adminOrderEndpoint = `${backendurl}/order`;
          const orderData = {
            name: user.name,
            phone: user.phone,
            table: table,
            cartItems,
            user_Id: user._id,
            payment_id: response.razorpay_payment_id,
            order_id: response.razorpay_order_id,
            signature: response.razorpay_signature,
            amount: finalTotal,
          };
          const adminResponse = await axios.post(adminOrderEndpoint, orderData);
          console.log(adminResponse.data);
          console.log(data);
          dispatch(clearCart());
          navigate("/myorder");
        } catch (err) {
          console.log(err);
        }
      },
      prefill: {
        name: "",
        email: "customer@example.com",
        contact: "",
      },
      notes: {
        address: "Customer Address",
      },
      theme: {
        color: "#000",
      },
    };
    try {
      const razorpayInstance = new window.Razorpay(options);
      razorpayInstance.open();
    } catch (error) {
      console.error("Error initializing Razorpay:", error);
    }
  };

  return (
    <>
      <Layout>
        <div className="pt-20 container mx-auto px-4 py-6">
          <div className="flex flex-col md:flex-row md:justify-between gap-3">
            <div className="w-full md:w-2/3 overflow-x-auto bg-white shadow-md rounded-lg mb-4 md:mb-0">
              <div>{cartItems.length === 0 ? <Emptycart /> : <h1></h1>}</div>
              <h5 className="">Items in cart</h5>
              {cartItems.map((foodItem) => {
                return (
                  <div
                    key={foodItem._id}
                    className="flex items-center justify-between p-4 border-b border-gray-200"
                  >
                    <div className="flex items-center">
                      <div>
                        <span className="font-semibold text-lg">
                          {foodItem.name}
                        </span>
                        <p className="text-sm text-gray-500">{foodItem.size}</p>
                      </div>
                    </div>
                    <div className="flex items-center">
                      <Counter value={foodItem} />
                      <p className="ml-6 font-semibold text-gray-700">
                        ₹ {foodItem.price * foodItem.quantity}
                      </p>
                      <button
                        className="ml-4 text-red-500 hover:text-red-700"
                        onClick={() => handleRemove(foodItem._id)}
                      >
                        <img
                          src="https://cdn-icons-png.flaticon.com/128/10514/10514406.png"
                          alt="Remove"
                          className="w-6 h-6"
                        />
                      </button>
                    </div>
                  </div>
                );
              })}
              <div className="flex m-2  items-center border border-gray-300 rounded-lg p-2 bg-gray-100 ">
                <BiMessageDetail className="text-gray-400 text-lg font-bold mr-2" />
                <input
                  type="text"
                  placeholder="Preparation Instructions +"
                  className="bg-transparent border-none outline-none w-full text-gray-400"
                />
              </div>

              {cartItems.length !== 0 ? (
                <div className="mb-6 m-4 text-right">
                  {deliveryFee > 0 && <p>Delivery Fee: ₹ {deliveryFee}</p>}
                  <Offer />
                  <h3 className="text-lg font-semibold">
                    Total Amount: ₹ {finalTotal}
                  </h3>
                </div>
              ) : (
                <></>
              )}
            </div>
            {cartItems.length !== 0 ? (
              <div className="w-full md:w-1/3 bg-gray-200 p-4 rounded-lg flex flex-col justify-between">
                <div className="mb-6">
                  <label htmlFor="table" className="block py-2 text-gray-700">
                    Table No.
                  </label>
                  <div className="flex items-center text-gray-700 border border-gray-300 rounded-md">
                    <div className="px-3 py-2.5 bg-gray-50 border-r border-gray-300">
                      Hey
                    </div>
                    <input
                      type="number"
                      placeholder="Table"
                      id="table"
                      className="w-full p-2.5 bg-white outline-none"
                      onChange={handleChange}
                      required="true"
                    />
                  </div>
                </div>
                <div>
                  <p>
                    ORDERING INFORMATION: Please note: Orders take a minimum of
                    45 minutes to deliver. Whilst we endeavour to get your order
                    to you on time, there may be delays during busier periods.
                    If you have any issues with your order or experience, in the
                    first instance please contact.
                  </p>
                </div>
                <div className="flex flex-col space-y-4 mt-6">
                  <div className="">
                    {total < 200 ? (
                      <p className="text-sm text-gray-600 mb-4">
                        Add{" "}
                        <span className="font-semibold text-red-500">
                          ₹ {200 - total}
                        </span>{" "}
                        to get free delivery
                      </p>
                    ) : (
                      <p className="text-sm text-green-600 mb-4 font-semibold">
                        Free Delivery Applied!
                      </p>
                    )}

                    <div className="flex items-center">
                      <div className="w-full bg-gray-300 rounded-full overflow-hidden">
                        <div
                          className={`${
                            total < 200 ? "bg-yellow-500" : "bg-green-500"
                          } h-4 rounded-full`}
                          style={{
                            width: `${getProgressWidth()}%`,
                            transition: "width 0.8s ease-in-out",
                          }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <button
                    className="px-4 py-2 bg-black text-white font-bold rounded-md hover:bg-yellow-600"
                    onClick={handlePlace}
                  >
                    Rs. {finalTotal} Pay Now ➔
                  </button>
                  <button
                    className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600"
                    onClick={handleCash}
                    disabled={cartItems.length === 0}
                  >
                    Cash
                  </button>
                </div>
              </div>
            ) : (
              <></>
            )}
          </div>
        </div>
        <ToastContainer />
      </Layout>
    </>
  );
};

export default Cart;
