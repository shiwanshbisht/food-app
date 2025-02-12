import React, { useEffect, useState } from "react";
import Header from "../Admin/Header";
import axios from "axios";
import Addexpense from "./Addexpense";
import { Footer } from "../components/Footer";

const Expense = () => {
  const backendurl = process.env.REACT_APP_BACKEND_API_URL;
  const [tasks, setTasks] = useState([]);
  const [addExpense, setAddExpense] = useState(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await axios.get(`${backendurl}/expense`);
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleAddExpense = async (newTask) => {
    try {
      await axios.post(`${backendurl}/expense`, newTask);
      fetchTasks();
      handleClose();
    } catch (error) {
      console.error("Error adding expense:", error);
    }
  };

  const handleClose = () => {
    setAddExpense(false);
  };

  const total = tasks.reduce((sum, task) => sum + task.price, 0);

  return (
    <>
      <Header />
      <div className="container mx-auto px-4 py-8 mb-16">
        <h1 className="text-3xl font-bold mb-4">Expense Tracker</h1>
        <button
          className="bg-black text-white py-2 px-4 rounded hover:bg-blue-600 transition duration-300"
          onClick={() => setAddExpense(true)}
        >
          Add Expense
        </button>
        {addExpense && (
          <Addexpense onAddExpense={handleAddExpense} onClose={handleClose} />
        )}
        <ul className="mt-8">
          {tasks.map((taskItem, index) => (
            <li
              key={index}
              className="bg-gray-100 border border-gray-200 p-4 mb-2 rounded"
            >
              <span className="font-semibold">{taskItem.name}</span> -{" "}
              <span>₹{taskItem.price}</span> - Created at -{" "}
              {new Date(taskItem.createdAt).toLocaleDateString()}
            </li>
          ))}
        </ul>
        <h5 className="mt-8 text-lg font-semibold">Total Expense: ₹{total}</h5>
      </div>
      <Footer />
    </>
  );
};

export default Expense;
