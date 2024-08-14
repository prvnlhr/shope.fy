import React from "react";
import styles from "./styles/commonHeading.module.css";
const CommonHeading = ({ text }) => {
  return (
    <div className={styles.headingWrapper}>
      <div className={styles.headingTextDiv}>
        <p>{text}</p>
      </div>
      <div className={styles.headingLineDiv}></div>
    </div>
  );
};

export default CommonHeading;
