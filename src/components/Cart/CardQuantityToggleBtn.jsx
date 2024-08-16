"use client";
import React, { useState } from "react";
import { updateCartItemInDB } from "@/lib/api/public/cartsApi";
import ArrowIcon from "@/components/Common/Icons/ArrowIcon";
import styles from "./styles/cartItemCard.module.css";
import { useSession } from "next-auth/react";
import { updateLocalCartItem } from "@/lib/utils/cartUtils";
import { useAppState } from "@/context/AppContext";

const CardQuantityToggleBtn = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);
  const {
    setSummaryData,
    addOrUpdateProductInCart,
    updateProductQuantityInCart,
  } = useAppState();

  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const handleQuantityValueChange = async (val) => {
    const newValue = quantity + val;
    const finalValue = newValue === 0 ? quantity : newValue;

    setQuantity(finalValue);
    if (quantity === finalValue) {
      return;
    }

    const updatedData = { 
      quantity: finalValue,
    };
    setIsUpdating(true);
    try {
      if (userId) {
        const res = await updateCartItemInDB(item._id, updatedData);
      } else {
        updateLocalCartItem(item.id, updatedData);
        updateProductQuantityInCart(item.id, updatedData);
      }
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };

  return (
    <div className={styles.quantityToggleWrapper}>
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => handleQuantityValueChange(-1)}
        className={`${styles.toggleBtnDiv} ${styles.toggleBtnDivDec}`}
      >
        <ArrowIcon color={isUpdating ? "#C5C0DB" : "#101828"} />
      </button>
      <div className={styles.quantityValueDiv}>
        <p>{quantity}</p>
      </div>
      <button
        type="button"
        disabled={isUpdating}
        onClick={() => handleQuantityValueChange(1)}
        className={styles.toggleBtnDiv}
      >
        <ArrowIcon color={isUpdating ? "#C5C0DB" : "#101828"} />
      </button>
    </div>
  );
};

export default CardQuantityToggleBtn;
