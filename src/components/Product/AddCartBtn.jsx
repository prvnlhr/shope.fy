"use client";
import React, { useState } from "react";
import styles from "./styles/productCard.module.css";
import ArrowIcon from "../Common/Icons/ArrowIcon";
import { addToCart } from "@/lib/api/public/cartsApi";
import { useSession } from "next-auth/react";
import Spinner from "../Common/Icons/Spinner";
import { useAppState } from "@/context/AppContext";
import { useRouter } from "next/navigation";

const AddCartBtn = ({ product }) => {
  const [isAdding, setIsAdding] = useState(false);
  const router = useRouter();

  const { data: session } = useSession();
  const userId = session?.user?.userId;

  const { cartData, setCartData } = useAppState();
  const { itemIds } = cartData;

  const isAdded = () => {
    return itemIds.includes(product.id);
  };
  const handleBtnClicked = async () => {
    if (isAdded()) {
      router.push("/cart");
      return;
    }
    setIsAdding(true);
    try {
      const res = await addToCart(userId, product);
      if (res && res.message === "Item added to cart successfully") {
        setCartData((prev) => ({
          ...prev,
          itemIds: [...prev.itemIds, product.id],
          totalItems: prev.totalItems + 1,
        }));
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
