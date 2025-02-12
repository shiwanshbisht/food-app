import React, { useEffect, useState } from "react";
import axios from "axios";
import Header from "../components/Header";
import { Footer } from "../components/Footer";
import Review from "../components/Review";
import Issue from "../components/Issue";
import BottomNavBar from "../components/BottamNavbar";

export default function MyOrder() {
  const [fooditem, setFooditem] = useState([]);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isIssueOpen, setIsIssueOpen] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  const handleIssueClick = (orderId) => {
    setSelectedOrderId(orderId);
    setIsIssueOpen(true);
  };

  const handleCloseIssue = () => {
    setIsIssueOpen(false);
    setSelectedOrderId(null); // Reset the orderId when closing
  };

  const handleButtonClick = () => {
    setIsPopupOpen(true);
  };

  const handleClosePopup = () => {
    setIsPopupOpen(false);
  };

  useEffect(() => {
    axios
      .get(`${backendurl}/order`)
      .then((response) => {
        setFooditem(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  const handlePaylater = (orderId) => {
    console.log("order_Id", orderId);
  };

  return (
    <>
      <Header />
      <div className="pt-20 container mx-auto p-6">
        <div className="">
          <h1 className="text-3xl font-bold mb-6 text-left">My Orders</h1>

          <div className="flex justify-end mb-6">
            <button
              className="px-4 py-2  text-white font-bold rounded-md  mr-4"
              style={{
                background:
                  "linear-gradient(-90deg, #007cf0, #00dfd8, #ff0080, #007cf0)",
                backgroundSize: "400% 100%",
                animation:
                  "collaboration-button_backgroundAnim 8s ease-in-out infinite",
              }}
              onClick={handleButtonClick}
            >
              Add Review
            </button>
          </div>
        </div>

        {isPopupOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-gradient-to-r from-purple-200 via-purple-300 to-yellow-200 p-6 rounded-lg shadow-lg max-w-lg w-full">
              <button
                className="text-red hover:text-gray-700 float-right"
                onClick={handleClosePopup}
              >
                Close
              </button>
              <Review onClose={handleClosePopup} />
            </div>
          </div>
        )}

        {/* {isIssueOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
              <button
                className="text-red hover:text-gray-700 float-right"
                onClick={handleCloseIssue}
              >
                Close
              </button>
              <Issue />
            </div>
          </div>
        )} */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {fooditem.map((foodItem) => (
            <div
              key={foodItem._id}
              className="bg-white p-6 rounded-lg shadow-md border border-gray-200"
            >
              <div className="mb-4 flex justify-between">
                <p className="text-gray-700 mb-1">
                  <strong>Table:</strong> {foodItem.table}
                </p>
                <p className="text-sm sm:text-base mb-2 text-gray-500">
                  <span
                    className={`font-semibold ${
                      foodItem.status === "Delivered"
                        ? "text-green-600"
                        : "text-yellow-600"
                    }`}
                  >
                    {foodItem.status}
                  </span>
                </p>
                <span>
                  {foodItem.payment_id ? (
                    <span>{foodItem.amount}</span>
                  ) : (
                    <button
                      onClick={() => handlePaylater(foodItem._id)}
                      className="text-blue-400"
                    >
                      {" "}
                      Pay Now ➔{" "}
                    </button>
                  )}
                </span>
              </div>
              <hr />
              <div>
                <ul className="list-disc pl-5 text-gray-700">
                  {(foodItem.cartItems || []).map((cartItem, index) => (
                    <li key={index} className="mb-1">
                      {cartItem.name}({cartItem.quantity})
                    </li>
                  ))}
                </ul>
              </div>

              {isIssueOpen && selectedOrderId && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                  <div className="bg-white p-6 rounded-lg shadow-lg max-w-lg w-full">
                    <button
                      className="text-red hover:text-gray-700 float-right"
                      onClick={handleCloseIssue}
                    >
                      Close
                    </button>
                    <Issue
                      orderId={selectedOrderId}
                      onClose={handleCloseIssue}
                    />
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
      <div className="mt-20 sm:hidden">
        <BottomNavBar />
      </div>
      <div className="hidden sm:block">
        <Footer />
      </div>
    </>
  );
}
