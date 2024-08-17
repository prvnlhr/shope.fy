import React from "react";
import styles from "./styles/currencyIcon.module.css";
const CurrencyIcon = () => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M8 17.345C8.65391 18.1483 9.552 18.7163 10.558 18.963C12.832 19.552 15.07 18.517 15.557 16.653C16.044 14.787 14.284 12.753 12.011 12.163C9.738 11.573 7.977 9.54 8.464 7.675C8.951 5.81 11.188 4.776 13.462 5.365C14.444 5.601 15.332 6.158 16 6.957M12.121 19.128V21M12.121 3V5.2"
        stroke="black"
        stroke-width="2"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default CurrencyIcon;
