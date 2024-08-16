import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [summaryData, setSummaryData] = useState({
    subTotal: 0,
  });
  const [cartData, setCartData] = useState({
    totalItems: 0,
    cartItems: [],
  });

  const isProductInCart = (productIdentifier) => {
    return cartData.cartItems.some(
      (item) =>
        item.id === productIdentifier || item.refId === productIdentifier
    );
  };
  const updateSummaryData = (cartItems) => {
    const subTotal = cartItems.reduce(
      (acc, item) => acc + item.price * item.quantity,
      0
    );
    setSummaryData({
      subTotal: subTotal.toFixed(2),
    });
  };

  const addProductToContextCart = (product) => {
    setCartData((prev) => {
      const updatedCartItems = [...prev.cartItems, product];
      const totalItems = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      console.log(updatedCartItems, totalItems);
      updateSummaryData(updatedCartItems);
      return {
        cartItems: updatedCartItems,
        totalItems,
      };
    });
  };

  const removeProductFromContextCart = (productId) => {
    setCartData((prev) => {
      const updatedCartItems = prev.cartItems.filter(
        (item) => item.id !== productId
      );
      const totalItems = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      updateSummaryData(updatedCartItems);
      return {
        cartItems: updatedCartItems,
        totalItems,
      };
    });
  };

  const updateProductQuantityInCart = (productId, updatedData) => {
    setCartData((prev) => {
      const updatedCartItems = prev.cartItems.map((item) =>
        item.id === productId
          ? { ...item, quantity: updatedData.quantity }
          : item
      );
      const totalItems = updatedCartItems.reduce(
        (acc, item) => acc + item.quantity,
        0
      );
      updateSummaryData(updatedCartItems);
      return {
        cartItems: updatedCartItems,
        totalItems,
      };
    });
  };

  const setCartItemsContext = (cartItems) => {
    const totalItems = cartItems.reduce((acc, item) => acc + item.quantity, 0);
    setCartData({
      cartItems,
      totalItems,
    });
    updateSummaryData(cartItems);
  };

  return (
    <AppStateContext.Provider
      value={{
        summaryData,
        cartData,
        isProductInCart,
        addProductToContextCart,
        removeProductFromContextCart,
        updateProductQuantityInCart,
        setSummaryData,
        setCartData,
        setCartItemsContext,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
