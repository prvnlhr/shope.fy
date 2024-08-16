import CartLayout from "@/components/Cart/CartLayout";
import React from "react";
import { auth } from "@/auth";
import { fetchCartItems } from "@/lib/api/public/cartsApi";

const CartPage = async () => {
  const session = await auth();
  const userId = session?.user?.userId;
  let cartItemsList = [];

  if (userId) {
    cartItemsList = await fetchCartItems(userId);
  }

  return <CartLayout cartItemsList={cartItemsList} />;
};

export default CartPage;
