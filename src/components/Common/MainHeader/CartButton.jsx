"use client";
import Link from "next/link";
import styles from "./styles/cartBtn.module.css";
import React, { useEffect } from "react";
import { useAppState } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import { getCartItems } from "@/lib/api/public/cartsApi";
import useSWR from "swr";
import Spinner from "../Icons/Spinner";
import { usePathname } from "next/navigation";

const CartButton = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userId = session?.user?.userId;
  const { cartData, setCartData } = useAppState();
  const { data, error, isLoading } = useSWR(userId, getCartItems);

  useEffect(() => {
    if (data) {
      const { totalItems, itemIds } = data.reduce(
        (acc, curr) => {
          acc.subTotal += curr.price * curr.quantity;
          acc.totalItems += curr.quantity;
          acc.itemIds.push(curr.refId);
          return acc;
        },
        { totalItems: 0, itemIds: [] }
      );
      setCartData({
        totalItems,
        itemIds,
      });
    }
  }, [data, setCartData]);
  return (
    pathname !== "/cart" && (
      <Link href="/cart" className={styles.linkWrapper}>
        <p>Cart</p>
        <div className={styles.cartCountDiv}>
          {isLoading ? (
            <Spinner color={"#101828"} />
          ) : (
            <p>{cartData.totalItems}</p>
          )}
        </div>
      </Link>
    )
  );
};

export default CartButton;
