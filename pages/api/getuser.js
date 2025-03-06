import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
export default async function handler(req, res) {
  try {
    await connectDb();
    if (req.method == "POST") {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOne({ email: user.email });
      const { username, email, address, pincode,phone } = dbuser;
      res.status(200).json({ username, email, address, pincode, phone });
    } else {
      res.status(400).json({ error: "error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
