import React from "react";
import styles from "./styles/cartLayout.module.css";
import Link from "next/link";
import CommonHeading from "../Common/Headings/CommonHeading";
import CartList from "./CartList";
import CartSummary from "./CartSummary";

const BreadCrumbsSeparator = () => {
  return (
    <svg
      style={{ height: "60%" }}
      viewBox="0 0 12 17"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <line
        x1="10.6193"
        y1="0.280585"
        x2="0.73924"
        y2="16.092"
        stroke="#A4ADBB"
      />
    </svg>
  );
};
const CartLayout = () => {
  const breadcrumbsLinks = [
    {
      linkText: "Products",
      href: "/",
    },
    {
      linkText: "Cart",
      href: "#",
    },
  ];
  return (
    <div className={styles.layoutWrapper}>
      <div className={styles.breadCrumbsCell}>
        {breadcrumbsLinks.map((link, index) => (
          <Link className={styles.breadCrumbsLink} href={link.href}>
            <div className={styles.breadCrumbsTextDiv}>
              <p>{link.linkText}</p>
            </div>
            {index !== breadcrumbsLinks.length - 1 && (
              <div className={styles.breadCrumbsSepDiv}>
                <BreadCrumbsSeparator />
              </div>
            )}
          </Link>
        ))}
      </div>
      <div className={styles.cartHeaderCell}>
        <CommonHeading text={"CART"} />
      </div>
      <div className={styles.cartListCell}>
        <CartList />
      </div>
      <div className={styles.cartSummaryCell}>
        <CartSummary />
      </div>
    </div>
  );
};

export default CartLayout;
