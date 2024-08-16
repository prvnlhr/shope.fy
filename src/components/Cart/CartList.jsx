"use client";
import React, { useEffect } from "react";
import styles from "./styles/cartList.module.css";
import CartItemCard from "./CartItemCard";
import { useAppState } from "@/context/AppContext";

const CartList = ({ cartItemsList }) => {
  const { setSummaryData, setCartData } = useAppState();
  useEffect(() => {
    const { subTotal, totalItems, itemIds } = cartItemsList.reduce(
      (acc, curr) => {
        acc.subTotal += curr.price * curr.quantity;
        acc.totalItems += curr.quantity;
        acc.itemIds = [...acc.itemIds, curr.refId];
        return acc;
      },
      { subTotal: 0, totalItems: 0, itemIds: [] }
    );
    setSummaryData((prev) => ({
      ...prev,
      subTotal: subTotal.toFixed(2),
    }));
    setCartData((prev) => ({ ...prev, totalItems, itemIds }));
  }, [cartItemsList]);

  return (
    <div className={styles.cartListWrapper}>
      {cartItemsList.length > 0 ? (
        cartItemsList.map((item) => <CartItemCard key={item._id} item={item} />)
      ) : (
        <p className={styles.emptyListMsg}>Add items to show</p>
      )}
    </div>
  );
};

export default CartList;
