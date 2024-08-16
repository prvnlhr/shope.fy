"use client";
import React, { useState } from "react";
import styles from "./styles/productCard.module.css";
import ArrowIcon from "../Common/Icons/ArrowIcon";
import { addProductToDBCart } from "@/lib/api/public/cartsApi";
import { useSession } from "next-auth/react";
import Spinner from "../Common/Icons/Spinner";
import { useAppState } from "@/context/AppContext";
import { useRouter } from "next/navigation";
import { addToLocalCart } from "@/lib/utils/cartUtils";

const AddCartBtn = ({ product }) => {
  const router = useRouter();
  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const [isAdding, setIsAdding] = useState(false);
  const { isProductInCart, addProductToContextCart } = useAppState();

  const isAdded = () => {
    return isProductInCart(product.id);
  };

  const handleBtnClicked = async () => {
    if (isAdded()) {
      router.push("/cart");
      return;
    }
    setIsAdding(true);
    try {
      const productWithQuant = { ...product, quantity: 1 };
      if (userId) {
        const res = await addProductToDBCart(userId, product);
        if (res && res.message === "Item added to cart successfully") {
          addProductToContextCart(productWithQuant);
        }
      } else {
        addToLocalCart(productWithQuant);
        addProductToContextCart(productWithQuant);
      }
    } catch (error) {
      console.error("Error in toggling item to cart:", error);
    } finally {
      setIsAdding(false);
    }
  };

  return (
    <button className={styles.btn} type="button" onClick={handleBtnClicked}>
      <div className={styles.btnTextDiv}>
        <p>{isAdded() ? "Cart" : "Add to cart"}</p>
      </div>
      <div className={styles.btnIconDiv}>
        <div>
          {isAdding && !isAdded() ? (
            <Spinner color={"#101828"} />
          ) : (
            <ArrowIcon />
          )}
        </div>
      </div>
    </button>
  );
};

export default AddCartBtn;
