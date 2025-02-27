import {configureStore} from "@reduxjs/toolkit"
import cartSlice from "./cartSlice"
import counterSlice from "./counterSlice";
import menuItemsReducer from "./menuItems/menuItemsReducer"
const appStore = configureStore({
reducer: {
    cart: cartSlice,
    counter : counterSlice,
    menuItems: menuItemsReducer,
}
})
export default appStore;