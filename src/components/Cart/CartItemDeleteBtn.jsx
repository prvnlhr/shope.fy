"use client";
import { removeProductFromDBCart } from "@/lib/api/public/cartsApi";
import React, { useState } from "react";
import Spinner from "../Common/Icons/Spinner";
import styles from "./styles/cartItemCard.module.css";
import { useSession } from "next-auth/react";
import { deleteLocalCartItem } from "@/lib/utils/cartUtils";
import { useAppState } from "@/context/AppContext";

const CartItemDeleteBtn = ({ itemId }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const { removeProductFromContextCart } = useAppState();

  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const handleDeleteItem = async () => {
    setIsDeleting(true);
    try {
      if (userId) {
        const res = await removeProductFromDBCart(itemId);
        removeProductFromContextCart(itemId);
      } else {
        deleteLocalCartItem(itemId);
        removeProductFromContextCart(itemId);
      }
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
