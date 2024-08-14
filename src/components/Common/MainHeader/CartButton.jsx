import Link from "next/link";
import styles from "./styles/cartBtn.module.css";
import React from "react";
const CartButton = () => {
  return (
    <Link href="/cart" className={styles.linkWrapper}>
      <p>Cart</p>
      <div className={styles.cartCountDiv}>
        <p>23</p>
      </div>
    </Link>
  );
};

export default CartButton;
