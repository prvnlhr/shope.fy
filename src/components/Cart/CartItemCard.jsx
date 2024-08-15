import React from "react";
import styles from "./styles/cartItemCard.module.css";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import Image from "next/image";
import CartItemDeleteBtn from "./CartItemDeleteBtn";
import CardQuantityToggleBtn from "./CardQuantityToggleBtn";

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
        <CardQuantityToggleBtn item={item} />
      </div>
      <div className={styles.totalPriceCell}>
        <PriceBadge val={(item.price * item.quantity).toFixed(2)} />
      </div>
      <div className={styles.removeBtnCell}>
        <CartItemDeleteBtn itemId={item._id} />
      </div>
    </div>
  );
};

export default CartItemCard;
