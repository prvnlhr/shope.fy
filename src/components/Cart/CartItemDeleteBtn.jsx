"use client";
import { removeFromCart } from "@/lib/api/public/cartsApi";
import React, { useState } from "react";
import Spinner from "../Common/Icons/Spinner";
import styles from "./styles/cartItemCard.module.css";
const CartItemDeleteBtn = ({ itemId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const handleDeleteItem = async () => {
    setIsDeleting(true);
    try {
      const res = await removeFromCart(itemId);
      // if (res?.message !== "Cart item deleted successfully") {
      //   return;
      // }
    } catch (error) {
      console.error("An error occurred while deleting the cart item:", error);
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <div className={styles.deleteBtnWrapper}>
      {isDeleting ? (
        <Spinner color={"#383838"} />
      ) : (
        <button type="button" onClick={handleDeleteItem}>
          <p>Remove</p>
        </button>
      )}
    </div>
  );
};

export default CartItemDeleteBtn;
