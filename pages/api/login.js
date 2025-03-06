import connectDb from "../../middleware/mongoose";
import User from "@/models/User";
var CryptoJS = require("crypto-js");
var jwt = require("jsonwebtoken");

export default async function handler(req, res) {
  await connectDb();

  if (req.method == "POST") {
    let user = await User.findOne({ email: req.body.email });
    if (user) {
      const bytes = CryptoJS.AES.decrypt(user.password, process.env.AES_SECRET);
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (
        req.body.email == user.email &&
        req.body.password === decryptedPassword
      ) {
        var token = jwt.sign({email:user.email,username:user.username}, process.env.JWT_SECRET,{expiresIn:"1d"});
        res.status(200).json({
          success: "Successful",
          token: token,
        });
      } else {
        res.status(400).json({ error: "Invalid Credentials" });
      }
    } else {
      res.status(400).json({ error: "No user found" });
    }
  } else {
    res.status(400).json({ error: "This method is not allowed" });
  }
}
