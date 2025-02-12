import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import counterSlice from "./counterSlice";
const appStore = configureStore({
reducer: {
    cart: cartSlice,
    counter : counterSlice,
}
})
export default appStore;