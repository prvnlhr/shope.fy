import CartLayout from "@/components/Cart/CartLayout";
import React from "react";
import { auth } from "@/auth";
import { getCartItems } from "@/lib/api/public/cartsApi";

const CartPage = async () => {
  const session = await auth();
  const userId = session?.user?.userId;
  let cartItemsList = [];
  if (userId) {
    cartItemsList = await getCartItems(userId);
  }
  return <CartLayout cartItemsList={cartItemsList} />;
};

export default CartPage;
