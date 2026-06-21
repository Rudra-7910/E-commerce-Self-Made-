import { Router } from "express";
import { loginUser,myProfile,RegisterUser,verifyRegisterUser,verifyUser } from "../controller/user.js";
import { addAddress,deleteAddress,getAllAddress,getSingleAddress } from "../controller/address.js";
import { isAuth } from "../middlewares/isAuth.js";
const router= Router();
router.route("/user/login").post(loginUser)
router.route("/user/verify").post(verifyUser)
router.route("/user/me").get(isAuth,myProfile)
router.route("/user/address").post(isAuth,addAddress)
router.route("/user/address").get(isAuth,getAllAddress)
router.route("/user/address/:id").get(isAuth,getSingleAddress)
router.route("/user/address/:id").delete(isAuth,deleteAddress)
router.route("/user/register").post(RegisterUser)
router.route("/user/register/verify").post(verifyRegisterUser)
export default router;