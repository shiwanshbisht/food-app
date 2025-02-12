import React from "react";
import { useDispatch } from "react-redux";
import { decrement, increment } from "../utils/cartSlice";

const Counter = ({ value }) => {
  const dispatch = useDispatch();

  return (
    <div className="px-2 py-1 flex items-center border-2 border-green-300 rounded">
      <button
        onClick={() => {
          dispatch(decrement(value));
        }}
        className="py-1  text-gray-700 font-bold"
      >
        -
      </button>
      <span className="px-3">{value?.quantity}</span>
      <button
        onClick={() => {
          dispatch(increment(value));
        }}
        className=" py-1  text-gray-700 font-bold "
      >
        +
      </button>
    </div>
  );
};

export default Counter;
