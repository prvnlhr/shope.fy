import React from "react";
import styles from "./styles/productList.module.css";
import ProductCard from "./ProductCard";
import CommonHeading from "../Common/Headings/CommonHeading";
const ProductsList = ({ products }) => {
  return (
    <div className={styles.listWrapper}>
      <div className={styles.listHeaderWrapper}>
        <CommonHeading text={"PRODUCTS"} />
      </div>
      <div className={styles.listItemsWrapper}>
        {products.map((product) => (
          <ProductCard key={product.id} product={product} />
        ))}
      </div>
    </div>
  );
};

export default ProductsList;
