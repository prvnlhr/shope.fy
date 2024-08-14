import React from "react";
import styles from "./styles/cartSummary.module.css";
import CommonHeading from "../Common/Headings/CommonHeading";
import CurrencyIcon from "../Common/Icons/CurrencyIcon";
import ArrowIcon from "../Common/Icons/ArrowIcon";

const PriceBadge = ({ price }) => {
  return (
    <div className={styles.badgeWrapper}>
      <div className={styles.currencyIconDiv}>
        <CurrencyIcon />
      </div>
      <div className={styles.priceValueDiv}>
        <p>{price}</p>
      </div>
    </div>
  );
};
const CartSummary = () => {
  return (
    <div className={styles.summaryWrapper}>
      <div className={styles.summaryHeaderWrapper}>
        <CommonHeading text={"SUMMARY"} />
      </div>
      <div className={styles.summaryDetailsWrapper}>
        <div className={styles.summaryCard}>
          <div className={styles.rowGroupDiv}>
            <div className={styles.rowLabelDiv}>
              <p>Subtotal</p>
            </div>
            <div className={styles.rowValueDiv}>
              <PriceBadge price={"525.50"} />
            </div>
          </div>
          <div className={styles.rowGroupDiv}>
            <div className={styles.rowLabelDiv}>
              <p>Delivery & Handling</p>
            </div>
            <div className={styles.rowValueDiv}>
              <p>Free</p>
            </div>
          </div>
          <div className={styles.rowGroupDiv}>
            <div className={styles.rowLabelDiv}>
              <p>Total Price</p>
            </div>
            <div className={styles.rowValueDiv}>
              <PriceBadge price={"525.50"} />
            </div>
          </div>

          <div className={styles.rowGroupDiv}>
            <button type="button">
              <div className={styles.btnTextDiv}>
                <p>Checkout</p>
              </div>
              <div className={styles.btnIconDiv}>
                <div>
                  <ArrowIcon color='white'/>
                </div>
              </div>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CartSummary;
