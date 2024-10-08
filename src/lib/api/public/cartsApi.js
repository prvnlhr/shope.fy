import { revalidatePathHandler } from "@/app/revalidate";

// get all cart items
const BASE_URL =
  process.env.NEXT_PUBLIC_BASE_URL || "https://shope-fy.vercel.app";

export async function fetchCartItems(userId) {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/user/${userId}`);
    if (!response.ok) {
      throw new Error("Failed to get cart Items");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch cart items error: ${error}`);
  }
}

// add item to cart
export async function addProductToDBCart(userId, productData) {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/user/${userId}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to add to cart");
    }
    await revalidatePathHandler("/cart", "page");
    return response.json();
  } catch (error) {
    throw new Error(`Add to cart Error: ${error}`);
  }
}

// delete cart item
export async function removeProductFromDBCart(productId) {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "DELETE",
    });
    if (!response.ok) {
      const errorData = await response.json();
      throw new Error(errorData.message || "Failed to remove item from cart");
    }
    await revalidatePathHandler("/cart", "page");
    return response.json();
  } catch (error) {
    throw new Error(`Create course error: ${error}`);
  }
}

// update cart item
export async function updateCartItemInDB(productId, productData) {
  try {
    const response = await fetch(`${BASE_URL}/api/cart/${productId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(productData),
    });

    if (!response.ok) {
      throw new Error("Failed to update cart item");
    }
    await revalidatePathHandler("/cart", "page");

    return response.json();
  } catch (error) {
    throw new Error(`Update cart item error: ${error}`);
  }
}
