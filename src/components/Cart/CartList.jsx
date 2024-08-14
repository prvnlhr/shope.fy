import React from "react";
import styles from "./styles/cartList.module.css";
import CartItemCard from "./CartItemCard";

const CartList = () => {
  return (
    <div className={styles.cartListWrapper}>
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
      <CartItemCard />
    </div>
  );
};

export default CartList;
