import React, { createContext, useCallback, useMemo, useState } from "react";
import axiosInstance from "../utils/axiosInstance";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [error, setError] = useState(null);

  const fetchCart = async () => {
    try {
      const res = await axiosInstance.get("/cart");
      setCart(res.data);
      console.log(res.data);
    } catch (err) {
      console.log(err);
      setError(err);
    }
  };

  const addToCart = async (x) => {
    await axiosInstance.post(`/cart`, x);
    fetchCart();
  };

  const deleteCart = useCallback(async (id) => {
    await axiosInstance.delete(`/cart/${id}`);
    fetchCart();
  }, []);

  //   const updateCart =async(id) => {

  //   }

  const value = useMemo(() => {
    return {
      fetchCart,
      addToCart,
      deleteCart,
      //   updateCart,
      cart,
      error,
    };
  }, [cart]);

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
