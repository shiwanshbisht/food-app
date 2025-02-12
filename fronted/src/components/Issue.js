import React, { useContext, useState } from "react";
import UserContext from "../utils/UserContext";
import axios from "axios";

const Issue = ({ orderId, onClose }) => {
  const { user, setUser } = useContext(UserContext);
  const [selectedIssues, setSelectedIssues] = useState([]);
  const [successMessage, setSuccessMessage] = useState(null);
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;

  const handleCheckboxChange = (issue) => {
    setSelectedIssues((prevSelected) =>
      prevSelected.includes(issue)
        ? prevSelected.filter((i) => i !== issue)
        : [...prevSelected, issue]
    );
  };

  const handleSubmit = async () => {
    if (selectedIssues.length === 0) {
      alert("Please select at least one issue.");
      return;
    }
    const newIssue = {
      userId: user._id,
      orderId: orderId,
      issues: selectedIssues,
    };
    console.log(newIssue);
    try {
      const response = await axios.post(`${backendurl}/issue`, {
        userId: user._id,
        orderId,
        issues: selectedIssues,
      });
      console.log("user response", response.data);
      if (response.data.success) {
        setSuccessMessage("Issue reported successfully!");
        setTimeout(() => {
          onClose();
        }, 2000);
      }
    } catch (error) {
      console.error("Error reporting issue:", error);
      alert("There was an error reporting your issue. Please try again later.");
    }
  };

  return (
    <div className="p-4">
      <ul className="list-none space-y-4">
        <li>
          <h4 className="text-lg font-semibold">Issue with the food?</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="less-quantity"
              className="mr-2"
              onChange={() => handleCheckboxChange("Less Quantity")}
            />
            <label htmlFor="less-quantity">Less Quantity</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="taste-issue"
              className="mr-2"
              onChange={() => handleCheckboxChange("Taste Issue")}
            />
            <label htmlFor="taste-issue">Taste Issue</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="not-cooked-well"
              className="mr-2"
              onChange={() => handleCheckboxChange("Not Cooked Well")}
            />
            <label htmlFor="not-cooked-well">Not Cooked Well</label>
          </div>
        </li>
        <li>
          <h4 className="text-lg font-semibold mt-4">Issue with the Staff?</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="behaviour-issue"
              className="mr-2"
              onChange={() => handleCheckboxChange("Behaviour Issue")}
            />
            <label htmlFor="behaviour-issue">Behaviour Issue</label>
          </div>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="not-served-well"
              className="mr-2"
              onChange={() => handleCheckboxChange("Not Served Well")}
            />
            <label htmlFor="not-served-well">Not Served Well</label>
          </div>
        </li>
        <li>
          <h4 className="text-lg font-semibold mt-4">Issue with Delivery?</h4>
          <div className="flex items-center">
            <input
              type="checkbox"
              id="late-delivery"
              className="mr-2"
              onChange={() => handleCheckboxChange("Late Delivered")}
            />
            <label htmlFor="late-delivery">Late Delivered</label>
          </div>
        </li>
      </ul>
      <button
        className="mt-4 px-4 py-2 bg-black text-white font-bold rounded-md hover:bg-indigo-700"
        onClick={handleSubmit}
      >
        Submit
      </button>
      {successMessage && (
        <p className="mt-4 text-green-600 font-semibold">{successMessage}</p>
      )}
    </div>
  );
};

export default Issue;
