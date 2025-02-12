import React, { useState, useEffect } from "react";
import axios from "axios";
import Header from "./Header";

const Menu = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const [menu, setMenu] = useState([]);
  const [quantities, setQuantities] = useState({});

  const handleChange = (id, value) => {
    setQuantities({
      ...quantities,
      [id]: value,
    });
  };

  const handleClick = (foodItem) => {
    const quantity = quantities[foodItem._id];
    if (quantity) {
      axios
        .put(`${backendurl}/menuitem/${foodItem._id}`, { quantity })
        .then((response) => {
          alert("Quantity updated successfully");
        })
        .catch((error) => {
          console.error("Error updating quantity:", error);
        });
    } else {
      alert("Please enter a quantity");
    }
  };

  useEffect(() => {
    axios
      .get("http://localhost:4000/menuitem")
      .then((response) => {
        setMenu(response.data);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, [quantities]);

  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center">
        {menu.map((foodItem) => (
          <div
            key={foodItem._id}
            className="border rounded-lg shadow-lg m-4 w-72"
          >
            <div className="p-4">
              <h2 className="text-xl font-semibold">{foodItem.name}</h2>
              <p className="text-gray-600">Price: ₹ {foodItem.price}</p>
              <p className="text-gray-600">
                Available quantity: {foodItem.quantity}
              </p>
              <div className="mt-4 flex items-center">
                <label className="mr-2">Quantity:</label>
                <input
                  type="number"
                  className="p-2 border border-gray-300 rounded w-full"
                  value={quantities[foodItem._id] || ""}
                  onChange={(e) => handleChange(foodItem._id, e.target.value)}
                />
              </div>
              <div className="mt-4">
                <button
                  className="bg-black text-white py-2 px-4 rounded hover:bg-green-700"
                  onClick={() => handleClick(foodItem)}
                >
                  Add
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Menu;
