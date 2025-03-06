const mongoose = require("mongoose");

const OrderSchema = new mongoose.Schema({
  email: { type: String, required: true },
  orderId: { type: String, required: true },
  paymentInfo: { type: String, default: "" },
  products: {type: Object, required: true},
  amount: { type: Number, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  phone: { type: String, required: true },
  pincode: { type: String, required: true },
  username: { type: String, required: true },
  status: { type: String, default: "pending", required: true },
  delieveryStatus: { type: String, default: "unshipped", required: true },
}, {timestamps: true});

mongoose.models = {}
// export default mongoose.model("Order", OrderSchema);
export default mongoose.models.Order || mongoose.model("Order", OrderSchema);