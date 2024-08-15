"use client";
import React, { useState } from "react";
import styles from "./styles/cartItemCard.module.css";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import ArrowIcon from "../Common/Icons/ArrowIcon";
import Image from "next/image";
import CartItemDeleteBtn from "./CartItemDeleteBtn";
import { updateCartItem } from "@/lib/api/public/cartsApi";
const PriceBadge = ({ val }) => {
  return (
    <div className={styles.priceWrapper}>
      <div className={styles.currencyIconDiv}>
        <CurrencyIcon />
      </div>
      <div className={styles.priceValueDiv}>
        <p>{val}</p>
      </div>
    </div>
  );
};
const CartItemCard = ({ item }) => {
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
      console.log(error);
    } catch (error) {
      console.log(error);
    } finally {
      setIsUpdating(false);
    }
  };
  return (
    <div className={styles.cardItemWrapper}>
      <div className={styles.imageCell}>
        <div>
          <Image src={item.image} alt={item.title} fill={true} />
        </div>
      </div>
      <div className={styles.titleCell}>
        <p>{item.title}</p>
      </div>
      <div className={styles.priceCell}>
        <PriceBadge val={item.price} />
      </div>
      <div className={styles.quantityCell}>
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
      </div>
      <div className={styles.totalPriceCell}>
        <PriceBadge val={(item.price * quantity).toFixed(2)} />
      </div>
      <div className={styles.removeBtnCell}>
        <CartItemDeleteBtn itemId={item._id} />
      </div>
    </div>
  );
};

export default CartItemCard;
