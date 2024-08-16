"use client";
import Link from "next/link";
import styles from "./styles/cartBtn.module.css";
import React, { useEffect, useId } from "react";
import { useAppState } from "@/context/AppContext";
import { useSession } from "next-auth/react";
import { fetchCartItems } from "@/lib/api/public/cartsApi";
import useSWR from "swr";
import Spinner from "../Icons/Spinner";
import { usePathname } from "next/navigation";
import { fetchLocalCartItems } from "@/lib/utils/cartUtils";

const CartButton = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const userId = session?.user?.userId;
  const { cartData, setCartItemsContext } = useAppState();
  const { data, error, isLoading } = useSWR(
    userId ? [userId] : null,
    fetchCartItems
  );

  useEffect(() => {
    if (userId && data) {
      setCartItemsContext(data);
    } else if (!userId) {
      const localCartData = fetchLocalCartItems();
      setCartItemsContext(localCartData);
    }
  }, [userId, data]);

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
