import { Router } from "express";
import { RegisterUser } from "../controller/User.controller.js";
const router = Router()

router.route("/register").post(RegisterUser)


export default router