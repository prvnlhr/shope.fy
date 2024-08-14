import React from "react";
import styles from "./styles/cartItemCard.module.css";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import ArrowIcon from "../Common/Icons/ArrowIcon";

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
const CartItemCard = () => {
  return (
    <div className={styles.cardItemWrapper}>
      <div className={styles.imageCell}>
        <img src="https://fakestoreapi.com/img/81fPKd-2AYL._AC_SL1500_.jpg" />
      </div>
      <div className={styles.titleCell}>
        <p>Fjallraven - Foldsack No. 1 Backpack, Fits 15 Laptops</p>
      </div>
      <div className={styles.priceCell}>
        <PriceBadge val={"255.25"} />
      </div>
      <div className={styles.quantityCell}>
        <div className={styles.quantityToggleWrapper}>
          <button
            type="button"
            className={`${styles.toggleBtnDiv} ${styles.toggleBtnDivDec}`}
          >
            <ArrowIcon />
          </button>
          <div className={styles.quantityValueDiv}>
            <p>2</p>
          </div>
          <button type="button" className={styles.toggleBtnDiv}>
            <ArrowIcon />
          </button>
        </div>
      </div>
      <div className={styles.totalPriceCell}>
        <PriceBadge val={"510.50"} />
      </div>
      <div className={styles.removeBtnCell}>
        <button type="button">
          <p>Remove</p>
        </button>
      </div>
    </div>
  );
};

export default CartItemCard;
