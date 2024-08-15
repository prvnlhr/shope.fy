import dbConnect from "@/lib/db/dbConnect";
import Cart from "@/lib/db/models/Cart";

export async function DELETE(req, { params }) {
  await dbConnect();
  const { productId } = params;
  try {
    const result = await Cart.findByIdAndDelete(productId);
    if (!result) {
      return new Response(
        JSON.stringify({
          message: "Cart item not found",
        }),
        { status: 404 }
      );
    }

    return new Response(
      JSON.stringify({
        message: "Cart item deleted successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error at cart Item DELETE request:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Error in deleting cart item",
      }),
      { status: 500 }
    );
  }
}

export async function PATCH(req, { params }) {
  await dbConnect();
  try {
    const { productId } = params;
    const itemData = await req.json();
    const result = await Cart.updateOne(
      { _id: productId },
      { $set: { quantity: itemData.quantity } }
    );

    if (result.matchedCount === 0) {
      return new Response(JSON.stringify({ message: "Cart item not found" }), {
        status: 404,
      });
    }

    return new Response(
      JSON.stringify({
        message: "Cart item updated successfully",
      }),
      { status: 200 }
    );
  } catch (error) {
    console.error("Error at cart Item PATCH request:", error);

    return new Response(
      JSON.stringify({
        error: error.message,
        message: "Error in updating cart item",
      }),
      { status: 500 }
    );
  }
}
