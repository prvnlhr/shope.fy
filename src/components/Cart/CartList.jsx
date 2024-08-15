"use client";
import React, { useEffect } from "react";
import styles from "./styles/cartList.module.css";
import CartItemCard from "./CartItemCard";
import { useAppState } from "@/context/AppContext";

const CartList = ({ cartItemsList }) => {
  const { setSummaryData, setCartData } = useAppState();
  useEffect(() => {
    const { subTotal, totalItems } = cartItemsList.reduce(
      (acc, curr) => {
        acc.subTotal += curr.price * curr.quantity;
        acc.totalItems += curr.quantity;
        return acc;
      },
      { subTotal: 0, totalItems: 0 }
    );
    setSummaryData((prev) => ({
      ...prev,
      subTotal: subTotal.toFixed(2),
    }));
    const itemIds = cartItemsList.map((item) => item.refId);
    setCartData((prev) => ({ ...prev, totalItems, itemIds }));
  }, [cartItemsList]);

  return (
    <div className={styles.cartListWrapper}>
      {cartItemsList.map((item) => (
        <CartItemCard item={item} />
      ))}
    </div>
  );
};

export default CartList;
