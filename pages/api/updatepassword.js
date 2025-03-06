import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
var CryptoJS = require("crypto-js");
export default async function handler(req, res) {
  try {
    await connectDb();
    if (req.method == "POST") {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOne({ email: user.email });
      const bytes = CryptoJS.AES.decrypt(dbuser.password, process.env.AES_SECRET);
      let decryptedPassword = bytes.toString(CryptoJS.enc.Utf8);
      if (
        req.body.password == decryptedPassword &&
        req.body.cpassword == req.body.npassword
      ) {
        console.log("Password Matched");
        let puser = await User.findOneAndUpdate(
          { email: user.email },
          {
            password: CryptoJS.AES.encrypt(
              req.body.npassword,
              process.env.AES_SECRET
            ).toString(),
          }
        );

        res.status(200).json({ success: true });
        return;
      } else {
        res.status(200).json({ success: false });
      }
    } else {
      res.status(400).json({ error: "error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
