"use client";
import React, { useEffect, useState } from "react";
import styles from "./styles/cartList.module.css";
import CartItemCard from "./CartItemCard";
import { useAppState } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import { fetchLocalCartItems } from "@/lib/utils/cartUtils";

const CartList = ({ cartItemsList: initialCartItemsList }) => {
  const { cartData, setCartItemsContext } = useAppState();
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  useEffect(() => {
    if (!userId) {
      const localCartItems = fetchLocalCartItems();
      setCartItemsContext(localCartItems);
    } else {
      setCartItemsContext(initialCartItemsList);
    }
  }, [userId, initialCartItemsList]);

  return (
    <div className={styles.cartListWrapper}>
      {cartData.cartItems.length > 0 ? (
        cartData.cartItems.map((item, index) => (
          <CartItemCard key={item._id || index} item={item} />
        ))
      ) : (
        <p className={styles.emptyListMsg}>Add items to show</p>
      )}
    </div>
  );
};

export default CartList;
