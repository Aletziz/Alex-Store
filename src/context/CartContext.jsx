import React, { createContext, useState, useContext } from "react";
import { useProducts } from "./ProductContext";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const { updateStock } = useProducts();

  const addToCart = async (product) => {
    const canAdd = await updateStock(product.id, 1);
    if (canAdd) {
      setCart((prevCart) => {
        const existingItem = prevCart.find((item) => item.id === product.id);
        if (existingItem) {
          return prevCart.map((item) =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          );
        }
        return [...prevCart, { ...product, quantity: 1 }];
      });
      return true;
    }
    return false;
  };

  const removeFromCart = async (productId) => {
    const item = cart.find((item) => item.id === productId);
    if (item) {
      await updateStock(productId, -item.quantity); // Return stock
      setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
    }
  };

  const clearCart = async () => {
    for (const item of cart) {
      await updateStock(item.id, -item.quantity); // Return all stock
    }
    setCart([]);
  };

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        clearCart,
        total: cart.reduce((sum, item) => sum + item.price * item.quantity, 0),
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
