import dbConnect from "@/lib/db/dbConnect";
import Cart from "@/lib/db/models/Cart";

// Get all cart items
export async function GET(req, { params }) {
  await dbConnect();
  const { userId } = params;
  try {
    const query = {
      userId,
    };
    const cartItems = await Cart.find(query);
    return new Response(JSON.stringify(cartItems), { status: 200 });
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error fetching cart Items at GET request",
      }),
      {
        status: 500,
      }
    );
  }
}
// add item to cart
export async function POST(req, { params }) {
  await dbConnect();
  try {
    const { userId } = params;
    const cartItemData = await req.json();
    const newCartItem = new Cart({
      userId,
      refId: cartItemData.id,
      title: cartItemData.title,
      category: cartItemData.category,
      image: cartItemData.image,
      quantity: cartItemData.quantity || 1,
      price: cartItemData.price,
    });

    await newCartItem.save();

    return new Response(
      JSON.stringify({
        message: "Item added to cart successfully",
        cartItem: newCartItem,
      }),
      {
        status: 201,
      }
    );
  } catch (error) {
    console.log(error);
    return new Response(
      JSON.stringify({
        error: error,
        message: "Error at add to cart POST request",
      }),
      {
        status: 500,
      }
    );
  }
}
