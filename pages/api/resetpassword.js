import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
var CryptoJS = require("crypto-js");
export default async function handler(req, res) {
  try {
    await connectDb();
    if (req.method == "POST") {
      let dbuser = await User.findOne({ email: req.body.email });
      if (dbuser) {
        if (req.body.cpassword == req.body.npassword) {
          let puser = await User.findOneAndUpdate(
            { email: req.body.email },
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
