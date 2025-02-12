import { createSlice, current } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    items: [],
  },
  reducers: {
    increment: (state, action) => {
      console.log(current(state.items));
      const temp = state.items.map((item) => {
        console.log(item);

        if (item._id === action.payload?._id) {
          return {
            ...item,
            quantity: item?.quantity + 1,
          };
        } else return item;
      });
      console.log(temp, "temp");
      state.items = temp;
    },
    decrement: (state, action) => {
      const temp = state.items
        .map((item) => {
          if (item._id === action.payload?._id) {
            if (item.quantity > 1) {
              return {
                ...item,
                quantity: item.quantity - 1,
              };
            } else {
              return null;
            }
          } else {
            return item;
          }
        })
        .filter((item) => item !== null);

      state.items = temp;
    },

    addItem: (state, action) => {
      const isExist = state.items?.some(
        (item) => item?._id === action.payload?._id
      );
      if (isExist) {
        const temp = current(state.items)?.map((item) => {
          console.log("temp", action.payload);
          if (item?._id === action.payload?._id) {
            const updatedData = { ...item, quantity: item.quantity + 1 };
            return {
              ...updatedData,
            };
          }
          return item;
        });
        state.items = temp;

        toast.success("Added...", {
          position: "top-center",
        });
      } else {
        const existingData = [
          ...current(state.items),
          {
            quantity: 1,

            ...action.payload,
          },
        ];
        console.log(action.payload, "ction.payload");
        state.items = existingData;
        toast.success("Item Added", {
          position: "top-center",
        });
      }
    },
    removeItem: (state, action) => {
      state.items = state.items.filter(
        (item) => item._id !== action.payload._id
      );
    },
    clearCart: (state) => {
      state.items = [];
    },
  },
});

export const { addItem, removeItem, clearCart, increment, decrement } =
  cartSlice.actions;
export default cartSlice.reducer;
