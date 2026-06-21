import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import {
  getAllOrders,
  getAllOrdersAdmin,
  getMyOrder,
  newOrderCod,
  updateStatus,
} from "../controller/order.js";

const router = Router();

router.route("/order/new").post(isAuth, newOrderCod);
router.route("/order/my").get(isAuth, getAllOrders);
router.route("/order/admin/all").get(isAuth, getAllOrdersAdmin);
router.route("/order/:id").get(isAuth, getMyOrder);
router.route("/order/status/:id").put(isAuth, updateStatus);

export default router;
