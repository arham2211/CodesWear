import connectDb from "../../middleware/mongoose";

export default async function handler(req, res) {
  try {
    await connectDb();
    res.status(200).json({ message: "✅ Database connected successfully" });
  } catch (error) {
    res.status(500).json({ message: "❌ Database connection failed", error: error.message });
  }
}
