import React from "react";
import styles from "./styles/mainHeader.module.css";
import CartButton from "./CartButton";
import AppLogo from "../AppLogo/AppLogo";
import AuthBtn from "./AuthBtn";
const MainHeader = async () => {
  
  return (
    <nav className={styles.headerWrapper}>
      <div className={styles.leftSection}>
        <div className={styles.appLogoDiv}>
          <AppLogo />
        </div>
      </div>
      <div className={styles.rightSection}>
        <AuthBtn />
        <CartButton />
      </div>
    </nav>
  );
};

export default MainHeader;
