import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  addToCart,
  fetchCart,
  removeFromCart,
  updateCart,
} from "../controller/cart.js";

const router = Router();

router.route("/cart").get(isAuth, fetchCart);
router.route("/cart/add").post(isAuth, addToCart);
router.route("/cart/update").put(isAuth, updateCart);
router.route("/cart/:id").delete(isAuth, removeFromCart);

export default router;
