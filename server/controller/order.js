import TryCatch from "../utils/TryCatch.js";
import { Order } from "../models/order.js";
import { Cart } from "../models/cart.js";
import { Product } from "../models/products.js";
import sendOrderMail from "../utils/sendOrderConfirmation.js";
export const newOrderCod = TryCatch(async (req, res) => {
  const { method, phone, address } = req.body;
  const cart = await Cart.find({ user: req.user._id }).populate({
    path: "product",
    select: "title price",
  });
  if (cart.length === 0) {
    return res.status(401).json({ message: "Cart is Empty" });
  }
  let subTotal = 0;
  const items = cart.map((i) => {
    const itemSubTotal = i.product.price * i.quantity;
    subTotal += itemSubTotal;
    return {
      product: i.product._id,
      name: i.product.title,
      price: i.product.price,
      quantity: i.quantity,
    };
  });
  const order = await Order.create({
    items,
    method,
    user: req.user._id,
    phone,
    address,
    subTotal,
  });
  for (let i of order.items) {
    const product = await Product.findById(i.product);
    if (product) {
      product.stock -= i.quantity;
      product.sold += i.quantity;
      await product.save();
    }
  }
  await Cart.deleteMany({ user: req.user._id });
  await sendOrderMail({
    email: req.user.email,
    subject: "Order Confirmation",
    orderId: order._id,
    products: items,
    totalAmount: subTotal,
  });
  return res.status(201).json({
    message: "Order placed successfully",
    order,
  });
});
export const getAllOrders=TryCatch(async(req,res)=>{
    const orders= await Order.find({user:req.user._id}).populate("items.product")
    res.json(orders)
})
export const getAllOrdersAdmin=TryCatch(async(req,res)=>{
    if(req.user.role!="admin")
    {
        return res.status(403).json({message:"You are not admin"})
    }
    const orders= await Order.find().populate("user").sort({createdAt:-1})
    res.json(orders);
})
export const getMyOrder= TryCatch(async(req,res)=>{
    const {id}= req.params.id
    const order= await Order.findById(id).populate("items.product").populate("user")
    res.json(order)
})
export const updateStatus=TryCatch(async(req,res)=>{
    if(req.user.role!="admin")
    {
        return res.status(403).json({message:"You are not admin"})
    }
    const{status}=req.body
    const order= await Order.findById(req.params.id)
    order.status=status
    await order.save()
    res.json({
        message:"Order Status Updated Successfully"
    })
})