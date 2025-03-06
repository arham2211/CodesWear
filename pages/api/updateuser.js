import connectDb from "../../middleware/mongoose";
import User from "../../models/User";
import jsonwebtoken from "jsonwebtoken";
export default async function handler(req, res) {
  try {
    await connectDb();
    if (req.method == "POST") {
      let token = req.body.token;
      let user = jsonwebtoken.verify(token, process.env.JWT_SECRET);
      let dbuser = await User.findOneAndUpdate(
        { email: user.email },
        {
          address: req.body.address,
          pincode: req.body.pincode,
          phone: req.body.phone,
          username: req.body.name,
        }
      );
      
      res.status(200).json({success:true});
      return
    } else {
      res.status(400).json({ error: "error" });
    }
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
}
