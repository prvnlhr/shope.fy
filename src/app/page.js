import React from "react";
import ProductsList from "../components/Product/ProductsList";

const ProductListPage = async () => {
  const response = await fetch("https://fakestoreapi.com/products", {
    cache: "no-store",
  });
  const products = await response.json();
  console.log(products);
  return <ProductsList products={products} />;
};

export default ProductListPage;
