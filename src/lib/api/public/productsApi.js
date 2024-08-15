import { revalidatePathHandler } from "@/app/revalidate";

// get all products
export async function getProducts() {
  try {
    const response = await fetch(`https://fakestoreapi.com/products`);
    if (!response.ok) {
      throw new Error("Failed to get produts");
    }
    return response.json();
  } catch (error) {
    throw new Error(`Fetch get products error: ${error}`);
  }
}
