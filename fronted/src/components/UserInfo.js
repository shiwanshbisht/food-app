import React, { useState, useEffect } from "react";
import axios from "axios";
import { FaWhatsapp } from "react-icons/fa";

function Userinfo() {
  const [name, setName] = useState("");
  const [mobile, setMobile] = useState("");
  const [receiveUpdates, setReceiveUpdates] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic
    console.log(
      "Name:",
      name,
      "Mobile:",
      mobile,
      "Receive Updates:",
      receiveUpdates
    );
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-700 bg-opacity-75 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <div className="flex justify-between items-center mb-4">
          <h1>Hello 👋</h1>
          <h2 className="text-lg font-bold">Confirm your WhatsApp number</h2>
          <button className="text-xl font-bold">&times;</button>{" "}
          {/* Close Button */}
        </div>
        <p className="text-gray-500 mb-4 text-sm">to place order</p>

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Name"
              className="border rounded-md w-full p-2 mb-2"
              required
            />
          </div>
          <div className="mb-4 flex items-center">
            <div className="flex items-center border rounded-md p-2 w-full">
              <FaWhatsapp className="text-green-500 mr-2" size={24} />
              <input
                type="tel"
                value={mobile}
                onChange={(e) => setMobile(e.target.value)}
                placeholder="Mobile Number"
                className="w-full outline-none"
                required
              />
            </div>
          </div>

          <div className="mb-4 flex items-center text-sm">
            <input
              type="checkbox"
              checked={receiveUpdates}
              onChange={() => setReceiveUpdates(!receiveUpdates)}
              className="mr-2"
            />
            <label className="text-gray-500">
              Yes, I want to receive important information & updates on my
              WhatsApp
            </label>
          </div>

          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-md text-center font-medium hover:bg-gray-800 transition"
          >
            Confirm
          </button>
        </form>
      </div>
    </div>
  );
}

export default Userinfo;
