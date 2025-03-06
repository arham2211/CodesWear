import connectDb from "../../middleware/mongoose";
import Order from "@/models/Order";
import Product from "@/models/Product";
import pincodes from "../../pincodes.json";

export default async function handler(req, res) {
  await connectDb();
  if(!Object.keys(pincodes).includes(req.body.pincode)){
    res.status(200).json({
      succes: false,
      error: `The pincode is not serviceable`,
      clearCart: false,
    });
    return;
  }

  if (req.method == "POST") {
    let product,
      sumTotal = 0;
    let cart = req.body.cart;
    if(req.body.subTotal <= 0){
      res.status(200).json({
          succes: false,
          error: `Cart is Empty! Add items to your cart before purchasing`,
          clearCart: false,
        });
        return;
    }
    for (let item in cart) {
      sumTotal += cart[item].price * cart[item].qty;
      product = await Product.findOne({ slug: item });
     
    
      if(product.availableQty < cart[item].qty){
        res.status(200).json({
            succes: false,
            error: `The following product ${product.title} (${product.size}/${product.color}) item exceeds the quantity limit. Only ${product.availableQty} are left in stock.`,
            clearCart: true,
          });
          return;
      }
      if (product.price != cart[item].price) {
        res.status(200).json({
          succes: false,
          error: "The price of some items in your cart have changed.",
          clearCart: true,
        });
        return;
      }
    }
    if (sumTotal != req.body.subTotal) {
      res.status(200).json({
        succes: false,
        error: "The price of some items in your cart have changed.",
        clearCart: true,
      });
      return;
    }
console.log(req.body.phone.length);
    if(req.body.phone.length !== 11){
      res.status(200).json({
        succes: false,
        error: "Please enter a valid phone number.",
      });
      return;
    }


    if(req.body.pincode.length !== 6 ){
      res.status(200).json({
        succes: false,
        error: "Please enter a valid pincode.",
      });
      return;
    }

    let order = new Order({
      email: req.body.email,
      orderId: req.body.oid,
      // paymentInfo: req.body.paymentInfo,
      products: req.body.cart,
      amount: req.body.subTotal,
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
      pincode:req.body.pincode,
      phone: req.body.phone,
      username: req.body.name
    });
    await order.save();
    res.status(200).json({ success: "Successful" });
  }
}
