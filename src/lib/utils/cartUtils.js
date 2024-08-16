export const saveLocalCartItems = (items) => {
  if (typeof window !== "undefined") {
    localStorage.setItem("cart", JSON.stringify(items));
  }
};

export const fetchLocalCartItems = () => {
  if (typeof window !== "undefined") {
    const cart = localStorage.getItem("cart");
    return cart ? JSON.parse(cart) : [];
  }
  return [];
};

export const addToLocalCart = (product) => {
  if (typeof window !== "undefined") {
    const cart = fetchLocalCartItems();
   
    cart.push(product);
    saveLocalCartItems(cart);
  }
};

export const updateLocalCartItem = (itemId, updateData) => {
  if (typeof window !== "undefined") {
    const cart = fetchLocalCartItems();
    const updatedCart = cart.map((item) => {
      if (item.id === itemId) {
        return {
          ...item,
          quantity: updateData.quantity,
        };
      }
      return item;
    });

    saveLocalCartItems(updatedCart);
  }
};
export const deleteLocalCartItem = (itemId) => {
  if (typeof window !== "undefined") {
    const cart = fetchLocalCartItems();
    const updatedCart = cart.filter((item) => item.id !== itemId);
    saveLocalCartItems(updatedCart);
  }
};
