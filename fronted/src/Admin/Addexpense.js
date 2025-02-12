import React, { useState } from "react";

const Addexpense = ({ onAddExpense, onClose }) => {
  const [task, setTask] = useState("");
  const [amount, setAmount] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name === "task") {
      setTask(value);
    } else if (name === "amount") {
      setAmount(value);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      name: task,
      price: amount,
    };
    onAddExpense(newTask);
    setTask("");
    setAmount("");
    onClose(); 
  };

  return (
    <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white rounded-md p-8">
        <h2 className="text-2xl font-semibold mb-4">Add Expense</h2>
        <form onSubmit={handleSubmit}>
          <div className="flex flex-col space-y-4">
            <input
              type="text"
              name="task"
              value={task}
              placeholder="Expense Name"
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <input
              type="number"
              name="amount"
              value={amount}
              placeholder="Amount"
              onChange={handleChange}
              className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
            />
            <div className="flex justify-end">
              <button
                type="button"
                className="text-gray-500 hover:text-gray-700 mr-4"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="bg-black text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
              >
                Add Expense
              </button>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Addexpense;

// const Addexpense = ({ onAddExpense }) => {
//   const [task, setTask] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "task") {
//       setTask(value);
//     } else if (name === "amount") {
//       setAmount(value);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newTask = {
//       name: task,
//       price: amount,
//     };
//     onAddExpense(newTask);
//     setTask("");
//     setAmount("");
//   };

//   return (
//     <form onSubmit={handleSubmit} className="mt-8">
//       <div className="flex flex-col space-y-4">
//         <input
//           type="text"
//           name="task"
//           value={task}
//           placeholder="Expense Name"
//           onChange={handleChange}
//           className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
//         />
//         <input
//           type="number"
//           name="amount"
//           value={amount}
//           placeholder="Amount"
//           onChange={handleChange}
//           className="border border-gray-300 rounded-md py-2 px-4 focus:outline-none focus:border-blue-500"
//         />
//         <button
//           type="submit"
//           className="bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300"
//         >
//           Add Expense
//         </button>
//       </div>
//     </form>
//   );
// };

// export default Addexpense;

// import React, { useState } from "react";

// const Addexpense = ({ onAddExpense }) => {
//   const [task, setTask] = useState("");
//   const [amount, setAmount] = useState("");

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     if (name === "task") {
//       setTask(value);
//     } else if (name === "amount") {
//       setAmount(value);
//     }
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newTask = {
//       name: task,
//       price: amount,
//     };
//     onAddExpense(newTask);
//     setTask("");
//     setAmount("");
//   };

//   return (
//     <form onSubmit={handleSubmit}>
//       <input
//         type="text"
//         name="task"
//         value={task}
//         placeholder="Add Expense"
//         onChange={handleChange}
//       />
//       <input
//         type="number"
//         name="amount"
//         value={amount}
//         placeholder="Amount"
//         onChange={handleChange}
//       />
//       <button type="submit">Add</button>
//     </form>
//   );
// };

// export default Addexpense;
