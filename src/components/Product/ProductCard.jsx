import React from "react";
import styles from "./styles/productCard.module.css";
import Image from "next/image";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import AddCartBtn from "./AddCartBtn";
const ProductCard = ({ product }) => {
  return (
    <div className={styles.cardWrapper}>
      <div className={styles.imageCell}>
        <div>
          <Image
            src={product.image}
            alt={product.title}
            quality={50}
            fill={true}
          />
        </div>
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
        <AddCartBtn product={product} />
      </div>
    </div>
  );
};

export default ProductCard;
