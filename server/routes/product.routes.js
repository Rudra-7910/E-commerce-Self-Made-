import { Router } from "express";
import { isAuth } from "../middlewares/isAuth.js";
import uploadFiles from "../middlewares/multer.middleware.js";
import {
  createProduct,
  getAllProducts,
  getSingleProduct,
  updateImages,
  updateProductDetails,
  deleteProduct
} from "../controller/product.js";

const router = Router();

router.route("/product/all").get(getAllProducts);
router.route("/product/:id")
  .get(getSingleProduct)
  .delete(isAuth, deleteProduct);
router.route("/product/new").post(isAuth, uploadFiles, createProduct);
router.route("/product/update/:id").put(isAuth, updateProductDetails);
router.route("/product/images/:id").put(isAuth, uploadFiles, updateImages);

export default router;
