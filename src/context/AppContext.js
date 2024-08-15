import React, { createContext, useContext, useState } from "react";

const AppStateContext = createContext();

export const useAppState = () => useContext(AppStateContext);

export const AppStateProvider = ({ children }) => {
  const [summaryData, setSummaryData] = useState({
    subTotal: 0,
  });
  const [cartData, setCartData] = useState({
    totalItems: 0,
    itemIds: [],
  });

  return (
    <AppStateContext.Provider
      value={{
        summaryData,
        setSummaryData,
        cartData,
        setCartData,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};
