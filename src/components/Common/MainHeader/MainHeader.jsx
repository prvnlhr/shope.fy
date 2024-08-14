import React from "react";
import styles from "./styles/mainHeader.module.css";
import CartButton from "./CartButton";
import AppLogo from "../AppLogo/AppLogo";
const MainHeader = () => {
  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.leftSection}>
        <div className={styles.appLogoDiv}>
          <AppLogo />
        </div>
      </div>
      <div className={styles.rightSection}>
        <CartButton />
      </div>
    </nav>
  );
};

export default MainHeader;
