"use client";
import React from "react";
import styles from "./styles/cartSummary.module.css";
import CommonHeading from "../Common/Headings/CommonHeading";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import ArrowIcon from "../Common/Icons/ArrowIcon";
import { useAppState } from "@/context/AppContext";

const PriceBadge = ({ price }) => {
  return (
    <div className={styles.badgeWrapper}>
      <div className={styles.currencyIconDiv}>
        <CurrencyIcon />
      </div>
      <div className={styles.textDiv}>
        <p>{price}</p>
      </div>
    </div>
  );
};

const CartSummary = () => {
  const { summaryData, cartData } = useAppState();
  const { totalItems } = cartData;
  const deliveryHandlingCharges = 32.5;
  const subTotal = Number(summaryData.subTotal) || 0;
  const getTotalPrice = () => {
    let totalPrice = subTotal > 0 ? subTotal + deliveryHandlingCharges : 0;
    return totalPrice ? totalPrice.toFixed(2) : 0;
  };

  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.headerWrapper}>
        <CommonHeading text={"SUMMARY"} />
      </div>
      <div className={styles.mainWrapper}>
        <div className={styles.summaryCard}>
          <div className={styles.cardRow}>
            <div className={styles.labelCell}>
              <p>Subtotal</p>
            </div>
            <div className={styles.valueCell}>
              <PriceBadge price={summaryData.subTotal} />
            </div>
          </div>
          <div className={styles.cardRow}>
            <div className={styles.labelCell}>
              <p>Delivery & Handling charges</p>
            </div>
            <div className={styles.valueCell}>
              <PriceBadge price={deliveryHandlingCharges} />
            </div>
          </div>
          <div className={`${styles.cardRow} ${styles.totalPriceRow}`}>
            <div className={styles.labelCell}>
              <p>Total Price</p>
            </div>
            <div className={styles.valueCell}>
              <PriceBadge price={getTotalPrice()} />
            </div>
          </div>
          <div className={styles.checkoutBtnWrapper}>
            {totalItems > 0 && (
              <button type="button" className={styles.checkoutBtn}>
                <div className={styles.buttonTextDiv}>
                  <p>Checkout</p>
                </div>
                <div className={styles.btnIconDiv}>
                  <ArrowIcon color={"white"} />
                </div>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
