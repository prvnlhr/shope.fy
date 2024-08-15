import React from "react";
import ProductsList from "../components/Product/ProductsList";
import { getProducts } from "@/lib/api/public/productsApi";

const ProductListPage = async () => {
  const products = await getProducts();
  return <ProductsList products={products} />;
};

export default ProductListPage;
