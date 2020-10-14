import React, { createContext, useReducer } from "react";

// Reducers
import AdminReducer, {
  initialState as adminInitialState,
} from "./reducers/admin";
import CartReducer, { initialState as cartInitialState } from "./reducers/cart";

// React Contexts
export const adminContext = createContext();
export const cartContext = createContext();

export default function Context({ children }) {
  const [admin, adminDispatch] = useReducer(AdminReducer, adminInitialState);
  const [cart, cartDispatch] = useReducer(CartReducer, cartInitialState);

  return (
    <cartContext.Provider value={{ cart, cartDispatch }}>
      <adminContext.Provider value={{ admin, adminDispatch }}>
        {children}
      </adminContext.Provider>
    </cartContext.Provider>
  );
}
