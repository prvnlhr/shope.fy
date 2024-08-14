import React from "react";
import styles from "./styles/arrowIcon.module.css";
const ArrowIcon = ({ color }) => {
  return (
    <svg
      className={styles.icon}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M3 21L20.5374 3M20.5374 3V20.28M20.5374 3H3.7015"
        stroke={color ? color : "#101828"}
        stroke-width="2.02363"
        stroke-linecap="round"
        stroke-linejoin="round"
      />
    </svg>
  );
};

export default ArrowIcon;
