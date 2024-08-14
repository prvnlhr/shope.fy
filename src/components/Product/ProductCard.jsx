import React from "react";
import styles from "./styles/productCard.module.css";
import Image from "next/image";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import ArrowIcon from "../Common/Icons/ArrowIcon";
const ProductCard = ({ product }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageCell}>
        <img src={product.image} alt={product.title} fill={true} />
      </div>
      <div className={styles.titleCell}>
        <p>{product.title}</p>
      </div>
      <div className={styles.priceCell}>
        <div className={styles.priceWrapper}>
          <div className={styles.currencyIconDiv}>
            <CurrencyIcon />
          </div>
          <div className={styles.priceValueDiv}>
            <p>{product.price}</p>
          </div>
        </div>
      </div>
      <div className={styles.cartBtnCell}>
        <button className={styles.btn} type="button">
          <div className={styles.btnTextDiv}>
            <p>Add to cart</p>
          </div>
          <div className={styles.btnIconDiv}>
            <div>
              <ArrowIcon />
            </div>
          </div>
        </button>
      </div>
    </div>
  );
};

export default ProductCard;
