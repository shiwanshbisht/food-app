import { useState, useEffect } from "react";
import React from "react";
import axios from "axios";
import Header from "./Header";
import { Footer } from "../components/Footer";
import Card from "react-bootstrap/Card";

const Adminorders = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const [order, setOrder] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const total = order.reduce((sum, item) => sum + (item.price || 0), 0);

  useEffect(() => {
    axios
      .get(`${backendurl}/order`)
      .then((response) => {
        const reversedOrders = response.data.reverse();
        setOrder(reversedOrders);
      })
      .catch((error) => {
        console.error("Error fetching orders:", error);
        setError("Failed to fetch orders.");
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const handleDeliver = (orderId) => {
    console.log("Order ID:", orderId);
    axios
      .put(`${backendurl}/order/${orderId}`, { status: "Delivered" })
      .then((response) => {
        console.log("Order updated:", response.data);
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };
  const handlePrepare = (orderId) => {
    console.log("Order ID:", orderId);
    axios

      .put(`${backendurl}/order/${orderId}`, { status: "Preparing" })
      .then((response) => {
        console.log("Order updated:", response.data);
        alert("updated");
      })
      .catch((error) => {
        console.error("Error updating order status:", error);
      });
  };

  const handleCheckboxChange = (index) => {
    if (!order[index]?.disabled) {
      const updatedOrder = [...order];
      updatedOrder[index].completed = !updatedOrder[index].completed;
      if (updatedOrder[index].completed) {
        updatedOrder[index]["Completed at"] = new Date().toISOString();
      } else {
        updatedOrder[index]["Completed at"] = null;
      }
      updatedOrder[index].disabled = true;
      setOrder(updatedOrder);
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;

  return (
    <>
      <Header />
      <h1 className="text-2xl font-bold my-4">Order</h1>

      <div className="container mx-auto px-4">
        <ul className="space-y-4">
          {order.length === 0 ? (
            <p>No orders available.</p>
          ) : (
            order.map((orderItem, index) => (
              <li
                key={index}
                className="p-4 border border-gray-300 rounded shadow-sm bg-white flex flex-col gap-4"
              >
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    checked={orderItem.completed || false}
                    onChange={() => handleCheckboxChange(index)}
                    disabled={orderItem.disabled || false}
                    className="mr-2"
                  />
                  <div>
                    <div className="flex space-between">
                      <div
                        className={`text-lg ${
                          orderItem.completed
                            ? "line-through text-gray-500"
                            : ""
                        }`}
                      >
                        {orderItem.name} -{" "}
                        <a href={`tel:${orderItem.phone}`}>
                          <img
                            className="w-4 h-4"
                            src="https://cdn-icons-png.flaticon.com/128/455/455705.png"
                          />
                          {orderItem.phone}
                        </a>{" "}
                        - Table {orderItem.table} - Created at -{" "}
                        {new Date(orderItem.createdAt).toLocaleString()}
                      </div>
                      <div>
                        {orderItem.status ? (
                          <p>Prepring</p>
                        ) : (
                          <button
                            onClick={() => handlePrepare(orderItem._id)}
                            className="px-4 py-2 bg-yellow-500 text-white rounded"
                          >
                            Preparing
                          </button>
                        )}
                      </div>
                      <div>
                        <button
                          onClick={() => handleDeliver(orderItem._id)}
                          className="px-4 py-2 bg-green-500 text-white rounded"
                        >
                          Delivered
                        </button>
                      </div>
                    </div>
                    <div>
                      {orderItem.cartItems && orderItem.cartItems.length > 0 ? (
                        orderItem.cartItems.map((foodItem) => (
                          <Card
                            className="flex"
                            key={foodItem._id}
                            style={{ width: "18rem", margin: "10px" }}
                          >
                            <Card.Img variant="top" src={foodItem.image} />
                            <Card.Body>
                              <Card.Title>
                                {foodItem.name}({foodItem.quantity})
                              </Card.Title>
                              <Card.Text>Price: {foodItem.price}</Card.Text>
                            </Card.Body>
                          </Card>
                        ))
                      ) : (
                        <p>No items in the cart.</p>
                      )}
                    </div>
                    <div>
                      {orderItem.payment_id ? (
                        <button
                          className="px-4 py-2 bg-green-500 text-white rounded"
                          aria-disabled="true"
                        >
                          Paid
                        </button>
                      ) : (
                        <button className="px-4 py-2 bg-red-500 text-white rounded">
                          Unpaid
                        </button>
                      )}
                    </div>

                    {orderItem.completed && (
                      <span className="text-sm text-gray-500 ml-4">
                        - Delivered at{" "}
                        {new Date(orderItem["Completed at"]).toLocaleString()}
                      </span>
                    )}
                  </div>
                </div>
              </li>
            ))
          )}
        </ul>
        <h5 className="mt-4 text-lg font-bold">
          Total Price: Rs. {total.toFixed(2)}
        </h5>
      </div>

      <Footer />
    </>
  );
};

export default Adminorders;
