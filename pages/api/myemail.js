import connectDb from "../../middleware/mongoose";
import jsonwebtoken from "jsonwebtoken";

export default async function handler(req, res) {
  await connectDb();
  const token = req.body.token;
  const data = jsonwebtoken.verify(token, process.env.JWT_SECRET);
  console.log(data)
  res.status(200).json({ email: data.email });
}
