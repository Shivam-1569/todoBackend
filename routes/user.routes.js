import { Router } from "express";
import { userLogin, userRegister, getMyProfile, logoutUser} from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
const router = Router()
router.route("/login").post(userLogin)
router.route("/register").post(userRegister)
router.route("/me").get(isAuthenticated, getMyProfile)
router.route("/logout").get(logoutUser)
export default router