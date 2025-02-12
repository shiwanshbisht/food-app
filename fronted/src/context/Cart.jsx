import React, { createContext, useState , useContext} from "react";

const CartContext = createContext(null);

export const useCart = ()=>{
    const cart = useContext(CartContext);
    return cart;
}

const CartProvider = (props) => {
    const [items, setItems] = useState([]);
    return (
        <CartContext.Provider value={{ items, setItems }}>
            {props.children}
        </CartContext.Provider>
    );
}

export { CartProvider, CartContext };