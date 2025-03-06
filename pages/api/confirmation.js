import connectDb from "../../middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product"

export default async function handler(req, res) {
  await connectDb();

  if (req.method == "PUT") {
    let order = await Order.findOneAndUpdate(
      { orderId: req.body.oid },
      { status: "Paid" }
    );
    let products = order.products
    for(let slug in products){
      await Product.findOneAndUpdate({slug:slug},{$inc: {"availableQty": - products[slug].qty}})
    }
    
    res.status(200).json({ success: true, redirectUrl: `/order?id=${order._id}` });
  }
}
