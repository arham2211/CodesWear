import connectDb from "../../middleware/mongoose";
import Order from "@/models/Order";
import jsonwebtoken from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDb();
  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  let orders = await Order.find({ email: data.email });
  res.status(200).json({ orders });
}
