import connectDb from "../../middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");

export default async function handler(req, res) {
  await connectDb();

  if (req.method == "POST") {
    const {username,email} = req.body
    let u = new User({ username, email, password: CryptoJS.AES.encrypt(req.body.password, process.env.AES_SECRET).toString() });
    await u.save();
    res.status(200).json({ success: "Successful" });
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
}
