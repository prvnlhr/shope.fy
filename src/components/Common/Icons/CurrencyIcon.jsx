import React from "react";
import styles from "./styles/currencyIcon.module.css";
const CurrencyIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 9 9"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M2.25 1.125H6.75M2.25 3H6.75M5.4375 7.875L2.25 4.875H3.375C5.87512 4.875 5.87512 1.125 3.375 1.125"
        stroke="black"
        stroke-width="0.75"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CurrencyIcon;
