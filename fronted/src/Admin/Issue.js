import React, { useEffect, useState } from "react";
import Header from "./Header";
import axios from "axios";

const Issue = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const [issues, setIssues] = useState([]);
  const [order, setOrder] = useState([]);

  useEffect(() => {
    const fetchIssuesWithDetails = async () => {
      try {
        const response = await axios.get(`${backendurl}/issue`);
        const issuesData = response.data;

        const issuesWithDetails = await Promise.all(
          issuesData.map(async (issue) => {
            const user = await fetchUserDetails(issue.userId);
            const order = await fetchOrderDetails(issue.orderId);

            return {
              ...issue,
              userName: user ? user.name : "Unknown User",
              orderItems: order ? order.cartItems : [],
            };
          })
        );

        setIssues(issuesWithDetails);
      } catch (error) {
        console.error("Error fetching issues:", error);
      }
    };

    fetchIssuesWithDetails();
  }, []);
  console.log(issues);

  const fetchUserDetails = async (userId) => {
    try {
      const response = await axios.get(`${backendurl}/user/${userId}`);
      return response.data;
    } catch (error) {
      console.error("Error fetching user details:", error);
      return null;
    }
  };

  const fetchOrderDetails = async (orderId) => {
    try {
      const response = await axios.get(`${backendurl}/order/${orderId}`);
      setOrder(response.data);
    } catch (error) {
      console.error("Error fetching order details:", error);
      return null;
    }
  };

  return (
    <>
      <Header />
      <div className="flex flex-wrap justify-center">
        {issues.map((issue) => (
          <div key={issue._id} className="border rounded-lg shadow-lg m-4 w-72">
            <div className="p-4">
              <h2 className="text-xl font-semibold">
                {issue.userName || "Unknown User"}
              </h2>
              <p>This is order: {issue.orderId}</p>

              {/* Display the issues */}
              <p>Issues:</p>
              <ul>
                {issue.issues.map((singleIssue, index) => (
                  <li key={index}>{singleIssue}</li>
                ))}
              </ul>

              {/* Display order items */}
              <p className="mt-4">Order Items:</p>
              <ul>
                {(issue.orderItems || []).map((cartItem, index) => (
                  <li key={index} className="mb-1">
                    {cartItem.name || "No item name available"}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default Issue;
