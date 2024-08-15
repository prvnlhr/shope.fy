"use client";
import React, { useState } from "react";
import { updateCartItem } from "@/lib/api/public/cartsApi";
import ArrowIcon from "@/components/Common/Icons/ArrowIcon";
import styles from "./styles/cartItemCard.module.css";
const CardQuantityToggleBtn = ({ item }) => {
  const [quantity, setQuantity] = useState(item.quantity);
  const [isUpdating, setIsUpdating] = useState(false);

  const handleQuantityValueChange = async (val) => {
    const newValue = quantity + val;
    const finalValue = newValue === 0 ? quantity : newValue;
    setQuantity(finalValue);
    if (quantity === finalValue) {
      return;
    }
    try {
      setIsUpdating(true);
      const updateData = {
        quantity: finalValue,
      };
      const res = await updateCartItem(item._id, updateData);
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
